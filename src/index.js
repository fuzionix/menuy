import { renderTree, initElement } from "./render"
import { defaultConfig } from "./config"

export function create(menuData, target, config) {
  const container = document.querySelector(`[data-menuy="${target}"]`)
  initElement(container)
  config = initConfig(config)
  const menuTree = renderTree(menuData, 1, config)
  container.appendChild(menuTree)
  return menuTree
}

function initConfig(config) {
  config.layer = config?.layer || defaultConfig.layer
  config.layer = config?.layer.length === 0 ? defaultConfig.layer : config.layer
  return config
}