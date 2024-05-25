export function validate(data, schema) {
  if (!Array.isArray(data) || data === null) {
    throw new Error('Validation ERROR: Menu data must be an array');
  }

  for (const [key, rule] of Object.entries(schema)) {
  }

  return data
}