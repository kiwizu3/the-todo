import React from 'react';

const NavBar = ({ setLoggedIn }) => {

    const logout = () => {
        localStorage.removeItem('is-logged');
        localStorage.clear();
        setLoggedIn(false);
    }
    return (
        <>
            <div className="d-flex justify-content-between p-4 shadow m-3">
                <div>
                    <p className="fw-bold mb-0"><i>To do</i></p>
                </div>
                <div onClick={logout}>
                    <p className="fw-bold mb-0">
                        Logout
                    </p>
                </div>
            </div>
        </>
    )
}

export default NavBar;