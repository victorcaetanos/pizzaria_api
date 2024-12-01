import {User} from "../../../common/models";
import {ConflictError, NotFoundError, UnprocessableEntityError} from "../../../common/errors";
import {ICryptographyService} from "../../../common/services/CryptographyService";
import {IUserRepository} from "../model/UserRepository";
import {idValidation} from "../../../common/utils/validation";
import {ITokenService, TokenService} from "../../../common/services/TokenService";
import {JsonWebTokenError} from "jsonwebtoken";

export interface IUserService {

    findAll(): Promise<User[]>;

    findOne(id: number): Promise<User>;

    findOneByJwt(jwt: string): Promise<User>;

    create(user: User): Promise<User>;

    update(id: number, user: User): Promise<User>;

    delete(id: number): Promise<void>;

    removePassword(user: User): User;
}

/**
 * @description
 * Service class responsible for handling all business logic related to User
 */
export class UserService implements IUserService {
    private userRepository: IUserRepository;
    private cryptographyService: ICryptographyService;
    private tokenService: ITokenService = TokenService.getInstance();

    constructor(userRepository: IUserRepository, cryptographyService: ICryptographyService) {
        this.userRepository = userRepository;
        this.cryptographyService = cryptographyService;
    }

    /**
     * @description
     * Returns all users
     *
     * @returns {Promise<User[]>} - Array of User objects
     */
    async findAll(): Promise<User[]> {
        const users = await this.userRepository.find();
        return users.map(user => this.removePassword(user));
    }

    /**
     * @description
     * Returns a user by id
     *
     * @param {number} id - User id
     *
     * @returns {Promise<User>} - User object
     */
    async findOne(id: number): Promise<User> {
        try {
            await idValidation(id, User);
            const user: User = await this.userRepository.findOneById(id);
            return this.removePassword(user);
        } catch (err) {
            throw err;
        }
    }

    /**
     * @description
     * Returns a user by jwt
     *
     * @param {string} jwt - User jwt
     *
     * @returns {Promise<User>} - User object
     */
    async findOneByJwt(jwt: string): Promise<User> {
        try {
            // @ts-ignore
            const {id} = this.tokenService.verify(jwt, process.env.JWT_SECRET);
            await idValidation(id, User);
            const user: User = await this.userRepository.findOneById(id);
            return this.removePassword(user);
        } catch (err) {
            if (err instanceof JsonWebTokenError || err instanceof UnprocessableEntityError) {
                throw new NotFoundError("Invalid JWT");
            }
            throw err;
        }
    }

    /**
     * @description
     * Creates a new user
     *
     * @param {User} user - User object
     *
     * @returns {Promise<User>} - User object
     */
    async create(user: User): Promise<User> {
        try {
            await this.validateUser(user);
            user = this.transformUser(user);
            let encryptedPassword: string = this.cryptographyService.encryptPassword(user.password);
            user = {...user, password: encryptedPassword};

            let createdUser: User = await this.userRepository.save(user);
            createdUser = this.removePassword(createdUser);
            return createdUser;
        } catch (err: any) {
            throw err;
        }
    }

    /**
     * @description
     * Updates a user by id
     *
     * @param {number} id - User id
     * @param {User} user - User object
     *
     * @returns {Promise<void>}
     */
    async update(id: number, user: User): Promise<User> {

        try {
            await idValidation(id, User);
            user.id = id;

            await this.validateUser(user);
            user = this.transformUser(user);
            if (user.password) {
                let encryptedPassword: string = this.cryptographyService.encryptPassword(user.password);
                user = {...user, password: encryptedPassword};
            }

            return await this.userRepository.update(user);
        } catch (err) {
            throw err;
        }
    }

    /**
     * @description
     * Deletes a user by id
     *
     * @param {number} id - User id
     *
     * @returns {Promise<void>}
     */
    async delete(id: number): Promise<void> {
        try {
            await idValidation(id, User);
            await this.userRepository.delete(id);
        } catch (err) {
            throw err;
        }
    }

    /**
     * @description Returns a User Object without password.
     * Used just in case TypeORM fails to remove the password from the object
     *
     * @param {User} user - User object
     *
     * @returns {User} - User object without password
     */
    public removePassword(user: User): User {
        const {password, ...userWithoutPassword} = user;
        return userWithoutPassword as User;
    }

    /**
     * @description
     * Checks if the email and phone_number are unique if they are defined
     *
     * @param {User} user - User object
     *
     * @returns {Promise<void>}
     */
    private async validateUser(user: User): Promise<void> {
        try {
            // check if email and phone_number are defined to differ between create and update
            if (user.email) {
                await this.checkEmailUniqueness(user);
            }
            if (user.phone_number) {
                await this.checkPhoneNumberUniqueness(user);
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     * @description
     * Does the necessary data transformations before returning the User
     *
     * @param {User} user - User object
     *
     * @returns {Promise<User>}
     */
    private transformUser(user: User): User {
        try {
            // if email is defined, could check and sanitize it here
            if (user.email) {
                user.email = user.email.toLowerCase();
            }
            return user;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @description
     * Checks if the email is already in use
     *
     * @param {User} user - User object
     *
     * @returns {Promise<void>}
     */
    private async checkEmailUniqueness(user: User): Promise<void> {
        const existingUser: User = await this.userRepository.findOneByEmail(user.email);

        if (existingUser) {
            throw new ConflictError("Email is already in use");
        }
    }

    /**
     * @description
     * Checks if the phone number is already in use
     *
     * @param {User} user - User object
     *
     * @returns {Promise<void>}
     */
    private async checkPhoneNumberUniqueness(user: User): Promise<void> {
        const existingUser: User = await this.userRepository.findOneByPhone(user.phone_number);

        if (existingUser) {
            throw new ConflictError("Phone number is already in use");
        }
    }

    /**
     * @description Validates the user id by checking if the id is a valid number
     * and if it exists in the database
     *
     * @param {number} id - User id
     *
     * @returns {Promise<void>}
     */
}