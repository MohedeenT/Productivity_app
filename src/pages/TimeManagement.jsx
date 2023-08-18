import { useContext } from "react";
import { stateContext } from "../App";

export default function TimeManagement(){

    const { state, setState } = useContext(stateContext);

    function startTimer() {
        // Check if timer is already running
        if (state.time.interval) {
            return
        }
        const id = setInterval(() => {

            setState((draft)=>{
                draft.time.currentTime ++ 
                const minutes = Math.floor(draft.time.currentTime / 60);
                const seconds = draft.time.currentTime % 60;
                draft.time.minutes = minutes;
                draft.time.seconds = seconds < 10 ? '0' + seconds : seconds;
            })
                return state.time.currentTime;
            
        }, 1000);

        setState((draft)=>{
            draft.time.interval = id
        })
        

    }

    const stopTimer = () => {
        if (state.time.interval) {
            clearInterval(state.time.interval);
            setState(draft => {
                draft.time.interval = null;
            });
        }
    }

const resetTimer = () =>{
    setState((draft)=>{
        draft.time.minutes = 0
        draft.time.seconds = "00"
        draft.time.currentTime = 0
    })
}

const handleClick = (btnVal)=>{
    setState((draft)=>{draft.time.timerRunning = !draft.time.timerRunning})
    btnVal === "START TIMER"  ? startTimer():stopTimer()
}


    return (
        <div
        id="timer-container">  
        <div id="timer">{state.time.minutes}:{state.time.seconds}</div>
        <div
        className="action-btns">
        <button onClick={(e)=>handleClick(e.target.innerText)}>{state.time.timerRunning? "Stop":"Start"} Timer</button>
        <button onClick={()=>resetTimer()}>Reset Timer</button>
        </div>
        </div>
    )
}
