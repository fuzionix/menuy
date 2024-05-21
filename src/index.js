import { renderTree } from "./render"

export function create(menuData, target, config) {
  const container = document.querySelector(`[data-menuy="${target}"]`);
  const menuTree = renderTree(menuData)
  container.appendChild(menuTree)
  return menuTree
}