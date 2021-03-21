import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const SpecificVehicle = (props) =>
{
    const { vehicleCategory } = props;
    const { image, vehicleType, price, capacity } = vehicleCategory;
    return (
        <>
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between align-items-center" style={{ borderRadius: '10px', marginBottom: '10px', backgroundColor: 'lightgray' }}>
                    <img src={image} alt="" style={{ width: '100px', padding: '10px 0' }} />
                    <h5>{vehicleType}</h5>
                    <h5><FontAwesomeIcon icon={faUsers} /> {capacity}</h5>
                    <h5>${price}</h5>
                </div>
            </div>
        </>
    );
};

export default SpecificVehicle;