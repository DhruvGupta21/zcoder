import React, { useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import './index.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function Index() {
    const navigate = useNavigate();
    const [register, setRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignInGoogle = () => {
        signInWithPopup(auth, provider).then((res) => {
            console.log(res);
            navigate("/");
        }).catch((error) => {
            console.log(error.code);
            setError(error.message);
            setLoading(false);
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        if (email === "" || password === "" || username === "") {
            setError('Reduired field/s are missing');
            setLoading(false);
        }
        else {
            createUserWithEmailAndPassword(auth, email, password).then((res) => {
                console.log(res);
                setLoading(false);
                navigate("/");
            }).catch((error) => {
                console.log(error.code);
                setError(error.message);
                setLoading(false);
            })
        }
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        if (email === "" || password === "") {
            setError('Reduired field/s are missing');
            setLoading(false);
        }
        else {
            signInWithEmailAndPassword(auth, email, password).then((res) => {
                console.log(res);
                setLoading(false);
                navigate("/");
            }).catch((error) => {
                console.log(error.code);
                setError(error.message);
                setLoading(false);
            })
        }
    }

    return (
        <div className='auth'>
            <div className='auth-container'>
                <p>Add another way to log in using any of the following services</p>
                <div className='sign-options'>
                    <div className='single-option' onClick={handleSignInGoogle}>
                        <GoogleIcon />
                        <p>Login with Google</p>
                    </div>
                    <div className='auth-login'>
                        <div className='auth-login-container'>
                            {
                                register ? (<>
                                    <div className='input-field'>
                                        <p>Username</p>
                                        <input value={username} onChange={(e) => setUsername(e.target.value)} type='text' />
                                    </div>
                                    <div className='input-field'>
                                        <p>Email</p>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' />
                                    </div>
                                    <div className='input-field'>
                                        <p>Password</p>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
                                    </div>
                                    <button
                                        onClick={handleRegister}
                                        disabled={loading}
                                        style={{
                                            marginTop: "10px"
                                        }}
                                    >{loading ? 'Saving Info...' : 'Register'}</button>
                                </>) : (<>
                                    <div className='input-field'>
                                        <p>Email</p>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' />
                                    </div>
                                    <div className='input-field'>
                                        <p>Password</p>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
                                    </div>
                                    <button
                                        onClick={handleSignIn}
                                        disabled={loading}
                                        style={{
                                            marginTop: "10px"
                                        }}>{loading ? 'Signing In...' : 'Login'}</button>
                                </>)
                            }
                            <p onClick={() => setRegister(!register)} style={{
                                marginTop: "10px",
                                textAlign: "center",
                                color: '#0095ff',
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            }}
                            >{register ? "Login?" : "Register?"}</p>
                        </div>
                    </div>
                </div>
                {
                    error !== "" && (<p style={
                        {
                            color: "red",
                            fontSize: "15px",
                        }
                    }>{error}</p>)
                }
            </div>
        </div>
    )
}

export default Index