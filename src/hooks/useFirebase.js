import { useEffect, useState } from "react"
import initializeAuthentication from "../Firebase/firebase.init"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, } from "firebase/auth"
import { useLocation, useNavigate } from "react-router-dom";

initializeAuthentication();

const useFirebase = () =>
{
    const [user, setUser] = useState({});
    let [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();

    const googleSignIn = () =>
    {
        signInWithPopup(auth, googleProvider)
            .then((result) =>
            {
                console.log(result.user);
                setUser(result.user);
                if (location.state?.from)
                {
                    navigate(location.state.from);
                }
            })
            .catch((error) =>
            {
                const errorMessage = error.message;
                setError(errorMessage);
            });
    }

    const emailSignUp = (displayName, email, password) =>
    {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) =>
            {
                setUser(userCredential.user);
                updateProfile(auth.currentUser, {
                    displayName,
                }).then(() =>
                {
                    navigate(location.state?.from || '/home');
                })
            })
            .catch((error) =>
            {
                const errorMessage = error.message;
                setError(errorMessage);
                navigate('/login');
            });
    }

    const emailSignIn = (email, password) =>
    {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) =>
            {
                setUser(userCredential.user);
                navigate(location.state?.from || '/home');
            })
            .catch((error) =>
            {
                const errorMessage = error.message;
                setError(errorMessage);
                navigate('/login');
            });
    }

    const logOut = () =>
    {
        signOut(auth).then(() =>
        {
            setUser({})
        })
    }

    useEffect(() =>
    {
        onAuthStateChanged(auth, (user) =>
        {
            if (user)
            {
                setUser(user);
            }
        });
    }, [])

    return {
        user,
        error,
        googleSignIn,
        emailSignUp,
        emailSignIn,
        logOut
    }
}

export default useFirebase
