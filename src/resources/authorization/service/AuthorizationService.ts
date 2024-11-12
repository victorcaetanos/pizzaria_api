import {authResponseType} from "../schemas";
import {User} from "../../user/model/User";
import {
    NotFoundError,
    UnauthorizedError
} from "../../../common/errors";
import {IUserService} from "../../user/service/UserService";
import {ICryptographyService} from "../../../common/services/CryptographyService";
import {ITokenService} from "../../../common/services/TokenService";
import {IUserRepository} from "../../user/model/UserRepository";

export interface IAuthorizationService {
    create(user: User): Promise<authResponseType>;

    findOne(user: User): Promise<authResponseType>;
}

export class AuthorizationService implements IAuthorizationService {
    private userService: IUserService;
    private cryptographyService: ICryptographyService;
    private webTokenService: ITokenService;
    private userRepository: IUserRepository;

    constructor(userService: IUserService, cryptographyService: ICryptographyService,
                webTokenService: ITokenService, userRepository: IUserRepository) {
        this.userService = userService;
        this.cryptographyService = cryptographyService;
        this.webTokenService = webTokenService;
        this.userRepository = userRepository;
    }

    async create(user: User): Promise<any> {
        try {
            const newUser: User = await this.userService.create(user);

            const accessToken: string = this.webTokenService.generateAccessToken(newUser.id, newUser.email);

            return {
                ...this.userService.removePassword(newUser),
                token: accessToken,
            };
        } catch (err: any) {
            throw err;
        }
    }

    async findOne(user: User): Promise<any> {
        const {email, password} = user;

        try {
            const foundUser: User = await this.userRepository
                .findOneByEmailWithPassword(email);
            if (!foundUser) {
                throw new NotFoundError(`Could not find any user with email: \`${email}\`.`);
            }

            if (this.cryptographyService.comparePasswords(password, foundUser.password)) {
                throw new UnauthorizedError(`Provided email and password did not match.`);
            }

            const accessToken: string = this.webTokenService.generateAccessToken(foundUser.id, foundUser.email);

            return {
                ...this.userService.removePassword(foundUser),
                token: accessToken,
            };
        } catch (err: any) {
            throw err;
        }
    }
}