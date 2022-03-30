import React, { useRef, useState } from 'react';
import './Login.css';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () =>
{
    let nameRef = useRef();
    let emailRef = useRef();
    let passwordRef = useRef();
    let confirmPasswordRef = useRef();

    const [passwordError, setPasswordError] = useState('');
    const [newUser, setNewUser] = useState(false);
    const { user, error, googleSignIn, emailSignUp, emailSignIn, resetPassword } = useAuth();

    const successAlert = () =>
    {
        Swal.fire(
            `Log In Successful`,
            `Welcome ${ user.displayName || nameRef.current.value }`,
            'success'
        )
    }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        if (newUser)
        {
            if (passwordRef.current.value !== confirmPasswordRef.current.value)
            {
                return setPasswordError('Password do not match');
            }

            await emailSignUp(nameRef.current.value, emailRef.current.value, confirmPasswordRef.current.value);
        }

        if (!newUser)
        {
            await emailSignIn(emailRef.current.value, passwordRef.current.value);
        }
    }

    const handleResetPassword = () =>
    {
        resetPassword(emailRef.current.value);
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
                <button className="w-100 btn btn-primary" type="submit">{newUser ? 'Sign Up' : 'Log In'}</button>
            </form>
            {
                user?.email && successAlert()
            }
            <br />
            <div className="w-100 text-center">{newUser ? 'Already have an account?' : 'Create an account?'} <span style={{ cursor: 'pointer' }} onClick={() => setNewUser(!newUser)}>{newUser ? 'Log In' : 'Sign Up'}</span></div>
            <br />
            <div className="w-100 text-center" style={{ cursor: 'pointer' }} onClick={handleResetPassword}>Forgot Password</div>
            <br />
            <button className="w-100 btn btn-primary" onClick={googleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;