import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData/fakeData.json';
import Vehicle from '../Vehicle/Vehicle';

const Home = () =>
{
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => setVehicles(fakeData), []);

    return (
        <div className="container my-5">
            <div className="row row-cols-1 row-cols-lg-4 row-cols-md-2 row-cols-sm-2 g-4">
                {
                    vehicles.map(vehicle => <Vehicle key={vehicle.id} vehicle={vehicle} />)
                }
            </div>
        </div>
    );
};

export default Home;