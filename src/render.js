export function renderTree(menuData, layer = 1) {
  const ul = document.createElement('ul')

  for (const item of menuData) {
    const li = document.createElement('li')
    const liItem = document.createElement('button')
    const liItemText = document.createElement('p')

    if (item.hasOwnProperty('icon')) {
      let icon = null
      if (item.hasOwnProperty('iconTag') && (item.iconTag === 'i')) {
        icon = document.createElement(item.iconTag)
      } else {
        icon = document.createElement('img')
      }
      
      liItem.appendChild(icon)
    }

    liItemText.textContent = item.name
    liItem.appendChild(liItemText)
    liItem.addEventListener('click', () => {
      window.location.href = '#'
    })
    li.appendChild(liItem)

    if (item.children) {
      const childUl = renderTree(item.children, layer + 1)
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