import React, {useContext} from 'react';
import "../../assets/css/login.css"
import {UserContext} from "../../usercontext/UserContext";
import UseInput from "../../customhook/UseInput";
import {Navigate} from 'react-router-dom';
import {signup} from "../../functions";
import Form from 'react-bootstrap/Form';

const Signup = () => {
    const [email, bindEmail, resetEmail] = UseInput("");
    const [password, bindPassword, resetPassword] = UseInput("");
    const [username, bindUsername, resetUsername] = UseInput("");
    const {user, setUser} = useContext(UserContext);
    const [validated, setValidated] = React.useState(false);
    const [state, setState] = React.useState({
        emailError: '',
        passswordError: '',
        usernameError: ''
    })

    const {emailError, usernameError, passwordError} = state;
    const submitHandler = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        setValidated(true);

        try {

            const response = await signup({email, username, password});

            if(response.errors){
                setState({...state,
                    emailError: response.errors.email,
                    passwordError: response.errors.password,
                    usernameError: response.errors.username,
                })
            }
            if(response.user){
                setUser(response.user.email)
                if (typeof window !== 'undefined') {
                    sessionStorage.setItem('user', response.user.email);
                    sessionStorage.setItem('user_id', response.user._id);
                }
            }

            resetPassword();
            resetEmail();
            resetUsername();

        } catch (error) {

        }

    }

    if (user) {
        return <Navigate to="/"/>
    }
    return (
        <div className="container login-page">
            <h1>Signup</h1>
            <div className="row">
                <Form noValidate validated={validated}  onSubmit={submitHandler}>
                    <div className="row mt-3">
                        <div className="col-lg-12 col-md-12">
                            <Form.Control required {...bindUsername} id="username" type="text" className="validate form-control"
                                          placeholder="Username *"/>
                            <Form.Control.Feedback type="invalid">
                                {usernameError ? usernameError : 'Please provide your username'}
                            </Form.Control.Feedback>
                        </div>
                        <div className="col-lg-12 col-md-12 mt-2">
                            <Form.Control required {...bindEmail} id="email" type="email" className="validate form-control"
                                   placeholder="Email *"/>
                            <Form.Control.Feedback type="invalid">
                                {emailError ? emailError : 'Please provide a valid email'}
                            </Form.Control.Feedback>
                        </div>
                        <div className="col-lg-12 col-md-12 mt-2">
                            <Form.Control required {...bindPassword} id="name" type="password" className="validate form-control"
                                   placeholder="*******"/>
                            <Form.Control.Feedback type="invalid">
                                {passwordError ? passwordError : 'Please provide your password'}
                            </Form.Control.Feedback>
                        </div>
                        <div className="mt-5">
                            <button className="btn btn-success" type="submit" >Submit</button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Signup;