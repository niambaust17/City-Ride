import React from 'react';
import { useParams } from 'react-router';
import img from '../../images/Map.png';
import fakeVehicle from '../../fakeData/fakeVehicle.json';

const SearchResult = () =>
{
    const { vehicle } = useParams();
    const category = fakeVehicle.filter(cat => cat.vehicleType === vehicle);
    console.log(category);
    return (
        <div className="container">
            <div className="row d-flex">
                <div className="col-md-5 my-3">
                    <div className="row d-flex">
                        {
                            category.map(single =>
                                <>
                                    <div className="col-md-4">
                                        <img src={single.image} alt="" />
                                    </div>
                                    <div className="col-md-8">
                                        <h4>{single.vehicleType}</h4>
                                        <p>${single.price}</p>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
                <div className="col-md-7 my-3">
                    <img src={img} alt="" />
                </div>
            </div>
        </div>
    );
};

export default SearchResult;