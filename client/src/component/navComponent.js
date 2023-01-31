import React from "react";
import { useNavigate , Link } from "react-router-dom";
import "../css/nav.css"

function NavComponent() {

    return (
< div className="link">
            <Link to="/movies">Movies</Link>
            <br />
            <Link to="/TVshows">TV Shows</Link>
            <br />
            <Link to="/profile">Your profile</Link>
            <Link to="/">LogOut</Link>
        </div>
    )
}
export default NavComponent;