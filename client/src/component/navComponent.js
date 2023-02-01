import React from "react";
import { useNavigate , Link } from "react-router-dom";
import "../css/nav.css"

function NavComponent() {
    const currentUser = JSON.parse(localStorage.getItem("userOnline"));

    return (
< div className="link">
            <Link to="/movies">Movies</Link>
            <br />
            <Link to="/TVshows">TV Shows</Link>
            <br />
            <Link to="/profile">Your profile</Link>
            <br/>
            {currentUser.is_admin === 1 ? <><Link to="/admin">Admin</Link> <br/> </>: null}      
            <Link to="/">LogOut</Link>
        </div>
    )
}
export default NavComponent;