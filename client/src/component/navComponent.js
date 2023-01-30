import React from "react";
import { useNavigate , Link } from "react-router-dom";

function NavComponent() {

    return (
        <>
            <Link to="/sdarot">Sdarot</Link>
            <br />
            <Link to="/sratim">Sratim</Link>
            <br />
            <Link to="/profile">Your profile</Link>
            <br />
            <Link to="/">LogOut</Link>
        </>
    )
}
export default NavComponent;