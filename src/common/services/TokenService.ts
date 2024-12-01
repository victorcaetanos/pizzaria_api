import jwt, {JwtPayload} from "jsonwebtoken";
import {jwtExpirationInSeconds} from "../../config";

export interface ITokenService {
    generateAccessToken(id: number, email: string): string;

    verify(token: string, secret: string): string | JwtPayload;
}

export class TokenService implements ITokenService {
    private static instance: TokenService;

    private constructor() {
    }

    public static getInstance(): TokenService {
        if (!TokenService.instance) {
            TokenService.instance = new TokenService();
        }
        return TokenService.instance;
    }

    /**
     * @description
     * Encrypts the password using SHA-256 Algorithm
     *
     * @param {string} email - Password to be encrypted
     * @param {number} id - Password to be encrypted
     *
     * @returns {string} - Encrypted password
     */
    public generateAccessToken(id: number, email: string): string {
        return jwt.sign(
            {
                id,
                email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: jwtExpirationInSeconds,
            }
        );
    };

    public verify(token: string, secret: string): string | JwtPayload {
        return jwt.verify(token, secret);
    }
}