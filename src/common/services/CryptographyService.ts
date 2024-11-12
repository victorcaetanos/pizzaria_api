import bcrypt from 'bcrypt';
import 'dotenv/config';

export interface ICryptographyService {
    encryptPassword(password: string): string;

    comparePasswords(hashedPassword: string, plainPassword: string): boolean;
}

export class CryptographyService implements ICryptographyService {
    private saltRounds: number = Number(process.env.SALT_ROUNDS);

    /**
     * @description
     * Encrypts the password using SHA-256 Algorithm
     *
     * @param {string} password - Password to be encrypted
     *
     * @returns {string} - Encrypted password
     */
    encryptPassword(password: string): string {
        return bcrypt.hashSync(password, this.saltRounds);
    };

    /**
     * @description
     * Compares an Encrypted Password with a plain text password
     *
     * @param {string} hashedPassword - Encrypted Password
     * @param {string} plainPassword - Plain Password
     *
     * @returns {boolean} - true if the passwords match, false otherwise
     */
    comparePasswords(hashedPassword: string, plainPassword: string): boolean {
        return bcrypt.compareSync(plainPassword, hashedPassword);
    };
}