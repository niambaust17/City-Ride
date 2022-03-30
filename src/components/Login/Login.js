import React, { useRef, useState } from 'react';
import './Login.css';
import useAuth from '../../hooks/useAuth';

const Login = () =>
{
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const { error, googleSignIn, emailSignUp, emailSignIn } = useAuth();

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        if (newUser)
        {
            if (passwordRef.current.value !== confirmPasswordRef.current.value)
            {
                return setPasswordError('Password do not match');
            }

            try
            {
                setLoading(true);
                await emailSignUp(nameRef.current.value, emailRef.current.value, confirmPasswordRef.current.value)
            } catch
            {
                
            }
        }

        if (!newUser)
        {
            try
            {
                setLoading(true);
                await emailSignIn(emailRef.current.value, passwordRef.current.value);
            } catch
            {
                // 
            }
        }

        setLoading(false);
    }

    return (
        <div className="form-signin mt-5">
            {
                error && <div className="alert alert-danger" role="alert">{error}</div>
            }
            {
                passwordError && <div className="alert alert-danger" role="alert">{passwordError}</div>
            }
            <form onSubmit={handleSubmit}>
                {newUser && <input className="form-control" type="text" placeholder="Name" ref={nameRef} required />}
                <input className="form-control" type="email" placeholder="Email" ref={emailRef} required />
                <input className="form-control" type="password" placeholder="Password" ref={passwordRef} required />
                {newUser && <input className="form-control" type="password" placeholder="Confirm Password" ref={confirmPasswordRef} required />}<br />
                <button className="w-100 btn btn-primary" disabled={loading} type="submit">{newUser ? 'Sign Up' : 'Log In'}</button>
            </form>
            <br />
            <div className="w-100 text-center">{newUser ? 'Already have an account?' : 'Create an account?'} <span style={{ cursor: 'pointer' }} onClick={() => setNewUser(!newUser)}>{newUser ? 'Log In' : 'Sign Up'}</span></div>
            <br />
            <button className="w-100 btn btn-primary" onClick={googleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;