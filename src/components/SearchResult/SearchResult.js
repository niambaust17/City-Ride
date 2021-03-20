import React from 'react';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import fakeVehicle from '../../fakeData/fakeVehicle.json';
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function Map()
{
    return <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 23.777176, lng: 90.399452 }}
    ></GoogleMap>
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

const SearchResult = () =>
{
    const { vehicle } = useParams();
    const category = fakeVehicle.filter(cat => cat.vehicleType === vehicle);
    console.log(category);
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5 my-3" style={{ border: '1px solid gray', padding: '25px', borderRadius: '10px' }}>
                    <div>
                        <h3>Dhanmondi</h3>
                        <h3>Rampura</h3>
                    </div>
                    <div className="row">
                        {
                            category.map(single =>
                                <div key={single.id} style={{ border: '1px solid orange', marginBottom: '5px', borderRadius: '10px' }}>
                                    <div className="col-md-12 col-md-6">
                                        <div className="row d-flex justify-content-between">
                                            <div className="col-md-5 d-flex align-items-center">
                                                <img src={single.image} alt="" style={{ padding: '5px' }} />
                                            </div>
                                            <div className="col-md-7 d-flex justify-content-evenly align-items-center">
                                                <h5>{single.vehicleType}</h5>
                                                <h5><FontAwesomeIcon icon={faUsers} /> {single.capacity}</h5>
                                                <h5>${single.price}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
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

export default SearchResult;