import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';

const Header = () =>
{
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <nav className="navbar sticky-top navbar-expand-lg" style={{ backgroundColor: '#94E1F5' }}>
            <div className="container">
                <Link className="navbar-brand nav-item" to="/">City Ride</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-3">
                            <Link className="nav-link active nav-item" aria-current="page" to="/">Home</Link>
                        </li>
                        {
                            loggedInUser.isSignedIn ?
                                <li className="nav-item mx-3">
                                    <Link className="nav-link nav-item" to="/home">Destination</Link>
                                </li> :
                                <li className="nav-item mx-3">
                                    <Link className="nav-link nav-item" to="/login">Destination</Link>
                                </li>
                        }
                        <li className="nav-item mx-3">
                            <Link className="nav-link nav-item" to="/">Blog</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link className="nav-link nav-item" to="/">Contact</Link>
                        </li>
                        {
                            loggedInUser.isSignedIn &&
                            <>
                                <li className="nav-item mx-3">
                                    <Link className="nav-link nav-item" to="/">{loggedInUser.displayName}</Link>
                                </li>
                            </>
                        }
                        <li className="nav-item mx-3">
                            {loggedInUser.isSignedIn ? <Link className="nav-link nav-item btn btn-outline-warning" to="/" onClick={() => setLoggedInUser({})}>Logout</Link> : <Link className="nav-link nav-item btn btn-outline-success" to="/login">Login</Link>}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;