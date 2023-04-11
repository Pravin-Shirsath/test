import React, { useState, useEffect } from 'react'
import '../Assets/css/main.css'
import AutomataIcon from '../Assets/img/Automata.png'
import { str } from '../Constants/stringConst';
import { Form, FormGroup, Input  } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { LOGIN_USER_SUCCESS } from 'Store/Actions/types';
//Auth File
import Auth from 'Auth/Auth';
import { login } from '../Api/index';
import { Helmet } from 'react-helmet'



const auth = new Auth();


const LogIn = (props) => {

    const history = useHistory();
    const [check, setChecked] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading);
    const [show, setShow] = useState(false);
    const [nameError, setNameError] = useState('');
    const [passError, setPassError] = useState('');
    const [passToggle, setpassToggle] = useState(false);


    const regexname = /^[a-zA-Z0-9/@/./+/-/_]*$/
    const regexpassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    let type = JSON.parse(localStorage.getItem('user_type'));


    useEffect(() => {

        const checkCredentials = JSON.parse(localStorage.getItem('rememberMe'));
        if (checkCredentials) {
            if (checkCredentials?.username !== "" && checkCredentials?.password !== "") {
                setName(checkCredentials.username);
                setPassword(checkCredentials.password)
            }
        }

        const isLoggedInBool = localStorage.getItem("isLoggedIn")
        if (isLoggedInBool === "true") {
            if (type === "admin") {
                history.push("/app/dashboard/Admin/Dashboard")
            }
            if (type === "customer" || type === "company_admin") {
                history.push('/app/dashboard/saas');
            }
        } else {
            history.push("/login")
        }
    }, [])


    const onUserSignUp = () => {
        props.history.push('/signup');
    }


    const goToForgotPassword = () => {
        props.history.push('/forgotpwd');
    }



    const onUserLogin = () => {
        setNameError('');
        setPassError('');
        setShow(true);
        if (name.trim() == '' && password.trim() == '') {
            setNameError(str.MandotoryField);
            setPassError(str.MandotoryField);
            setShow(true);

        } else {

            if (regexname.test(name.trim()) != true) {
                setNameError('User name must contain only  alpha-numeric character and no spacings!');
            } else
                if (regexpassword.test(password.trim()) != true) {
                    setPassError(str.InvalidPassword)
                } else {

                    if (check == true) {
                        localStorage.setItem('rememberMe', JSON.stringify({ "username": name, "password": password }))
                    }

                    login(name, password).then((res) => {
                        if (res?.data?.token) {
                            localStorage.setItem('token', JSON.stringify(res.data.token));
                            localStorage.setItem("isLoggedIn", JSON.stringify(true))
                            localStorage.setItem("user_id", "user-id");
                            localStorage.setItem("user_type", JSON.stringify(res?.data?.user?.user_type));
                            dispatch({ type: LOGIN_USER_SUCCESS, payload: localStorage.getItem('user_id') });
                            history.push("/selectmodules")


                            // if (res?.data?.user?.user_type === "admin") {
                            //     history.push("app/dashboard/Admin/Dashboard")
                            // }

                            // if (res?.data?.user?.user_type === "customer" || res?.data?.user?.user_type === "company_admin") {
                            //     history.push('/app/dashboard/saas');
                            // }

                            NotificationManager.success('User Login Successfully!');
                            setShow(false);
                            setNameError('');
                            setPassError('');
                        } else if (res?.data?.error) {
                            NotificationManager.error(res?.data?.error);

                        } else {
                            setShow(false);

                        }
                    }).catch(err => {
                        console.log("err:", err)
                        if (err?.response?.data?.non_field_errors?.[0]) {

                            NotificationManager.error(err?.response?.data?.non_field_errors?.[0]);
                        } else {
                            NotificationManager.error("login failed");

                        }
                    });
                }
        }
    }



    return (
        <div className='loginContainer'>
             <Helmet>
            <title>Automaton | Sign-In</title>
            <meta name="description" content="Automaton Widgets" />
         </Helmet>
        <div className='row justify-content-between row-gapper'>
                <div className='col loginInfoWrapper'>
                    <img src={AutomataIcon} alt='automataLogo' width="250" height="112" />
                    <p className='loginMeta'>Welcome you to the era of Digital Transformation......</p>
                    <p className='metaDetails'>Project Planning | Upload | Visualize | Digitise | AI | Analysis </p>
                </div>
                <div className='col'>
                    <Form className='loginForm'>
                        <div className='line'></div>
                        <h1 className='loginForm-title'>Welcome to HelloGeo!</h1>
                        <FormGroup className="has-wrapper input-margin">
                            <Input
                                type="text"
                                value={name}
                                name="user-name"
                                id="user-name"
                                className="has-input input-lg"
                                onChange={(e) => setName(e.target.value)}
                                placeholder="E-mail"
                            />
                            {
                                show && <p className='errorText'>{nameError}</p>
                            }
                        </FormGroup>

                        <FormGroup className="has-wrapper">
                            <Input
                                value={password}
                                type={passToggle ? "text" : "password"}
                                name="user-pwd"
                                id="pwd"
                                className="has-input input-lg"
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Password"
                            />
                            {
                                show && <p className='errorText'>{passError}</p>
                            }
                        </FormGroup>

                        <p onClick={goToForgotPassword} className='forget-psw'>{str.ForgotPassword}</p>


                        <div className='checkBoxRow'>

                            <Input
                                type="checkbox"
                                checked={check}
                                onChange={() => setChecked(!check)}
                            />

                            <p >Remember me</p>
                        </div>

                        <div className='mx-auto text-center'>
                            <button type='button' className="LogInBtn" onClick={onUserLogin}>
                                {str.LoginText}
                            </button>
                        </div>
                        <p className='signUpTitle' onClick={onUserSignUp}>I am new here. I need an account.</p>
                    </Form>
                </div>
        </div>
          
        </div>
    )
}

export default LogIn