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
            <div className="card" onClick={() => history.push(`/search/${ vehicleType }`)}>
                <img src={image} className="card-img-top" alt="..." />
                <div className="card-footer text-center">
                    <h5 className="card-title">{vehicle.vehicleType}</h5>
                </div>
            </div>
        </div>
    );
};

export default Vehicle;