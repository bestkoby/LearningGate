import "../styles/genstyles.css";
import { elementRoles } from "aria-query";

const Navbar = ()=>{

    return(
        <ul className = "main-nav">
            <li><a onClick={filter("all")}>All Courses</a></li>
            <li><a onClick={filter("history")}>History</a></li>
            <li><a onClick={filter("algorithm")}>Algorithm</a></li>
            <li><a onClick={filter("math")}>Math</a></li>
            <li><a onClick={filter("economics")}>Economics</a></li>
            <li><a onClick={filter("ai")}>AI</a></li>
        </ul>
    );
}

export default Navbar;