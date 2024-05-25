export function validateData(data, schema) {
  const message = 'Menuy Validation Error'

  if (!Array.isArray(data) || data === null) {
    throw new Error(`${message}: menuData must be an array`);
  }

  for (const item of data) {
    console.log(item)
    validateData(item.children, schema)
  }

  for (const [key, rule] of Object.entries(schema)) {
  }

  return validatedData
}