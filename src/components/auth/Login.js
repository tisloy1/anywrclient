import React, {useContext} from 'react';
import "../../assets/css/login.css"
import {UserContext} from "../../usercontext/UserContext";
import UseInput from "../../customhook/UseInput";
import {Navigate} from 'react-router-dom';
import {login} from "../../functions";
import Form from 'react-bootstrap/Form';


const Login = () => {
    const [email, bindEmail, resetEmail] = UseInput("");
    const [password, bindPassword, resetPassword] = UseInput("");
    const {user, setUser} = useContext(UserContext);
    const [validated, setValidated] = React.useState(false);
    const [state, setState] = React.useState({
        emailError: '',
        passswordError: '',
    })

    const {emailError, passwordError} = state;

    const submitHandler = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        setValidated(true)

        try {
            //setValidated(true);
            const response = await login({email, password});

            if (response.errors) {
                setState({
                    ...state,
                    emailError: response.errors.email,
                    passwordError: response.errors.password,
                })
            }
            if(response.user) {
                setUser(response.user.email);
                if (typeof window !== 'undefined') {
                    sessionStorage.setItem('user', response.user.email);
                    sessionStorage.setItem('user_id', response.user._id);
                }
            }
            resetPassword();
            resetEmail();
        } catch (error) {
            console.log(error)
        }

    }


    if (user) {
        return <Navigate to="/"/>
    }
    return (
        <div className="container login-page">
            <h1>Login</h1>
            <div className="row">
                <Form noValidate validated={validated} onSubmit={submitHandler}>
                    <div className="row mt-3">
                        <div className="col-lg-12 col-md-12">
                            <Form.Control required {...bindEmail} id="email" type="email" className="validate form-control"
                                   placeholder="Email *"/>
                            <Form.Control.Feedback type="invalid">
                                {emailError ? emailError : 'Please provide your password'}
                            </Form.Control.Feedback>
                        </div>
                        <div className="col-lg-12 col-md-12 mt-2">
                            <Form.Control required {...bindPassword} id="name" type="password" className="validate form-control"
                                   placeholder="*****"/>
                            <Form.Control.Feedback type="invalid">
                                {passwordError ? passwordError : 'Please provide your password'}
                            </Form.Control.Feedback>
                        </div>
                        <div className="mt-5">
                            <button className="btn btn-success" type="submit">Submit</button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;