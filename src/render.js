export function renderTree(menuData, layer = 1) {
  const ul = document.createElement('ul')

  for (const item of menuData) {
    const li = document.createElement('li')
    const liItem = document.createElement('button')
    liItem.textContent = item.name
    liItem.addEventListener('click', () => {
      window.location.href = '#';
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