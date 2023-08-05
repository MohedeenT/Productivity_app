import { Link, Route, Routes } from "react-router-dom";
import ToDos from "./pages/ToDos";
import Notes from "./pages/Notes";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function Navigation(){
    return(
    <>
    <nav>
        <ul>
            <li><Link to={'/'}>HOME</Link></li>
            <li><Link to={'/todo'}>To do list</Link></li>
            <li><Link to={'/notes'}>Notes</Link></li>
        </ul>
    </nav>
<Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/todo" element={<ToDos/>}/>
    <Route path="/notes" element={<Notes/>}/>
    <Route path="/*" element={<NotFound/>}/>
</Routes>
</>)
}