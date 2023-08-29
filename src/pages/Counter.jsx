import { useContext } from "react"
import { stateContext } from "../App";

export default function Counter(){
    const { state, setState } = useContext(stateContext);

    const addCounter = (e)=>{
        e.preventDefault()
        let val = state.counter.newCounterName.replace(/\s/g, '');
        if (val.length=== 0) return
        const newCounter = {
            id: crypto.randomUUID(),
            count:0,
            counterName: state.counter.newCounterName
        }
        setState((draft)=>{
            draft.counter.counterList.push(newCounter)
            draft.counter.newCounterName = ""
        })
    }

    const incrementCount = (index)=>{
        
        setState((draft)=>{
            draft.counter.counterList[index].count++
        })

    }
    const decrementCount = (index)=>{
        
        setState((draft)=>{
            draft.counter.counterList[index].count--
        })

    }

    const deleteCounter = (index)=>{
        setState((draft)=>{
            draft.counter.counterList.splice(index, 1);
        })
    }

    return(
        <>
        <div
        id="counter-setup"
        >
        <h1>Counter</h1>
        <form 
        action="submit"
        onSubmit={(e)=>addCounter(e)}>
        <input
        style={{textAlign:'center'}}
        placeholder="Enter counter name"
        value={state.counter.newCounterName}
        onChange={(e)=>setState((draft)=>{draft.counter.newCounterName = e.target.value})}
        type="text" />
        </form>
        </div>
        <div
        className="counter-container"
        >
        {state.counter.counterList.length>0 
        ? 
        state.counter.counterList.map((counter,index)=>{
            return(
                <>
                <div
                key={counter.id}
                className="counter-item">
                    <h2>{counter.counterName}</h2>
                <div
                id="display-and-delete-count">
                <section>Count: {counter.count}</section>
                </div>
                    <div
                    className="action-btns"
                    >
                    <button
                    style={{margin:"0.5em"}}
                    onClick={()=>decrementCount(index)}
                    >-</button> 
                    <button
                    style={{margin:"0.5em"}}
                    onClick={()=>incrementCount(index)}
                    >+</button>
                    <button
                    style={{margin:"0.5em"}}
                    onClick={()=>deleteCounter(index)}
                    >x</button>
                    </div>
                </div> 
                </>
            )
        })
        :
        <h2
        style={{textAlign:"center"}}>No counters</h2>
        
    }
    </div>
    </>

)
}