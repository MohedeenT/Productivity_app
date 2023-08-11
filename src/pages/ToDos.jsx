import { useContext, useEffect, useState } from "react";
import { stateContext } from "../App";

export default function ToDos() {

    const [dots, setDots] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500); // 1000ms delay

    return () => clearInterval(intervalId); // clean up on unmount
  }, []);

    const addToDo = (e) => {
        e.preventDefault();
        let val = state.todos.itemToAdd.replace(/\s/g, '');
        if (val.length ===0) return
        if (val.length > 58) {
            alert("too long")
            return
        }
        
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
    
    const handleComplete = (index)=>{
        setState((draft)=>{
            draft.todos.todoList[index].completed = !draft.todos.todoList[index].completed 
        })

    }

    const handleCompleteAll = ()=>{
        const confirmation = window.confirm('Are you sure you wish to complete all items?')
        if(!confirmation) return
        setState((draft) => {
            draft.todos.todoList.map((x)=>x.completed = true)

        });
    }

    const handleDelete = (index) => {
        const confirmation = window.confirm('Are you sure you wish to delete this item?')
        if(!confirmation) return
        setState((draft) => {
                draft.todos.todoList.splice(index, 1);
        });
    };

    const handleDeleteAll = () => {
        const confirmation = window.confirm('Are you sure you wish to delete all items?')
        if(!confirmation) return
        setState((draft) => {
                draft.todos.todoList.length = 0
        });
    };

    const handleShow = () =>{
        setState((draft)=>{
            draft.todos.showCompleted = !draft.todos.showCompleted
        })
    }
    


    const { state, setState } = useContext(stateContext);
    return(
    <>
        <div id="header-and-input">
        <h1>To Do list</h1>
        <form
        onSubmit={(e)=>addToDo(e)}>
        <input 
        id="to-do-input"
        type="text"
        placeholder="Enter your task"
        value={state.todos.itemToAdd} 
        onChange={(e)=> setState((draft)=>{
            draft.todos.itemToAdd = e.target.value
        })}
        />
        </form>
        <div
        className="action-btns">
        <button
        style={{display:state.todos.todoList.length >0 ? "":"none"}} 
        onClick={()=>handleShow()}
        >{state.todos.showCompleted ? "Hide":"Show"} completed</button>
        <button
        style={{display:state.todos.todoList.length >1 ? "":"none"}} 
        onClick={()=>handleDeleteAll()}
        >Delete All To Dos</button>
        <button
        style={{display:state.todos.todoList.length >1 ? "":"none"}} 
        onClick={()=>handleCompleteAll()}
        >Complete All</button>
        </div>
        </div>
        <div id="todo-list-container">
        <div id="todo-list">
        {state.todos.todoList.length>0 
        ? state.todos.todoList.map((todo, index)=>(
            <div id="todo-block">
            <button
            style={todo.completed ? {display: state.todos.showCompleted ? "block":"none" }:{}} 
            id="complete-btn"
            onClick={()=>handleComplete( index)}
            >✓</button>
            <li
            style={todo.completed ? {color:"darkgray", display: state.todos.showCompleted ? "block":"none" }:{}} 
            key={crypto.randomUUID()}
            id={todo.id}
            >
                <div className="todo-item">
                <h1>{todo.title}</h1>
                
                </div>
            </li>
                <button
                style={todo.completed ? {display: state.todos.showCompleted ? "block":"none" }:{}} 
                id="delete-btn"
                onClick={()=>handleDelete( index)}
                >X</button>
            </div>
            ))
        :
        <h2>{`Nothing to display${dots}`}</h2>
        }
        </div>
        </div>
    </>
    )
}