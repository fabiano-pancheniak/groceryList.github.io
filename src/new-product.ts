let categoriesArray = [
    'Other',
    'Meat & Fish',
    'Dairy',
    'Vegetables and fruit',
    'Freezer',
    'Bread & bread spreads',
    'Dried goods',
    'Snacks',
    'Care products'
]


let categoriesEl = document.querySelector('[data-category-select]') as HTMLInputElement
let itemNameInput = document.querySelector('[data-item-name]') as HTMLInputElement
let itemQuantityInput = document.querySelector('[data-item-quantity]') as HTMLInputElement
let confirmBtn = document.querySelector('[data-item-confirm]') as HTMLInputElement

let currentList2 = JSON.parse(localStorage.getItem('currentList') || '') || ''
let allLists2 = JSON.parse(localStorage.getItem('lists') || '') || []
let index2 = allLists2.findIndex((allLists2 => allLists2.id == currentList2))
     

for(let i = 0; i < categoriesArray.length; i++){
    categoriesEl.innerHTML += `<option value="${categoriesArray[i]}" data-item-category>${categoriesArray[i]}</option>`
}

confirmBtn.addEventListener('click', () => {
    let itemObject = {
        id: Date.now(),
        category: categoriesEl.value,
        itemName: itemNameInput.value,
        itemQuantity: itemQuantityInput.value,
        checked: false
    }
    allLists2[index2].items.push(itemObject)
    localStorage.setItem('lists', JSON.stringify(allLists2))
    window.location.href = 'list.html'
    
})




