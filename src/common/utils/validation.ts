export function validateId(id: any): boolean {

    if (id == undefined || isNaN(id))
        return false;

    try {
        id = parseInt(id);
        if (id % 1 !== 0)
            return false;
    } catch (err) {
        return false;
    }

    if (id < 1 || id > 2147483646)
        return false;

    return true;
}