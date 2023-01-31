import React from "react";
import { useNavigate , Link } from "react-router-dom";

function NavComponent() {

    return (
        <>
            <Link to="/movies">Movies</Link>
            <br />
            <Link to="/TVshows">TV Shows</Link>
            <br />
            <Link to="/profile">Your profile</Link>
            <br />
            <Link to="/">LogOut</Link>
        </>
    )
}
export default NavComponent;