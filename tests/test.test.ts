import { validateId } from '../src/common/utils/validation';

test('validates id 1 to be true', () => {
    expect(validateId(1)).toBe(true);
});
test('validates id 2 to be true', () => {
    expect(validateId(2)).toBe(true);
});
test('validates id 333 to be true', () => {
    expect(validateId(333)).toBe(true);
});
test('validates id \'a\' to be false', () => {
    expect(validateId('a')).toBe(false);
});
test('validates id \'victor\' to be false', () => {
    expect(validateId('victor')).toBe(false);
});