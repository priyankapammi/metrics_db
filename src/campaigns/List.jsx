import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { userService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [campaigns, setCampaigns] = useState(null);
    const [businessArea, setBusinessArea] = useState(null);
    
    useEffect(() => {
        userService.getAll('campaigns').then(x => setCampaigns(x));
    }, []);

    useEffect(() => {
        userService.getAll('businessArea').then(x => setBusinessArea(x));
    }, []);

    function deleteCampaign(id) {
        setCampaigns(campaigns.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        userService.delete(id, 'campaigns').then(() => {
            setCampaigns(campaigns => campaigns.filter(x => x.id !== id));
        });
    }

    const businessAreaName = (arr, prop, val) => {
        let baObj = arr && arr.find(obj => obj[prop] == val );
        let name = baObj ? baObj.area_name+" - "+baObj.sub_area_name : "";
        return name;
    };

    const sortName = (data, order) => {
        // var sortedObjs = _.sortBy(users, 'firstName');
        let value
        if (order === 'ascending') {
            value = users.sort((a, b) => (a[data] < b[data]) ? 1 : -1)
        } else {
            value = users.sort((a, b) => (a[data] > b[data]) ? 1 : -1)
        }

        userService.sortUsers(value).then((res) => {
            setUsers(res)
        });
    }

    const search = (e) => {
        let value = e.target.value
        if (value.length >= 3) {
            let items = users.find(o => o.firstName === value);
            console.log('bbbbbbbbbbbb', items)
            userService.usersFilter(items).then((res) => {
                if (res !== null) {
                    setUsersFilter(res)
                    setShowFilter(true)
                }
            });

        }
        else {
            setShowFilter(false)
        }
    }

      

    return (
        <div>
            <h1>Campaigns</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Campaign</Link>
            <div>
                <input
                    type='text'
                    placeholder='search...'
                    onChange={(e) => search(e)}

                /><span className='fas fa-search' style={{ fontSize: '44px', color: 'red' }}>&#128269;</span>

            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>NAME
                            <span onClick={() => sortName('name', 'ascending')} style={{ fontSize: '24px', color: 'black' }} >&#x2193;</span>
                            <span onClick={() => sortName('name', 'descending')} style={{ fontSize: '24px', color: 'black' }} >&#8593;</span>
                        </th>
                        <th style={{ width: '10%' }}>DATE LAUNCHED
                            <span onClick={() => sortName('date_launched', 'ascending')} style={{ fontSize: '24px', color: 'black' }} >&#x2193;</span>
                            <span onClick={() => sortName('date_launched', 'descending')} style={{ fontSize: '24px', color: 'black' }} >&#8593;</span>
                        </th>
                        <th style={{ width: '10%' }}>DATE CLOSED
                            <span onClick={() => sortName('date_closed', 'ascending')} style={{ fontSize: '24px', color: 'black' }} >&#x2193;</span>
                            <span onClick={() => sortName('date_closed', 'descending')} style={{ fontSize: '24px', color: 'black' }} >&#8593;</span>
                        </th>
                        <th style={{ width: '30%' }}>COMMENTS
                            <span onClick={() => sortName('comments', 'ascending')} style={{ fontSize: '24px', color: 'black' }} >&#x2193;</span>
                            <span onClick={() => sortName('comments', 'descending')} style={{ fontSize: '24px', color: 'black' }} >&#8593;</span>
                        </th>
                        <th style={{ width: '20%' }}>Entity
                            <span onClick={() => sortName('ba', 'ascending')} style={{ fontSize: '24px', color: 'black' }} >&#x2193;</span>
                            <span onClick={() => sortName('ba', 'descending')} style={{ fontSize: '24px', color: 'black' }} >&#8593;</span>
                        </th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns && campaigns.map(campaign =>
                        
                        <tr key={campaign.campaign_id}>
                            <td>{campaign.name}</td>
                            <td>{campaign.date_launched}</td>
                            <td>{campaign.date_closed}</td>
                            <td>{campaign.comments}</td>
                            <td>{businessAreaName(businessArea, 'ba_id', campaign.ba)}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${campaign.campaign_id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteCampaign(campaign.campaign_id)} className="btn btn-sm btn-danger btn-delete-user" disabled={campaign.isDeleting}>
                                    {campaign.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!campaigns &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {campaigns && !campaigns.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Campaigns To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };