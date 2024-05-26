export function validateData(data, schema, root = true) {
  const prefix = '[Menuy] Validation Error'

  if (!Array.isArray(data) || data === null) {
    if (root) {
      throw new Error(`${prefix}: menuData must be an array`)
    } else {
      throw new Error(`${prefix}: children must be an array`)
    }
    
  }

  for (const item of data) {
    if (item.children) {
      validateData(item.children, schema, false)
    }
  }

  for (const [key, rule] of Object.entries(schema)) {
  }

  return data
}