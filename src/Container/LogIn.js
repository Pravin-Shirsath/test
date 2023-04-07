import React, { useState } from 'react'
import '../Assets/css/main.css'
import AutomataIcon from '../Assets/img/Automata.png'
import { str } from '../Constants/stringConst';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import Checkbox from '@material-ui/core/Checkbox';



const LogIn = () => {
    const [check, setChecked] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [nameError, setNameError] = useState('');
    const [passError, setPassError] = useState('');
    const [passToggle, setpassToggle] = useState(false);





    return (
        <div className='loginContainer'>
            <div className='row'>
                <div className='col loginInfoWrapper'>
                    <img src={AutomataIcon} alt='automataLogo' width="250" height="112" />
                    <p className='loginMeta'>Welcome you to the era of Digital Transformation......</p>
                    <p className='metaDetails'>Project Planning | Upload | Visualize | Digitise | AI | Analysis </p>
                </div>
                <div className='col'>
                    <Form className='loginForm'>
                        <h1 className='loginForm-title'>Welcome to HelloGeo!</h1>
                        <FormGroup className="has-wrapper">
                            <Input
                                type="text"
                                value={name}
                                name="user-name"
                                id="user-name"
                                className="has-input input-lg"
                                onChange={(e) => setName(e.target.value)}
                                placeholder="E-mail"
                            />

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
                        </FormGroup>
                        <a>{str.ForgotPassword}</a>


                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div >
                                <Checkbox
                                    checked={check}
                                    onChange={() => setChecked(!check)}

                                    color="default"
                                />
                            </div>
                            <div> Remember me</div>
                        </div>
                        <FormGroup className="mb-15">
                            <Button
                                color="primary"
                                className="btn-block text-white w-50 theme-background"
                                variant="contained"
                                size="large"
                            >
                                {str.LoginText}
                            </Button>

                        </FormGroup>

                    </Form>
                </div>
            </div>
        </div>
    )
}

export default LogIn