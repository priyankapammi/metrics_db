import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        description: Yup.string()
            .required('Description is required'),
        organiser: Yup.string()
            .required('Organiser is required'),
        event_type: Yup.string()
            .required('Event Type is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createEvent(data)
            : updateEvent(id, data);
    }

    function createEvent(data) {
        return userService.create(data, 'events')
            .then(() => {
                alertService.success('Event added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateEvent(id, data) {
        return userService.update(id, data, 'events')
            .then(() => {
                alertService.success('Event updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    const [event, setEvent] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            userService.getById(id).then(user => {
                const fields = ['description', 'organiser', 'attendees', 'start_date', 'end_date', 'event_type', 'location'];
                fields.forEach(field => setValue(field, event[field]));
                setEvent(event);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Event' : 'Edit Event'}</h1>
            <div className="form-row">
                <div className="form-group col-10">
                    <label>Description</label>
                    <input name="description" type="text" ref={register} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.description?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>organiser</label>
                    <input name="organiser" type="text" ref={register} className={`form-control ${errors.organiser ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.organiser?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Attendees</label>
                    <input name="attendees" type="text" ref={register} className={`form-control ${errors.attendees ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.attendees?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Start Date</label>
                    <input name="start_date" type="text" ref={register} className={`form-control ${errors.start_date ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.start_date?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>End Date</label>
                    <input name="end_date" type="text" ref={register} className={`form-control ${errors.end_date ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.end_date?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Event Type</label>
                    <input name="event_type" type="text" ref={register} className={`form-control ${errors.event_type ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.event_type?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Location</label>
                    <input name="location" type="text" ref={register} className={`form-control ${errors.location ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.location?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { AddEdit };