import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import img from '../../images/Map.png';
import './Search.css';

const Search = () =>
{
    const [location, setLocation] = useState({
        from: '',
        to: '',
        date: '',
    })

    const history = useHistory();
    const { vehicle } = useParams();

    const handleBlur = (event) =>
    {
        console.log(event.target.name, event.target.value);
        const newLocationInfo = { ...location };
        newLocationInfo[event.target.name] = event.target.value;
        setLocation(newLocationInfo);
    }
    return (
        <div className="container">
            <div className="row d-flex">
                <div className="col-md-5 my-3">
                    <div className="row user-input">
                        <input type="text" onBlur={handleBlur} name="from" className="form-control mb-3" placeholder="Pick From" />
                        <input type="text" onBlur={handleBlur} name="to" className="form-control mb-3" placeholder="Pick To" />
                        <input type="date" onBlur={handleBlur} name="date" id="" className="form-control mb-3" />
                        <button onClick={() => history.push(`/search-result/${ vehicle }`)} className="w-100 btn btn-lg btn-outline-success mb-3">Search</button>
                    </div>
                </div>
                <div className="col-md-7 my-3">
                    <img src={img} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Search;