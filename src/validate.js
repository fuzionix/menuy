import { ValidationError } from './error'

export function validateData(data, schema, root = true) {
  if (!Array.isArray(data) || data === null) {
    if (root) {
      throw new ValidationError(`menuData must be an array`, { input: data })
    } else {
      throw new ValidationError(`children must be an array`, { input: data })
    }
    
  }

  for (const item of data) {
    if (item.children) {
      validateData(item.children, schema, false)
    }

    iterateSchema(item, schema)
  }

  return data
}

export function validateConfig(config, schema) {
  if (typeof config !== 'object' || Array.isArray(config) || config === null) {
    throw new ValidationError(`config must be an object not ${Object.prototype.toString.call(config)}`, { input: config })
  }

  iterateSchema(config, schema)

  return config
}

function iterateSchema(item, schema) {
  for (const [key, rule] of Object.entries(schema)) {
    const value = item[key]

    if (rule.schema) {
      iterateSchema(item, rule.schema)
    }

    if (rule.required && value === undefined) {
      throw new ValidationError(`${key} is required`, { input: item });
    }
  }

  return schema
}