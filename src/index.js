import { renderTree, initElement } from "./render"

export function create(menuData, target, config) {
  const container = document.querySelector(`[data-menuy="${target}"]`)
  initElement(container)
  const menuTree = renderTree(menuData)
  container.appendChild(menuTree)
  return menuTree
}