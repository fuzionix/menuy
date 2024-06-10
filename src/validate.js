import { ValidationError } from './error'
import { hasProperty } from "./util"

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

export function validateConfig(config, schema, root = true) {
  if (root && (typeof config !== 'object' || Array.isArray(config) || config === null)) {
    throw new ValidationError(`config must be an object not ${Object.prototype.toString.call(config)}`, { input: config })
  }

  for (const [key, value] of Object.entries(config)) {
    if ((typeof value === 'object' || Array.isArray(value)) && value !== null) {
      validateConfig(value, schema, false)
    }
  }
  
  iterateSchema(config, schema)
  return config
}

function iterateSchema(item, schema) {
  for (const [key, rule] of Object.entries(schema)) {
    const value = item[key]
    if (rule.required && value === undefined) {
      throw new ValidationError(`${key} is required`, { input: item })
    }
    if (value !== undefined) {
      switch (rule.type) {
        case 'number':
          if (typeof value !== 'number') {
            throw new ValidationError(`${key} must be a number`, { input: value })
          }
          break
        case 'string':
          if (typeof value !== 'string') {
            throw new ValidationError(`${key} must be a string`, { input: value })
          }
          break
        case 'array':
          if (!Array.isArray(value) || value.length === 0) {
            throw new ValidationError(`${key} must be an array`, { input: value })
          }
          if (rule.schema) {
            for (const item of value) {
              if (hasProperty(rule, 'itemType') && typeof item !== rule.itemType) {
                throw new ValidationError(`Array items in ${key} must be ${rule.itemType}`, { input: value })
              }
              iterateSchema(item, rule.schema)
            }
          }
          break
        case 'object':
          if (typeof value !== 'object' || value === null) {
            throw new ValidationError(`${key} must be an object`, { input: value })
          }
          if (rule.schema) {
            iterateSchema(value, rule.schema)
          }
          break
      }
    }
  }
  return schema
}