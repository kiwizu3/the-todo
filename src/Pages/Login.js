import React, { useState, useCallback } from "react";



const Login = ({setLoggedIn}) => {

    const [loginInfo, setLoginInfo] = useState([]);
    const [incorrect, setIncorrect] = useState(false);

    const initLogin = { username: 'admin', password: 'admin' };

    const onLoginInput = useCallback((e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
        setIncorrect(false)
    }, [loginInfo, setLoginInfo, setIncorrect])

    const onHandleLogin = useCallback((e) => {
        e.preventDefault();
        if (JSON.stringify(initLogin) === JSON.stringify(loginInfo)) {
            localStorage.setItem('is-logged', true);
            setLoggedIn(true)
            setIncorrect(false);
        }
        else {
            setIncorrect(true)
        }
    }, [loginInfo, setIncorrect])

    const onCloseToast = useCallback(() => {
        setIncorrect(false)
    }, [setIncorrect])

    return (
        <>
            <div className="container h-100">
                <div className="row h-100 justify-content-center">
                    <div className="col-lg-8 col-md-10 col-sm-12 my-auto">
                        <h1>Login</h1>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" name="username" onChange={onLoginInput} />
                                <div id="usernameHelp" className="form-text">This will be the username of your choice you made at sign up</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={onLoginInput} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={onHandleLogin}>Login</button>
                        </form>

                    </div>
                </div>
            </div>
            <div className="position-relative">
                <div className={`toast toast-placement align-items-center ${incorrect ? "show" : ""}`} role="alert" aria-live="assertive" aria-atomic="true" onClick={onCloseToast}>
                    <div className="d-flex">
                        <div className="toast-body">
                            Incorrent Login Info.
                        </div>
                        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;