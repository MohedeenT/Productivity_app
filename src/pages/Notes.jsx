import { useContext } from "react";
import { stateContext } from "../App";

// notes:{
//     notesList:[],
//     noteToAddTitle:"",
//     noteToAddContent:"",
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
                noteTitle:state.notes.noteToAddTitle,
                content:state.notes.noteToAddContent,
                noteId:crypto.randomUUID()
            }
            const title = state.notes.noteToAddTitle.replace(/\s/g, '');
            const content = state.notes.noteToAddContent.replace(/\s/g, '');

            if (title.length === 0 && content.length === 0) {
                return
            }
            draft.notes.notesList.push(newNote)
            draft.notes.noteToAddTitle =""
            draft.notes.noteToAddContent =""

        })

    }

    const deleteNote=(IdnoteToDelete, index)=>{
    setState((draft) => {
        draft.notes.notesList[index].archived ?
        draft.notes.notesList = draft.notes.notesList.filter((note)=> note.noteId !== IdnoteToDelete)
        :
        draft.notes.notesList[index].archived = true
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
            value={state.notes.noteToAddTitle}
            required={true}
            placeholder="enter note title"
            onChange={(e)=>setState((draft)=>{
                draft.notes.noteToAddTitle = e.target.value
            })}
            id="note-title"
            type="text" />
            <textarea 
            value={state.notes.noteToAddContent}
            required={true}
            placeholder="start typing your note"
            onChange={(e)=>setState((draft)=>{
                draft.notes.noteToAddContent = e.target.value
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
            {state.notes.notesList.some((note)=>note.archived === true) && 
            <div
            className="action-btns">
            <button
            onClick={()=>setState((draft)=>{draft.notes.showArchived = !draft.notes.showArchived})}
            >{state.notes.showArchived ? "Hide":"Show"} Archived</button></div>}
    </div>
    <div
    id="notes-field">
        {state.notes.notesList.length === 0 && state.notes.showArchived === false && <span style={{textAlign:"center",width:"100%"}}><h2>No notes to display</h2></span>}
        {state.notes.notesList.length >0 && state.notes.notesList.map((note, index)=>(
            <div
            style={note.archived && !state.notes.showArchived?{display:"none"}:note.archived ? {background: "linear-gradient(gray, lightgray)"}:{}}
            className="note-container"
            key={`note-${index}`}>
                <button
                style={note.archived ? {backgroundColor:"gray",border:"gray"}:{}}
                onClick={()=>deleteNote(note.noteId, index)}
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