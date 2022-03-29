import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData/fakeData.json';
import Vehicle from '../Vehicle/Vehicle';
import img from '../../images/Bg.png';

const Home = () =>
{
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => setVehicles(fakeData), []);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${ img })`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', minHeight: '90.7vh' }}>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {
                        vehicles.map(vehicle => <Vehicle key={vehicle.id} vehicle={vehicle} />)
                    }
                </div>
            </div>
        </div>

    );
};

export default Home;