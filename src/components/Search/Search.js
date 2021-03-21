import React from 'react';
import { useParams } from 'react-router';
import './Search.css';
import fakeVehicle from '../../fakeData/fakeVehicle.json';
import SpecificVehicle from '../SpecificVehicle/SpecificVehicle';
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import { useState } from 'react';

function Map()
{
    return <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 23.777176, lng: 90.399452 }}
    ></GoogleMap>
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const Search = () =>
{
    const { vehicle } = useParams();
    const [click, setClick] = useState(false);
    const [location, setLocation] = useState({
        from: '',
        to: '',
        date: ''
    })
    const { from, to, date } = location;
    const category = fakeVehicle.filter(cat => cat.vehicleType === vehicle);

    const handleBlur = (event) =>
    {
        const newLocation = { ...location };
        newLocation[event.target.name] = event.target.value;
        setLocation(newLocation);
    }

    return (
        <div className="container">
            <div className="row d-flex">
                {
                    click ?
                        <div className="col-md-5 my-3" style={{ border: '1px solid gray', padding: '25px', borderRadius: '10px', backgroundColor: 'gray' }}>
                            <div>
                                <div className="col-md-12" style={{ marginBottom: '10px', backgroundColor: 'orange', borderRadius: '10px', padding: '15px' }}>
                                    <h5>From: {from}</h5>
                                    <h5>To: {to}</h5>
                                    <h5>Date: {date}</h5>
                                </div>
                                {
                                    category.map(vehicleCategory => <SpecificVehicle key={vehicleCategory.id} vehicleCategory={vehicleCategory} />)
                                }
                            </div>
                        </div> :
                        <div className="col-md-5 my-3">
                            <div className="row user-input">
                                <input type="text" onBlur={handleBlur} name="from" className="form-control mb-3" placeholder="Pick From" />
                                <input type="text" onBlur={handleBlur} name="to" className="form-control mb-3" placeholder="Pick To" />
                                <input type="date" onBlur={handleBlur} name="date" id="" className="form-control mb-3" />
                                <button onClick={() => setClick(!click)} className="w-100 btn btn-lg btn-outline-success mb-3">Search</button>
                            </div>
                        </div>
                }
                <div className="col-md-7 my-3">
                    <WrappedMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDZcVrcpxV9-Brb-A7hzzh1fAqVg7aKA2A`}
                        loadingElement={<div style={{ height: `500px`, borderRadius: '10px' }} />}
                        containerElement={<div style={{ height: `500px`, borderRadius: '10px' }} />}
                        mapElement={<div style={{ height: `500px`, borderRadius: '10px' }} />}
                    />
                </div>
            </div>
        </div>
    );
};

export default Search;