import React from 'react';
import { useNavigate } from 'react-router';
import './Vehicle.css';

const Vehicle = (props) =>
{
    const { vehicle } = props;
    const { image, vehicleType } = vehicle;
    const navigate = useNavigate();
    return (
        <div className="col">
            <div className="card" onClick={() => navigate(`/search/${ vehicleType }`)}>
                <img src={image} className="card-img-top" alt="..." />
                <div className="text-center">
                    <h5 className="card-title">{vehicle.vehicleType}</h5>
                </div>
            </div>
        </div>
    );
};

export default Vehicle;