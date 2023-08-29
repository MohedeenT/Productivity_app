import { Link, Route, Routes, useNavigate } from "react-router-dom";
import ToDos from "./pages/ToDos";
import Notes from "./pages/Notes";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import TimeManagement from "./pages/TimeManagement";
import Counter from "./pages/Counter";
import Calculator from "./pages/Calculator";
import { useEffect, useState } from "react";



export default function Navigation(){
    const [page, setPage] = useState("")

    const navigate = useNavigate()

    useEffect(()=>{
            navigate(`/${page}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page])

    return(
    <>
    <nav className="desktop-only">
        <li><Link to={'/'}>HOME</Link></li>
        <li><Link to={'/todo'}>TO DO LIST</Link></li>
        <li><Link to={'/notes'}>NOTES</Link></li>
        <li><Link to={'/timeManagement'}>TIME MANAGEMENT</Link></li>
        <li><Link to={'/counter'}>COUNTER</Link></li>
        <li><Link to={'/calculator'}>CALCULATOR</Link></li>
    </nav>
    <div id="burger-menu-container">
    <select name="hamburger-menu" id="hamburger-menu" onChange={(e)=>setPage(e.target.value)} >
        <option value="">HOME</option>
        <option value="todo">TO DO LIST</option>
        <option value="notes">NOTES</option>
        <option value="timeManagement">TIME MANAGEMENT</option>
        <option value="counter">COUNTER</option>
        <option value="calculator">CALCULATOR</option>
    </select>
    </div>
<Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/todo" element={<ToDos/>}/>
    <Route path="/notes" element={<Notes/>}/>
    <Route path="/timeManagement" element={<TimeManagement/>}/>
    <Route path="/counter" element={<Counter/>}/>
    <Route path="/calculator" element={<Calculator/>}/>
    <Route path="/*" element={<NotFound/>}/>
</Routes>
</>)
}