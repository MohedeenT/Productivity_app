import { Link, Route, Routes } from "react-router-dom";
import ToDos from "./pages/ToDos";
import Notes from "./pages/Notes";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import TimeManagement from "./pages/TimeManagement";

export default function Navigation(){
    return(
    <>
    <nav>
        <li><Link to={'/'}>HOME</Link></li>
        <li><Link to={'/todo'}>TO DO LIST</Link></li>
        <li><Link to={'/notes'}>NOTES</Link></li>
        <li><Link to={'/timeManagement'}>TIME MANAGEMENT</Link></li>
    </nav>
<Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/todo" element={<ToDos/>}/>
    <Route path="/notes" element={<Notes/>}/>
    <Route path="/timeManagement" element={<TimeManagement/>}/>
    <Route path="/*" element={<NotFound/>}/>
</Routes>
</>)
}