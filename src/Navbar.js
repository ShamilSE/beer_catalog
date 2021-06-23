import React from "react";

export function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a onClick={() => props.onRegisterButtonClick()}
                               className="nav-link active"
                               aria-current="page"
                            >Register</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input
                            onChange={(event) => props.onChange(event)}
                            value={props.value}
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                    </form>
                </div>
            </div>
        </nav>
    )
}