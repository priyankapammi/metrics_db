import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { userService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [hypothesis, setHypothesis] = useState(null);
    const [povs, setPOVs] = useState(null);

    useEffect(() => {
        userService.getAll('hypothesis').then(x => setHypothesis(x));
    }, []);

    useEffect(() => {
        userService.getAll('povs').then(x => setPOVs(x));
    }, []);

    function deleteUser(id) {
        setHypothesis(hypothesis.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        userService.delete(id, 'hypothesis').then(() => {
            setHypothesis(hypothesis => hypothesis.filter(x => x.id !== id));
        });
    }

    const povName = (arr, prop, val) => {
        let obj = arr && arr.find(obj => obj[prop] == val );
        let name = obj ? obj.name : "";
        return name;
    };

    return (
        <div>
            <h1>Hypothesis</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Hypothesis</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>DESCRIPTION</th>
                        <th style={{ width: '10%' }}>STRETCH</th>
                        <th style={{ width: '10%' }}>PROVEN</th>
                        <th style={{ width: '10%' }}>POV ID</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {hypothesis && hypothesis.map(hypo =>
                        <tr key={hypo.hypothesis_id}>
                            <td>{hypo.description}</td>
                            <td>{hypo.stretch}</td>
                            <td>{hypo.proven}</td>
                            <td>{povName(povs, 'pov_id', hypo.pov)}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${hypo.hypothesis_id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(hypo.hypothesis_id)} className="btn btn-sm btn-danger btn-delete-user" disabled={hypo.isDeleting}>
                                    {hypo.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!hypothesis &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {hypothesis && !hypothesis.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Hypothesis To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };