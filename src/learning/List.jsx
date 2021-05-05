import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { userService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [learning, setLearning] = useState(null);
    const [povs, setPOVs] = useState(null);

    useEffect(() => {
        userService.getAll('learning').then(x => setLearning(x));
    }, []);
    
    useEffect(() => {
        userService.getAll('povs').then(x => setPOVs(x));
    }, []);

    function deleteUser(id) {
        setLearning(learning.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        userService.delete(id, 'learning').then(() => {
            setLearning(learning => learning.filter(x => x.id !== id));
        });
    }

    const povName = (arr, prop, val) => {
        let obj = arr && arr.find(obj => obj[prop] == val );
        let name = obj ? obj.name : "";
        return name;
    };

    return (
        <div>
            <h1>Learning</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Learning</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '10%' }}>CATEGORY</th>
                        <th style={{ width: '10%' }}>SUB CATEGORY</th>
                        <th style={{ width: '30%' }}>DESCRIPTION</th>
                        <th style={{ width: '10%' }}>SCORE</th>
                        <th style={{ width: '20%' }}>POV ID</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {learning && learning.map(learn =>
                        <tr key={learn.learning_id}>
                            <td>{learn.category}</td>
                            <td>{learn.sub_category === "NULL" ? "" : learn.sub_category}</td>
                            <td>{learn.description}</td>
                            <td>{learn.score}</td>
                            <td>{povName(povs, 'pov_id', learn.pov)}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${learn.learning_id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(learn.learning_id)} className="btn btn-sm btn-danger btn-delete-user" disabled={learn.isDeleting}>
                                    {learn.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!learning &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {learning && !learning.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Learning To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };