import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <header className="main-header flex align-center space-between">

            <Link to={"/"}>    <div className="fs30 logo">Weathter</div>    </Link>
            <nav className="flex align-center space-between ">

                <ul className="header-list flex align-center clean-list">
                    <Link to={"/favorite"}>  <li className="header-link">Favorite</li></Link>
                    <Link to={"/"}>    <li className="header-link">Home</li></Link>



                </ul>

            </nav>


        </header >
    )
}
