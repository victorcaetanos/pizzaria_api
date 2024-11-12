import {User} from "../../user/model/User";

export type authResponseType = {
    user: User,
    token: string
};