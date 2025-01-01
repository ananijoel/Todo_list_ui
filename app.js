import { fetchJSON } from "./functions/api.js"
import { createElelement } from "./functions/dom.js"
import { TodoList } from "./Components/TodoList.js"

try{
    //const todos = await fetchJSON("https://jsonplaceholder.typicode.com/todos?_limit=10")
    //const todos = await fetchJSON("http://localhost:3000/get-todo")
    const todos = await fetchJSON("https://anatide.ulrichanani.com/api/get-todo")
    const list = new TodoList(todos)
    list.appendTo(document.querySelector('#todolist'))
} catch (error){
    console.log(error)
    const alertElement = createElelement("div",
        {
        class: "alert alert-danger m-2",
        role: "alert"
        })
    alertElement.innerText = "Impossible de charger les todos"
    document.body.prepend(alertElement)
}

