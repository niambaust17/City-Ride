import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import img from '../../images/Map.png';
import './Search.css';
import fakeData from '../../fakeData/fakeData.json';

const Search = () =>
{
    return (
        <div className="container">
            <div className="row d-flex">
                <div className="col-md-5 my-3">
                    <div className="row user-input">
                        <input type="text" name="" className="form-control mb-3" placeholder="Pick From" />
                        <input type="text" name="" className="form-control mb-3" placeholder="Pick To" />
                        <input type="datetime-local" name="" id="" className="form-control mb-3" />
                        <button className="w-100 btn btn-lg btn-outline-success mb-3">Search</button>
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