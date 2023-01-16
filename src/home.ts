const newListInput = document.querySelector('[data-new-list]') as HTMLInputElement
const lists = document.querySelector('[data-lists]') as HTMLInputElement
let eventTarget

let list = JSON.parse(localStorage.getItem('lists') || '[]') || []
console.log(list);


render()

newListInput?.addEventListener('keypress', function (event) {
    eventTarget = event.target as HTMLInputElement
    if (event.key === 'Enter' && eventTarget.value.length > 2) {

        let newItem = {
            id: Date.now(),
            name: eventTarget.value,
                items: []
        }

        list.push(newItem)
        eventTarget.value = ''
        render()
    }
})

function render(){
    save()
    lists.innerHTML = ''
    for(let i = 0; i < list.length; i++){
        lists.innerHTML += `
        <div class="lists__list" data-item >
            <input type="text" value="${list[i].name}" id="${list[i].id}" disabled data-item-input>
            <div class="lists__item-options">
                <img src="icons/icon-edit.png" alt="Edit list" data-edit id="${list[i].id}">
                <img src="icons/icon-delete.png" alt="Delete list" data-delete id="${list[i].id}">      
            </div>
        </div>
        `
    }

    let itemEdit: NodeListOf<HTMLElement> = document.querySelectorAll('[data-edit]')    
    let itemDelete: NodeListOf<HTMLElement> = document.querySelectorAll('[data-delete]')   


    itemEdit?.forEach( function(element){
        element.addEventListener('click', (event) =>{
            eventTarget = event.target as HTMLInputElement
            let currentId = eventTarget.id
            let item = document.getElementById(currentId) as HTMLInputElement
            item.removeAttribute('disabled')
            item.focus()
            //cursor no final do texto
            item.selectionStart = item.selectionEnd = item.value.length
            let safeValue = item.value

            item.addEventListener('blur', ()=>{
                if(item.value.length < 3){
                    item.value = safeValue
                }
             
                let index = list.findIndex((list => list.id == parseInt(eventTarget.id)))
                list[index].name = item.value
                save()
            
                safeValue = item.value
                item.setAttribute('disabled', '')
            })
        })
    })


    itemDelete?.forEach(function (element){
        element.addEventListener('click', (event) => {
            eventTarget = event.target as HTMLInputElement
            let currentId:number = parseInt(eventTarget.id)
            list = list.filter(list => list.id !== currentId)
            save()
            render()
            
        })
    })


   lists.addEventListener('click', (event) => {
        eventTarget = event.target as HTMLInputElement
        if(eventTarget.tagName !== 'IMG'){
            let currentList = eventTarget.id
            localStorage.setItem('currentList', JSON.stringify(currentList))
            window.location.href = 'list.html'
        }
        
   }) 
}


function save(){
    localStorage.setItem('lists', JSON.stringify(list))
}