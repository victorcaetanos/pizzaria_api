import rateLimit, {RateLimitRequestHandler} from "express-rate-limit";

export const rateLimitMiddleware: RateLimitRequestHandler = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    limit: 100,
    message: {message: "Too many requests, please try again later."}
});