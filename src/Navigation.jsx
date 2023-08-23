import { Link, Route, Routes } from "react-router-dom";
import ToDos from "./pages/ToDos";
import Notes from "./pages/Notes";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import TimeManagement from "./pages/TimeManagement";
import Counter from "./pages/Counter";
import Calculator from "./pages/Calculator";

export default function Navigation(){
    return(
    <>
    <nav>
        <li><Link to={'/'}>HOME</Link></li>
        <li><Link to={'/todo'}>TO DO LIST</Link></li>
        <li><Link to={'/notes'}>NOTES</Link></li>
        <li><Link to={'/timeManagement'}>TIME MANAGEMENT</Link></li>
        <li><Link to={'/counter'}>COUNTER</Link></li>
        <li><Link to={'/calculator'}>CALCULATOR</Link></li>
    </nav>
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