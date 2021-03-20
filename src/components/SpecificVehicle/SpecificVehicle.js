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
                <div style={{ border: '1px solid orange', marginBottom: '5px', borderRadius: '10px' }}>
                    <div className="col-lg-12">
                        <div className="row d-flex justify-content-between">
                            <div className="col-md-5 d-flex align-items-center">
                                <img src={image} alt="" style={{ padding: '5px' }} />
                            </div>
                            <div className="col-md-7 d-flex justify-content-evenly align-items-center">
                                <h5>{vehicleType}</h5>
                                <h5><FontAwesomeIcon icon={faUsers} /> {capacity}</h5>
                                <h5>${price}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SpecificVehicle;