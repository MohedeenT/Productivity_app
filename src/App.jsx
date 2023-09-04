import { useImmer } from "use-immer";
import Navigation from "./Navigation";
import { createContext, useEffect } from "react";

const stateContext = createContext();

function App(){

    
    const [state, setState] = useImmer(()=>{
    const localValues = localStorage.getItem("ITEMS")
        return localValues ? JSON.parse(localValues):{
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
                noteToAddTitle:"",
                noteToAddContent:"",
                newNote:{
                    noteTitle:"",
                    content:"",
                    archived:false,
                    noteId:""
                }
            },
            time:{
                interval:null,
                currentTime:0,
                minutes:0,
                seconds:"00",
                timerRunning:false
            },
            counter:{
                counterList:[],
                newCounterName:""
            },
            calculator:{
                display:0,
                leftOperand:"",
                currentOperator:"",
                rightOperand:"",
                prevRight:"",
                prevOperator:""
            }
        }
    })

    useEffect(()=>{
        localStorage.setItem("ITEMS", JSON.stringify(state))
    },[state])


    return (
        <stateContext.Provider value={{state,setState}}>
        <Navigation/>
        </stateContext.Provider>

        )
}
export  {App, stateContext};