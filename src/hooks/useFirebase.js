import { useEffect, useState } from "react"
import initializeAuthentication from "../Firebase/firebase.init"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification, sendPasswordResetEmail, } from "firebase/auth"
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

initializeAuthentication();

const useFirebase = () =>
{
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();

    const googleSignIn = () =>
    {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) =>
            {
                console.log(result.user);
                setUser(result.user);
                setError('');
                if (location.state?.from)
                {
                    navigate(location.state.from || '/home');
                }
            })
            .catch((error) =>
            {
                const errorMessage = error.message;
                setError(errorMessage);
            })
            .finally(() =>
                setIsLoading(false)
            );
    }

    const emailSignUp = (displayName, email, password) =>
    {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) =>
            {
                setUser(userCredential.user);
                setError('');
                verifyEmail();
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
            })
            .finally(() =>
                setIsLoading(false)
            );
    }

    const emailSignIn = (email, password) =>
    {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) =>
            {
                setUser(userCredential.user);
                console.log(userCredential.user);
                setError('');
                navigate(location.state?.from || '/home');
            })
            .catch((error) =>
            {
                const errorMessage = error.message;
                setError(errorMessage);
                navigate('/login');
            })
            .finally(() =>
                setIsLoading(false)
            );
    }

    const verifyEmail = () =>
    {
        sendEmailVerification(auth.currentUser)
            .then((result) =>
            {
            });
    }

    const resetPassword = (email) =>
    {
        sendPasswordResetEmail(auth, email)
            .then((result) =>
            {
                Swal.fire(
                    'Good job!',
                    'Email sent for password reset',
                    'success'
                )
            })
            .catch((error) =>
            {
                const errorMessage = error.message;
                setError(errorMessage);
            });
    }

    const logOut = () =>
    {
        setIsLoading(true);
        signOut(auth).then(() =>
        {
        }).catch(error =>
        {
        }).finally(() =>
            setIsLoading(false)
        );
    }

    useEffect(() =>
    {
        const unsubscribed = onAuthStateChanged(auth, (user) =>
        {
            if (user)
            {
                setUser(user);
            } else
            {
                setUser({});
            }
            setIsLoading(false);
        });

        return () => unsubscribed;
    }, [auth])

    return {
        user,
        error,
        isLoading,
        googleSignIn,
        emailSignUp,
        emailSignIn,
        resetPassword,
        logOut
    }
}

export default useFirebase
