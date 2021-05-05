import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { userService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [events, setEvents] = useState(null);

    useEffect(() => {
        userService.getAll('events').then(x => setEvents(x));
    }, []);

    function deleteEvent(id) {
        setEvents(events.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        userService.delete(id, 'events').then(() => {
            setEvents(events => events.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Events</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Event</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '10%' }}>EVENT ID</th>
                        <th style={{ width: '10%' }}>DESCRIPTION</th>
                        <th style={{ width: '10%' }}>ORGANISER</th>
                        <th style={{ width: '10%' }}>ATTENDEES</th>
                        <th style={{ width: '10%' }}>START DATE</th>
                        <th style={{ width: '10%' }}>END DATE</th>
                        <th style={{ width: '10%' }}>EVENT TYPE</th>
                        <th style={{ width: '10%' }}>LOCATION</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {events && events.map(event =>
                        <tr key={event.eventid}>
                            <td>{event.eventid}</td>
                            <td>{event.description}</td>
                            <td>{event.organiser}</td>
                            <td>{event.attendees}</td>
                            <td>{event.start_date}</td>
                            <td>{event.end_date}</td>
                            <td>{event.event_type}</td>
                            <td>{event.location}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${event.eventid}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteEvent(event.eventid)} className="btn btn-sm btn-danger btn-delete-user" disabled={event.isDeleting}>
                                    {event.isDeleting 
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