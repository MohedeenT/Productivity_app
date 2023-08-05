import { useContext } from "react";
import { stateContext } from "../App";

export default function ToDos() {

    const addToDo = (e) => {
        e.preventDefault();
        setState((draft) => {
            const newTodo = {
                ...state.todos.newTodo,
                title: state.todos.itemToAdd,
                id: crypto.randomUUID()
            };
            draft.todos.todoList.push(newTodo);
            draft.todos.itemToAdd = "";
        });
    };
    
    const handleComplete = ( index)=>{
        setState((draft)=>{
            draft.todos.todoList[index].completed = true
        })
        console.log(state.todos.todoList);

    }

    const handleDelete = ( index) => {
        const confirmation = window.confirm('Are you sure you wish to delete this item?')
        if(!confirmation) return
        setState((draft) => {
                draft.todos.todoList.splice(index, 1);
        });
        console.log(state.todos.todoList);
    };

    const handleShow = () =>{
        setState((draft)=>{
            draft.todos.showCompleted = true
        })
    }

    const handleHide = () =>{
        setState((draft)=>{
            draft.todos.showCompleted = false
        })
    }
    


    const { state, setState } = useContext(stateContext);
    return(
    <>
        <h1>Welcome to the To dos page</h1>
        <form
        onSubmit={(e)=>addToDo(e)}>
        <input 
        type="text"
        placeholder="Enter your task"
        value={state.todos.itemToAdd} 
        onChange={(e)=> setState((draft)=>{
            draft.todos.itemToAdd = e.target.value
        })}
        />
        </form>
        <button
        onClick={()=>handleShow()}
        >Show completed</button>
        <button
        onClick={()=>handleHide()}>Hide completed</button>
        <div id="todo-list-container">
        <div id="todo-list">
        <ul>
        {state.todos.todoList.length>0 
        ? state.todos.todoList.map((todo, index)=>(
            <li
            style={todo.completed ? {color:"darkgray", display: state.todos.showCompleted ? "block":"none" }:{}} 
            key={crypto.randomUUID()}
            id={todo.id}
            >
                <h1>{todo.title}</h1>
                <button
                onClick={()=>handleDelete( index)}
                >X</button>
                <button
                onClick={()=>handleComplete( index)}
                >✓</button>
            </li>
            ))
        :
        "Nothing to display"
        }
        </ul>
        </div>
        </div>
    </>
    )
}