export default function TimeManagement(){

    let interval;
    let time = 0;

    function startTimer() {
        // Check if timer is already running
        if (interval) {
            return;
        }

        interval = setInterval(function() {
            time++;

            const minutes = Math.floor(time / 60);
            const seconds = time % 60;

            // Display the result in the element with id="timer"
            document.getElementById('timer').textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }, 1000);
    }

function stopTimer() {
    clearInterval(interval);
    interval = null;
}

const resetTimer = () =>{
    time=0
}


    return (
        <div
        id="timer-container">  
        <div id="timer">0:0{time}</div>
        <div
        className="action-btns">
        <button onClick={()=>startTimer()}>Start Timer</button>
        <button onClick={()=>stopTimer()}>Stop Timer</button>
        <button onClick={()=>resetTimer()}>Reset Timer</button>
        </div>
        </div>
    )
}

//to fix: use state to manipulate time