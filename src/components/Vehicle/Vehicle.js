import React from 'react';
import { useHistory } from 'react-router';
import './Vehicle.css';

const Vehicle = (props) =>
{
    const { vehicle } = props;
    const { image, vehicleType } = vehicle;
    const history = useHistory();
    return (
        <div className="col">
            <div className="card">
                <img src={image} className="card-img-top" alt="..." />
                <div className="card-body text-center">

                </div>
                <div className="card-footer text-center">
                    <h5 className="card-title">{vehicle.vehicleType}</h5>
                    <button onClick={() => history.push(`/search/${ vehicleType }`)} className="btn btn-outline-success">Ride</button>
                </div>
            </div>
        </div>
    );
};

export default Vehicle;