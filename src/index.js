import { renderTree, initElement } from "./render"
import { defaultConfig } from "./config"
import { validateData } from "./validate"
import { ValidationError } from './error'
import { hasProperty } from "./util"

function create(menuData = [], target = '', config = {}) {
  const container = document.querySelector(`[data-menuy="${target}"]`)
  initElement(container)
  const initedConfig = initConfig(config, defaultConfig)

  try {
    const validatedMenuData = validateData(menuData, menuDataSchema)
    const menuTree = renderTree(validatedMenuData, 1, initedConfig)
    container.appendChild(menuTree)
    return { self: this, target, initedConfig, result: menuTree }
  } catch (err) {
    if (err instanceof ValidationError) {
      console.error(`${err.prefix}: ${err.message}`, err.data)
    } else {
      console.error(err)
    }
  }
}

function observe(create) {
  if (typeof create !== 'object' || create === null || !hasProperty(create, 'self') || create.self !== this) {
    throw new ValidationError('Invalid create argument. Only accept menuy.create() as an argument of observe()', { input: create })
  }

  const handler = {
    get: function(target, property, receiver) {
      return target?.[property] || ''
    },
    set: function(target, property, value, receiver) {
      create.self.create(value, create.target, create.config)
      target = target || {}
      target[property] = value
      return true
    }
  }

  return new Proxy([], handler)
}

function initConfig(config, defaultConfig, custom = false) {
  // Limit the number of array item not exceeding the user's number of array item to ensure complete array overwritting
  if (Array.isArray(defaultConfig)) {
    defaultConfig = defaultConfig.slice(0, (defaultConfig.length - config.length) * -1)
  }

  const mergedConfig = defaultConfig
  for (const [key, value] of Object.entries(config)) {
    if (typeof value === 'object') {
      if (key === 'style') {
        mergedConfig[key] = initConfig(value, mergedConfig[key] || {}, true)
      } else {
        mergedConfig[key] = initConfig(value, mergedConfig[key] || {})
      }
    } else {
      if (custom) {
        mergedConfig[key] = config[key]
      } else {
        if (hasProperty(mergedConfig, key)) {
          mergedConfig[key] = config[key]
        }
      }
    }    
  }
  return mergedConfig
}

const menuDataSchema = {
  name: {
    type: 'string',
    required: true
  },
  children: {
    type: 'array'
  },
  icon: {
    type: 'string',
  },
  disabled: {
    type: 'boolean'
  }
}

const configSchema = {

}

export default {
  create,
  observe
}