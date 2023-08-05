import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function NotFound() {

    const navigate = useNavigate()

    useEffect(()=>{
        setTimeout(()=>{
            navigate("/")
        },1500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
    <h1>page not found, redirecting you to home screen</h1>
    )
}