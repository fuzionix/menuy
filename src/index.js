import { renderTree, initElement } from "./render"
import { defaultConfig } from "./config"
import { validateData } from "./validate"
import { ValidationError } from './error'
import { hasProperty } from "./util"

export function create(menuData = [], target = '', config = {}) {
  const container = document.querySelector(`[data-menuy="${target}"]`)
  initElement(container)
  config = initConfig(config)

  try {
    const validatedMenuData = validateData(menuData, menuDataSchema)
    const menuTree = renderTree(validatedMenuData, 1, config)
    container.appendChild(menuTree)
    return { self: this, target, config, result: menuTree }
  } catch (err) {
    if (err instanceof ValidationError) {
      console.error(`${err.prefix}: ${err.message}`, err.data)
    } else {
      console.error(err)
    }
  }
}

export function observe(create) {
  if (typeof create !== 'object' || create === null || !hasProperty(create, 'self')) {
    if (create.self !== this) {
      throw new ValidationError('Invalid create argument. Only accept menuy.create() as an argument of observe()', { input: create })
    }
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

function initConfig(config) {
  config.layer = config?.layer || defaultConfig.layer
  config.layer = config?.layer.length === 0 ? defaultConfig.layer : config.layer
  return config
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