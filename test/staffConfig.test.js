const { parseStaffConfig } = require('../functions/staff');

test('parses valid staff JSON', () => {
  const staff = parseStaffConfig([{ name: 'Anna', role: 'Barista' }]);
  expect(staff[0].name).toBe('Anna');
});

test('throws on empty input', () => {
  expect(() => parseStaffConfig([])).toThrow();
});

test('validates required fields', () => {
  expect(() => parseStaffConfig([{ name: 'Oleg' }])).toThrow();
});

test('returns correct role counts', () => {
  const result = parseStaffConfig([{ name: 'Vova', role: 'Chef' }]);
  expect(result).toBeInstanceOf(Array);
});

test('parses multiple staff members', () => {
  const staff = parseStaffConfig([
    { name: 'A', role: 'Barista' },
    { name: 'B', role: 'Chef' }
  ]);
  expect(staff.length).toBe(2);
});
