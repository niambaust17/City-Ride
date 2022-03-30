import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Search from './components/Search/Search';
import
{
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route
} from "react-router-dom";
import { createContext, useState } from 'react';
import NotFound from './components/NotFound/NotFound';
import PrivateOutlet from './components/PrivateOutlet/PrivateOutlet';
import AuthProvider from './context/AuthProvider';

export const UserContext = createContext();

function App()
{
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    // <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <AuthProvider>
        <Header />
        <Routes>
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<PrivateOutlet />}>
            <Route path="search/:vehicle" element={<Search />} />
            <Route path="home" element={<Search />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </AuthProvider>
    // </UserContext.Provider>
  );
}

export default App;
