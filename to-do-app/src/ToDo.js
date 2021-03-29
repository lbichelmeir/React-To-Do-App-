import React, {useState, useEffect} from 'react'

function TodosComponent() {
    const [currentTodo, setCurrentTodo] = useState("")
    const [todos, setTodos] = useState([])
    
    // IMPLEMENTING LOCAL STORAGE: PERSISTING DATA

    // only run once the first time this component is rendered
    useEffect(() => {
        if (localStorage.getItem('todosData')) {
        setTodos(JSON.parse(localStorage.getItem("todosData")))
        }
    }, [])
    // run every time our todos state changes
        useEffect(() => {
        localStorage.setItem('todosData', JSON.stringify(todos))
        }, [todos])




    

    function createNewTodo(currentTodo) {
        let todosArray = [...todos]
        todosArray.push({
            todo: currentTodo,
            isCompleted: false
        })
        setTodos(todosArray)
    }

    function completeTodo(index) {
        let todosArray = [...todos]
        todosArray[index].isCompleted = !todosArray[index].isCompleted
        setTodos(todosArray)
    }

    function deleteTodo(index) {
        let todosArray = [...todos]
        todosArray.splice(index, 1)
        setTodos(todosArray)
    }



    return (
        <div>
            <input 
                className="todo-input"
                value={currentTodo}
                onChange={e => {
                    setCurrentTodo(e.target.value)
                }}
                onKeyPress ={e => {
                    if (e.key === "Enter") {
                        createNewTodo(currentTodo)
                        setCurrentTodo("")
                    }
                }}
                placeholder="what needs to get done?"

            />


            {todos.map((todo, index) => (
                <div key={todo} className="todo">
                    <div 
                        className={todo.isCompleted ? "checkbox checkedbox": "checkbox"}
                        onClick={() => completeTodo(index)}>
                        {todo.isCompleted && <span className="checkmark"> &#x2713; </span>}
                    </div>


                    <div className={todo.isCompleted ? "done" : ""}>
                        {todo.todo}
                    </div>
                    <div className="delete" onClick={() => deleteTodo(index)}>
                        {/* &#128465; */}
                        <i class="fa fa-trash-o"></i>
                        
                    </div>

                </div>
             ))
            }       

            



            {todos.length > 0 && `${todos.length} items`}
            
        </div>
    )
}

export default TodosComponent;


// const [todos, setTodos] = useState([
    //     {
    //         todo: "learn React",
    //         isCompleted: false
    //       },
    //       {
    //         todo: "buy oat milk",
    //         isCompleted: true
    //       },

    //       {
    //         todo: "walk the dogs",
    //         isCompleted: false
    //       }

    // ])

{/* <p> {todo.todo}</p> */}