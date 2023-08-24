import { useContext } from "react"
import { stateContext } from "../App"

// calculator:{
//     display:0,
//     leftOperand:"",
//     currentOperator:"",
//     rightOperand:"",
//     prevRight:"",
//     prevOperator:""
// }

export default function Calculator(){

    const {state, setState } = useContext(stateContext)

    const stage = (value)=>{
        //value comes in as a string
        const dot = value === "."
        
        !state.calculator.currentOperator ?
        // if there is no operator
        setState((draft)=>{
            if (dot) {
                if (state.calculator.leftOperand.includes(".")) {
                    return
                }
                if (state.calculator.leftOperand === "") {
                    value = "0."                    
                }
            }
            draft.calculator.leftOperand += value
            draft.calculator.display = draft.calculator.leftOperand
        })
        :
        // if there is an operator
        setState((draft)=>{
            if (dot) {
                if (state.calculator.rightOperand.includes(".")) {
                    return
                }
                if (state.calculator.rightOperand === "") {
                    value = "0."                    
                }
            }
            draft.calculator.rightOperand += value
            draft.calculator.display = draft.calculator.rightOperand
        })
    }

    const evaluate = ()=>{
        const left = state.calculator.leftOperand
        const operator = state.calculator.currentOperator
        const right = state.calculator.rightOperand
        
        if (state.calculator.leftOperand && state.calculator.currentOperator && state.calculator.rightOperand) {
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
                draft.calculator.prevRight = draft.calculator.rightOperand
                draft.calculator.prevOperator = draft.calculator.currentOperator
                draft.calculator.leftOperand = ""
                draft.calculator.currentOperator = ""
                draft.calculator.rightOperand = ""
            })
        }
        if (state.calculator.prevRight && state.calculator.prevOperator) {
            setState((draft=>{
                switch (draft.calculator.prevOperator) {
                    case "+":
                        setState((draft)=>{
                            draft.calculator.display += draft.calculator.prevRight
                        })
                        break;
                    case "-":
                        setState((draft)=>{
                            draft.calculator.display -= draft.calculator.prevRight
                        })
                        break;
                    case "/":
                        setState((draft)=>{
                            draft.calculator.display /= draft.calculator.prevRight
                        })
                        break;
                    case "x":
                        setState((draft)=>{
                            draft.calculator.display *= draft.calculator.prevRight
                        })
                        break;
                
                    default:
                        console.log("defaulted out");
                        break;
                }
            }))
        }
    }

    const clear = () => {
        !state.calculator.currentOperator ?
        setState((draft)=>{
            draft.calculator.leftOperand = ""
            draft.calculator.display = 0
            draft.calculator.prevOperator = ""
            draft.calculator.prevRight = ""
        })
        :
        state.calculator.rightOperand ?
        setState((draft)=>{
            draft.calculator.rightOperand = ""
            draft.calculator.display = 0
        })
        :
        setState((draft)=>{
            draft.calculator.display = 0
            draft.calculator.currentOperator = ""
            draft.calculator.leftOperand = ""
            draft.calculator.prevOperator = ""
            draft.calculator.prevRight = ""
        })

    }

    const posNeg = ()=>{

        !state.calculator.currentOperator ?
        setState((draft)=>{
            draft.calculator.display *= -1
            if(draft.calculator.leftOperand)draft.calculator.leftOperand *= -1
        })
        :
        state.calculator.rightOperand ?
        setState((draft)=>{
            draft.calculator.display *= -1
            draft.calculator.rightOperand *= -1
        })
        :
        setState((draft)=>{
            draft.calculator.display *= -1
        })

    }

    const percent = ()=>{

        !state.calculator.currentOperator ?
        setState((draft)=>{
            draft.calculator.display /= 100
            if(draft.calculator.leftOperand)draft.calculator.leftOperand /= 100
        })
        :
        state.calculator.rightOperand ?
        setState((draft)=>{
            draft.calculator.display /= 100
            draft.calculator.rightOperand /= 100
        })
        :
        setState((draft)=>{
            draft.calculator.display /= 100
        })

    }

    const setOperator = (operator)=>{
        setState((draft)=>{
            draft.calculator.currentOperator = operator
            if(!draft.calculator.leftOperand)draft.calculator.leftOperand = String(draft.calculator.display)
        })
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
        className="calc-btns"
        id="section-1">
        <button
        className="special-btns"
        onClick={()=>clear()}>{(state.calculator.leftOperand || state.calculator.rightOperand || state.calculator.display) ? "C":"AC"}</button>
        <button
        className="special-btns"
        onClick={()=>posNeg()}
        >+/-</button>
        <button
        className="special-btns"
        onClick={()=>percent()}
        >%</button>
        <button
        className="operator-btns"
        onClick={(e)=>setOperator(e.target.innerText)}
        >/</button>
        </div>
        <div
        className="calc-btns"
        id="section-2">
        <button
        className="main-btns"
        onClick={(e)=>stage(e.target.innerText)}
        >7</button>
        <button
        className="main-btns"
        onClick={(e)=>stage(e.target.innerText)}
        >8</button>
        <button
        className="main-btns"
        onClick={(e)=>stage(e.target.innerText)}
        >9</button>
        <button
        className="operator-btns"
        onClick={(e)=>setOperator(e.target.innerText)}
        >x</button>
        </div>
        <div
        className="calc-btns"
        id="section-3">
        <button
        className="main-btns"
        onClick={(e)=>stage(e.target.innerText)}
        >4</button>
        <button
        className="main-btns"
        onClick={(e)=>stage(e.target.innerText)}
        >5</button>
        <button
        className="main-btns"
        onClick={(e)=>stage(e.target.innerText)}
        >6</button>
        <button
        className="operator-btns"
        onClick={(e)=>setOperator(e.target.innerText)}
        >-</button>
        </div>
        <div
        className="calc-btns"
        id="section-4">
        <button
        className="main-btns"
        onClick={(e)=>stage(e.target.innerText)}
        >1</button>
        <button
        className="main-btns"
        onClick={(e)=>stage(e.target.innerText)}
        >2</button>
        <button
        className="main-btns"
        onClick={(e)=>stage(e.target.innerText)}
        >3</button>
        <button
        className="operator-btns"
        onClick={(e)=>setOperator(e.target.innerText)}
        >+</button>
        </div>
        <div
        className="calc-btns"
        id="section-5">
        <button
        id="zero"
        className="main-btns"
        onClick={(e)=>stage(e.target.innerText)}
        >0</button>
        <button
        className="main-btns"
        onClick={(e)=>stage(e.target.innerText)}
        >.</button>
        <button
        className="operator-btns"
        onClick={()=>evaluate()}
        >=</button>
        </div>
    </div>
    </>
    )
}