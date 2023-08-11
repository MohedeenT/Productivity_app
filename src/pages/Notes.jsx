import { useContext } from "react";
import { stateContext } from "../App";

// notes:{
//     notesList:[],
//     noteToAdd:"",
//     showArchived:false,
//     newNote:{
//         noteTitle:"",
//         content:"",
//         archived:false,
//         noteId:""
//     }
// }

export default function Notes() {
    const { state, setState } = useContext(stateContext);

    const createNote = (e)=>{
        e.preventDefault()
        
        setState((draft)=>{
            const newNote = {
                ...state.notes.newNote,
                noteTitle:state.notes.newNote.noteTitle,
                content:state.notes.newNote.content,
                noteId:crypto.randomUUID()
            }
            draft.notes.notesList.push(newNote)
            draft.notes.newNote.content =""
            draft.notes.newNote.noteTitle =""

        })

    }

    return(
    <>
    <div id="notes-header-and-input">
        <h1>Notes</h1>
        <form
        onSubmit={(e)=>createNote(e)}
        >
            <div id="inputs-container">
            <input 
            value={state.notes.newNote.noteTitle}
            placeholder="enter note title"
            onChange={(e)=>setState((draft)=>{
                draft.notes.newNote.noteTitle = e.target.value
            })}
            id="note-title"
            type="text" />
            <textarea 
            value={state.notes.newNote.content}
            placeholder="start typing your note"
            onChange={(e)=>setState((draft)=>{
                draft.notes.newNote.content = e.target.value
            })}
            id="note-content"
            type="text" />
            </div>
            <div
            className="action-btns">
            <button
            type="submit"
            >Create Note</button>
            </div>
        </form>
    </div>
    <div
    id="notes-field">
        {state.notes.notesList.length >0 && state.notes.notesList.map((note, index)=>(
            <div
            className="note-container"
            key={`note-${index}`}>
                <button
                className="delete-note">
                    X
                </button>
            <h2>{note.noteTitle}</h2>
            <p>{note.content}</p>
            </div>
        
        ))}

    </div>
    </>
    )
}