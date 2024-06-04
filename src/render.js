import { hasProperty } from "./util"

export function renderTree(menuData, depth = 1, config = {}) {
  const ul = document.createElement('ul')

  for (const item of menuData) {
    const li = document.createElement('li')
    const liItem = document.createElement('button')
    const liItemText = document.createElement('p')
    const layerItem = config.layer[Math.min(config.layer.length, depth) - 1]

    if (hasProperty(item, 'icon') || hasProperty(layerItem, 'icon')) {
      liItem.appendChild(createIcon(item, layerItem))
    }

    liItemText.textContent = item.name
    liItem.appendChild(liItemText)
    liItem.addEventListener('click', () => {
      window.location.href = '#'
    })
    li.appendChild(liItem)

    if (item.children) {
      const childUl = renderTree(item.children, depth + 1, config)
      li.appendChild(childUl)
    }

    ul.appendChild(li)
  }

  return ul
}

export function initElement(element) {
  const styleName = 'menuy-init'
  // RESET ELEMENT
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }

  if (document.getElementById(styleName) === null) {
    const styleElement = document.createElement('style')
    const selector = `${element.tagName.toLowerCase()}[data-menuy]`
    styleElement.setAttribute('id', styleName)
    styleElement.textContent = `
      ${selector} *, 
      ${selector} *::before, 
      ${selector} *::after {
        box-sizing: border-box;
      }

      ${selector} * {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline
      }

      ${selector} {
          line-height: 1
      }
      ${selector} ol, ${selector} ul{
          list-style: none
      }
    `

    document.head.appendChild(styleElement)
  }
}

function createIcon(item, layerItem) {
  let icon = null
  icon = document.createElement(layerItem.iconType.tag)
  return icon
}