import React from 'react';
import { useParams } from 'react-router';
import fakeVehicle from '../../fakeData/fakeVehicle.json';
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import SpecificVehicle from '../SpecificVehicle/SpecificVehicle';

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
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5 my-3" style={{ border: '1px solid gray', padding: '25px', borderRadius: '10px' }}>
                    <div>
                        <h5>From: {category[0].from}</h5>
                        <h5>To: {category[0].to}</h5>
                        {
                            category.map(vehicleCategory => <SpecificVehicle key={vehicleCategory.id} vehicleCategory={vehicleCategory} />)
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
        </div >
    );
};

export default SearchResult;