import { renderTree } from "./render"

export function create(menuData, target, config) {
  const menuTree = renderTree(menuData)
  return menuTree
}