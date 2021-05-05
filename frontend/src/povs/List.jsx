import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { userService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [povs, setPOVs] = useState(null);

    useEffect(() => {
        userService.getAll('povs').then(x => setPOVs(x));
    }, []);

    function deleteUser(id) {
        setPOVs(povs.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        userService.delete(id, 'povs').then(() => {
            setPOVs(povs => povs.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>POVs</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add POV</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '10%' }}>START DATE</th>
                        <th style={{ width: '10%' }}>END DATE</th>
                        <th style={{ width: '10%' }}>COST OF POV</th>
                        <th style={{ width: '20%' }}>ESTIMATED VALUE - BUSINESS CASE</th>
                        <th style={{ width: '10%' }}>ESTIMATED VALUE - SCALING CASE</th>
                        <th style={{ width: '10%' }}>IDEA ID</th>
                        <th style={{ width: '20%' }}>NAME</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {povs && povs.map(pov =>
                        <tr key={pov.pov_id}>
                            <td>{pov.start_date}</td>
                            <td>{pov.end_date}</td>
                            <td>${pov.cost}</td>
                            <td>{pov.business_case_benefit_estimate}</td>
                            <td>${pov.scale_estimate}</td>
                            <td>{pov.idea}</td>
                            <td>{pov.name}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${pov.pov_id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(pov.pov_id)} className="btn btn-sm btn-danger btn-delete-user" disabled={pov.isDeleting}>
                                    {pov.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export { List };