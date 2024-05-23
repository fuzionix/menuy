import { defaultConfig } from "./config"

export function renderTree(menuData, layer = 1, config = {}) {
  const ul = document.createElement('ul')

  for (const item of menuData) {
    const li = document.createElement('li')
    const liItem = document.createElement('button')
    const liItemText = document.createElement('p')

    if (item.hasOwnProperty('icon')) {
      liItem.appendChild(createIcon(item, layer, config))
    }

    liItemText.textContent = item.name
    liItem.appendChild(liItemText)
    liItem.addEventListener('click', () => {
      window.location.href = '#'
    })
    li.appendChild(liItem)

    if (item.children) {
      const childUl = renderTree(item.children, layer + 1, config)
      li.appendChild(childUl)
    }

    ul.appendChild(li)
  }

  return ul
}

export function initElement(element) {
  const styleElement = document.createElement('style')
  const selector = `${element.tagName.toLowerCase()}[data-menuy]`
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

function createIcon(item, layer, config) {
  let icon = null
  if (config?.layer?.[layer - 1]?.icon?.tag) {
    icon = document.createElement(config.layer[layer - 1].icon.tag)
  } else {
    icon = document.createElement('img')
  }
  return icon
}