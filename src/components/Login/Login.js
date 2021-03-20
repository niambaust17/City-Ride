import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import { createUserWithEmailAndPassword, googleSignIn, initializeSignIn, SignInUserWithEmailAndPassword, updateUserInfo } from './loginManager';
import './Login.css';

const Login = () =>
{
    initializeSignIn();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });
    const handleResponse = (res, redirect) =>
    {
        setLoggedInUser(res)
        if (redirect)
        {
            history.replace(from);
        }
    }

    const handleGoogleSignIn = () =>
    {
        googleSignIn()
            .then(res =>
            {
                handleResponse(res, true)
            })
    }

    const handleSubmit = (event) =>
    {
        if (newUser && user.name && user.email && user.password)
        {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res =>
                {
                    setUser(res)
                    updateUserInfo(user.name);
                })
        }
        if (!newUser && user.email && user.password)
        {
            SignInUserWithEmailAndPassword(user.email, user.password)
                .then(res =>
                {
                    setUser(res)
                    handleResponse(res, true)
                })
        }
        event.preventDefault();
    }

    const handleBlur = (event) =>
    {
        let isFormValid;
        if (event.target.name === 'name')
        {
            isFormValid = event.target.value.length > 4;
        }
        if (event.target.name === 'email')
        {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password')
        {
            const isPasswordValid = event.target.value.length > 6;
            const isPasswordHasNumber = /\d{1}/.test(event.target.value);
            isFormValid = isPasswordValid && isPasswordHasNumber;
        }
        if (event.target.name === 'confirm-password')
        {
        }
        if (isFormValid)
        {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    return (
        <div className="form-signin mt-5">
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal text-center">{newUser ? 'Create Account' : 'Signin'}</h1>
                {
                    newUser && <input type="text" onBlur={handleBlur} name="name" className="form-control" placeholder="User Name" required />
                }
                <input type="email" onBlur={handleBlur} name="email" className="form-control" placeholder="Email" required autoFocus />
                <input type="password" onBlur={handleBlur} name="password" className="form-control" placeholder="Password" required />
                {
                    newUser && <input type="password" onBlur={handleBlur} name="confirm-password" className="form-control" placeholder="Confirm Password" required />
                }
                <button className="w-100 btn btn-lg btn-outline-success mb-2" type="submit">{newUser ? 'Create an account' : 'Login'}</button>
                <p className="text-center">{newUser ? 'Already have an account' : 'Don’t have an account'} ?
                 <span onClick={() => setNewUser(!newUser)} className="text-warning" style={{ cursor: 'pointer' }}>
                        {newUser ? ' Login' : ' Create an account'}
                    </span></p>
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green', textAlign: 'center' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>
            }
            <button onClick={handleGoogleSignIn} className="w-100 btn btn-lg btn-outline-success mb-2" type="submit">Connect with Google</button>
        </div>
    );
};

export default Login;