import { renderTree, initElement } from "./render"
import { defaultConfig } from "./config"
import { validate } from "./validate"

export function create(menuData, target, config) {
  const container = document.querySelector(`[data-menuy="${target}"]`)
  initElement(container)
  config = initConfig(config)

  try {
    menuData = validate(menuData, menuDataSchema)
  } catch (err) {
    console.error(err)
  }
  
  const menuTree = renderTree(menuData, 1, config)
  container.appendChild(menuTree)
  return menuTree
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