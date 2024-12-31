import { createElelement } from "../functions/dom.js"

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string}  title
 * @property {boolean} completed 
 */


export class TodoList {
    /**
     * @type {Todo[]}
     */
    #todos = []

    /**
     * @type {HTMLUListElement}
     */
    #listElement = []

    /**
     * 
     * @param {Todo[]} todos 
     */
    constructor(todos){
        this.#todos = todos
    }
    /**
     * 
     * @param {HTMLElement} element 
     */
    appendTo (element){
        element.innerHTML = `<form class="d-flex pb-4">
            <input required="" class="form-control" type="text" placeholder="Acheter des patates..." name="title" data-com.bitwarden.browser.user-edited="yes">
            <button class="btn btn-primary">Ajouter</button>
        </form>
        <main>
            <div class="btn-group mb-4" role="group">
                <button type="button" class=" btn btn-outline-primary active" data-filter="all">Toutes</button>
                <button type="button" class=" btn btn-outline-primary" data-filter="todo">A faire</button>
                <button type="button" class=" btn btn-outline-primary" data-filter="done">Faites</button>
            </div>

            <ul class="list-group">
                            
            </ul>
        </main>`
        this.#listElement = element.querySelector(".list-group")
        for(let todo of this.#todos){
            const item = new TodoListItem(todo)
            this.#listElement.append(item.element)
        }
        element.querySelector("form").addEventListener("submit", e => this.onSubmit(e)); 
    }

    /**
     * @param {SubmitEvent} e
     */
    onSubmit (e){
        e.preventDefault()
        const form = e.currentTarget
        const title = new FormData(form).get("title").toString().trim()
        if(title === ''){
            return
        }   
        const todo = {
            id: Date.now(),
            title,
            completed: false
        }
        const item = new TodoListItem(todo)
        this.#listElement.prepend(item.element)
        form.reset()
    }
}

class TodoListItem {
    #element
    /**
     * @type {Todo}
     */
    constructor (todo){
        const id = todo.id
        const li = createElelement("li",{
            class: "todo list-group-item d-flex align-items-center"
        })
        const checkbox = createElelement("input",{
            class: "form-check-input",
            type: "checkbox",
            checked: todo.completed ? '': null,
            id
        })
        
        const label = createElelement("label",{
            class: "ms-2 form-check-label",
            for: id
        })
        label.innerText = todo.title
        
        const deleteButton = createElelement("button",{
            class: "ms-auto btn btn-danger btn-sm"
        })
        deleteButton.innerHTML = `<i class="bi-trash"></i>`
        li.append(checkbox)
        li.append(label)
        li.append(deleteButton)

        deleteButton.addEventListener("click",(e)=>this.remove(e))  

        this.#element = li  
    }

    /**
     * 
     * @return {HTMLElement} element 
     */

    get element (){
        return this.#element
    }   
    /**
     * 
     * @param {PointerEvent} e 
     */
    remove (e) {
        e.preventDefault()
        this.#element.remove()
    }
}