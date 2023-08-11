import { useImmer } from "use-immer";
import Navigation from "./Navigation";
import { createContext } from "react";

const stateContext = createContext();

function App(){

    const [state, setState] = useImmer({
        todos:{
            todoList:[],
            itemToAdd:"",
            showCompleted:false,
            newTodo:{
                title:"",
                completed:false,
                id:""
            }
        },
        notes:{
            notesList:[],
            showArchived:false,
            newNote:{
                noteTitle:"",
                content:"",
                archived:false,
                noteId:""
            }
        }
    })

    return (
        <stateContext.Provider value={{state,setState}}>
        <Navigation/>
        </stateContext.Provider>

        )
}
export  {App, stateContext};