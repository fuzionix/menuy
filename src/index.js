import { renderTree, initElement } from "./render"
import { defaultConfig } from "./config"
import { validateData } from "./validate"
import { ValidationError } from './error';

export function create(menuData, target, config) {
  const container = document.querySelector(`[data-menuy="${target}"]`)
  initElement(container)
  config = initConfig(config)

  try {
    const validatedMenuData = validateData(menuData, menuDataSchema)
    const menuTree = renderTree(validatedMenuData, 1, config)
    container.appendChild(menuTree)
    return menuTree
  } catch (err) {
    if (err instanceof ValidationError) {
      console.error(`${err.prefix}: ${err.message}`, err.data)
    } else {
      console.error(err)
    }
  }
}

export function observe() {
  const handler = {
    get: function(target, property, receiver) {
      return target?.[property] || ''
    },
    set: function(target, property, value, receiver) {
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
    type: 'string'
  }
}

const configSchema = {

}