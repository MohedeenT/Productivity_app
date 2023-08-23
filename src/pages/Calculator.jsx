import { useContext } from "react"
import { stateContext } from "../App"

// calculator:{
//     display:0,
//     currentVal:"",
//     currentOperator:"",
//     nextVal:""
// }

export default function Calculator(){

    const {state, setState } = useContext(stateContext)

    const stage = (value)=>{
        //value comes in as a string
        
        !state.calculator.currentOperator ?
        // if there is no operator
        setState((draft)=>{
            draft.calculator.currentVal += value
            draft.calculator.display = draft.calculator.currentVal
        })
        :
        // if there is an operator
        setState((draft)=>{
            draft.calculator.nextVal += value
            draft.calculator.display = draft.calculator.nextVal
        })
    }

    const evaluate = ()=>{
        const left = state.calculator.currentVal
        const operator = state.calculator.currentOperator
        const right = state.calculator.nextVal
        
        if (state.calculator.currentVal && state.calculator.currentOperator && state.calculator.nextVal) {
            switch (operator) {
                case "+":
                    setState((draft)=>{
                        draft.calculator.display = +left + +right
                    })
                    break;
                case "-":
                    setState((draft)=>{
                        draft.calculator.display = +left - +right
                    })
                    break;
                case "/":
                    setState((draft)=>{
                        draft.calculator.display = +left / +right
                    })
                    break;
                case "x":
                    setState((draft)=>{
                        draft.calculator.display = +left * +right
                    })
                    break;
            
                default:
                    console.log("defaulted out");
                    break;
            }
            setState((draft)=>{
                draft.calculator.currentVal = ""
                draft.calculator.currentOperator = ""
                draft.calculator.nextVal = ""
            })
        }
    }

    const clear = () => {
        !state.calculator.currentOperator ?
        setState((draft)=>{
            draft.calculator.currentVal = ""
            draft.calculator.display = 0
        })
        :
        state.calculator.nextVal ?
        setState((draft)=>{
            draft.calculator.nextVal = ""
            draft.calculator.display = 0
        })
        :
        setState((draft)=>{
            draft.calculator.display = 0
            draft.calculator.currentOperator = ""
            draft.calculator.currentVal = ""
        })

    }

    const posNeg = ()=>{

        if (state.calculator.currentOperator) {
            setState((draft)=>{
                draft.calculator.nextVal *=-1
            })
        }

    }

    return(
    <>
    <h1>CALCULATOR</h1>
    <div
    className="calculator-container">
        <div>
            <input
            value={state.calculator.display}
            disabled={true} />
        </div>
        <div
        id="section-1">
        <button
        onClick={()=>clear()}>AC</button>
        <button
        onClick={()=>posNeg()}
        >+/-</button>
        <button>%</button>
        <button
        onClick={(e)=>setState((draft)=>{
            draft.calculator.currentOperator = e.target.innerText
            if(!draft.calculator.currentVal)draft.calculator.currentVal = String(draft.calculator.display)
        })}
        >/</button>
        </div>
        <div
        id="section-2">
        <button
        onClick={(e)=>stage(e.target.innerText)}
        >7</button>
        <button
        onClick={(e)=>stage(e.target.innerText)}
        >8</button>
        <button
        onClick={(e)=>stage(e.target.innerText)}
        >9</button>
        <button
        onClick={(e)=>setState((draft)=>{
            draft.calculator.currentOperator = e.target.innerText
            if(!draft.calculator.currentVal)draft.calculator.currentVal = String(draft.calculator.display)
        })}
        >x</button>
        </div>
        <div
        id="section-3">
        <button
        onClick={(e)=>stage(e.target.innerText)}
        >4</button>
        <button
        onClick={(e)=>stage(e.target.innerText)}
        >5</button>
        <button
        onClick={(e)=>stage(e.target.innerText)}
        >6</button>
        <button
        onClick={(e)=>setState((draft)=>{
            draft.calculator.currentOperator = e.target.innerText
            if(!draft.calculator.currentVal)draft.calculator.currentVal = String(draft.calculator.display)
        })}
        >-</button>
        </div>
        <div
        id="section-4">
        <button
        onClick={(e)=>stage(e.target.innerText)}
        >1</button>
        <button
        onClick={(e)=>stage(e.target.innerText)}
        >2</button>
        <button
        onClick={(e)=>stage(e.target.innerText)}
        >3</button>
        <button
        onClick={(e)=>setState((draft)=>{
            draft.calculator.currentOperator = e.target.innerText
            if(!draft.calculator.currentVal)draft.calculator.currentVal = String(draft.calculator.display)
        })}
        >+</button>
        </div>
        <div
        id="section-5">
        <button
        onClick={(e)=>stage(e.target.innerText)}
        >0</button>
        <button>.</button>
        <button
        onClick={()=>evaluate()}
        >=</button>
        </div>
        <button
        onClick={()=>{console.log(state.calculator.currentOperator);}}
        >POTATO</button>
    </div>
    </>
    )
}