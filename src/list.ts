let listContainerEl = document.querySelector('[data-list-container]') as HTMLInputElement
let newItemBtn = document.querySelector('[data-new-item]') as HTMLElement
let backArrowBtn = document.querySelector('[data-back-arrow]') as HTMLElement
let checkbox, itemTitle


backArrowBtn.addEventListener('click', () => {
    window.location.href = 'index.html'
})


//https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

let currentList: string, allLists, index: number
let currentListEl = document.querySelector('[data-current-list]') as HTMLElement
currentListEl.textContent = getListName()

//uso da funcao para agrupar categorias    
const listCategories = groupBy(getListObject().items, items => items.category);

function getList(): void{
     currentList = JSON.parse(localStorage.getItem('currentList') || '') || ''
     allLists = JSON.parse(localStorage.getItem('lists') || '') || []
     index = allLists.findIndex((allLists => allLists.id == currentList))
}


function getListName(): string{
    getList()
    return allLists[index].name
}

function getListObject(){
    getList()
    return allLists[index]
}

function renderList(){
    for (let value of listCategories.entries()){
        let itemSection = listContainerEl.appendChild(document.createElement('section'))
        itemSection.classList.add('categories')
    
        let titleSpan = itemSection.appendChild(document.createElement('span'))
        titleSpan.classList.add('categories__title')
        titleSpan.textContent = value[0]

        switch (value[0]) {
            case 'Care products':
                titleSpan.classList.add('care-products')
              break;
            case 'Meat & Fish':
                titleSpan.classList.add('meat-fish')
                break;
            case 'Dairy':
                titleSpan.classList.add('dairy')
                break;
            case 'Snacks':
                titleSpan.classList.add('snacks')
                break;
            case 'Vegetables and fruit':
                titleSpan.classList.add('vegetables')
                break;
            case 'Bread & bread spreads':
                titleSpan.classList.add('bread')
                break;
            case 'Dried goods':
                titleSpan.classList.add('dried-goods')
                break;
            case 'Meat & Fish':
                titleSpan.classList.add('meat-fish')
                break;  
            default:
          }

    
        for(let i = 0; i < value.length; i++){
            if(value[1][i] !== undefined){
                let itemDiv = itemSection.appendChild(document.createElement('div'))
                itemDiv.classList.add('items')
    
                let itemDivChild = itemDiv.appendChild(document.createElement('div'))
                itemDivChild.classList.add('name__quantity')
                
                
                checkbox = itemDivChild.appendChild(document.createElement('input'))
                checkbox.classList.add('checkmark')
                checkbox.type = ('checkbox')
                checkbox.id = value[1][i].id
                value[1][i].checked ? checkbox.checked = true : checkbox.checked = false
                
                itemTitle = itemDivChild.appendChild(document.createElement('input'))
                itemTitle.classList.add('items__name')
                itemTitle.value = value[1][i].itemName
                itemTitle.id = value[1][i].id
                itemTitle.dataset.id = value[1][i].id
                
                
                let quantityInput = itemDivChild.appendChild(document.createElement('input'))
                quantityInput.value = value[1][i].itemQuantity
                quantityInput.classList.add('items__quantity')
                quantityInput.value = value[1][i].itemQuantity
                quantityInput.setAttribute("disabled", "");
                  
            }  
        }
    }



    let checkboxes = document.querySelectorAll("input")
    checkboxes.forEach((box) => {
        if(box.type === 'checkbox'){
            box.addEventListener('click', () => {
                    let getItem = getListObject().items
                    let currentId = parseInt(box.id)
                    let checkItem = getItem.find(getItem => getItem.id === currentId)
                    checkItem.checked = !checkItem.checked
                    localStorage.setItem('lists', JSON.stringify(allLists))
                    
              })
        }
      })

    let itemTitleInput = document.querySelectorAll('[data-id]')
    
    itemTitleInput.forEach((item) => {
        item.addEventListener('blur', (e) => {
            let eTarget = e.target as HTMLInputElement
            let getItem = getListObject().items
            let newValue = eTarget.value
            let currentId = parseInt(eTarget.id)
            let updateItem = getItem.find(getItem => getItem.id === currentId)
            let safeValue = updateItem.itemName
            if(newValue.length < 4){
                updateItem.itemName = safeValue
                localStorage.setItem('lists', JSON.stringify(allLists))
                item.textContent = safeValue
                listContainerEl.innerHTML = ''
                renderList()
                
            } else {
                updateItem.itemName = newValue
                localStorage.setItem('lists', JSON.stringify(allLists))
            }
            
            
        })
    }) 
}


newItemBtn.addEventListener('click', () => {
     window.location.href = 'new-product.html'
})

renderList()










  



