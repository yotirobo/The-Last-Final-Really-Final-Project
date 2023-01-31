import React from "react";
import { useNavigate , Link } from "react-router-dom";
import "../css/nav.css"

function NavComponent() {

    return (
        < div className="link">
            <img src="../photos/logo2"/>
            <Link to="/sdarot">Sdarot</Link>
            <Link to="/sratim">Sratim</Link>
            <Link to="/profile">Your profile</Link>
            <Link to="/">LogOut</Link>
        </div>
    )
}
export default NavComponent;