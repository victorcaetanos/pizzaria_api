
export const jwtExpirationInSeconds = 30 * 24 * 60 * 60; // 30 days

export const roles = {
    ADMIN: 'admin',
    USER: 'user'
};

export const status = {
    UNKNOWN: 'unknown',
    ORDERED: 'ordered',
    MAKING: 'making',
    UNDERWAY: 'underway',
    FINISHED: 'finished'
};
