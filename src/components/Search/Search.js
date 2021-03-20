import React from 'react';
import { useHistory, useParams } from 'react-router';
import './Search.css';
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function Map()
{
    return <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    ></GoogleMap>
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const Search = () =>
{
    const history = useHistory();
    const { vehicle } = useParams();

    return (
        <div className="container">
            <div className="row d-flex">
                <div className="col-md-5 my-3">
                    <div className="row user-input">
                        <input type="text" name="from" className="form-control mb-3" placeholder="Pick From" />
                        <input type="text" name="to" className="form-control mb-3" placeholder="Pick To" />
                        <input type="date" name="date" id="" className="form-control mb-3" />
                        <button onClick={() => history.push(`/search-result/${ vehicle }`)} className="w-100 btn btn-lg btn-outline-success mb-3">Search</button>
                    </div>
                </div>
                <div className="col-md-7 my-3">
                    <WrappedMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDZcVrcpxV9-Brb-A7hzzh1fAqVg7aKA2A`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                </div>
            </div>
        </div>
    );
};

export default Search;