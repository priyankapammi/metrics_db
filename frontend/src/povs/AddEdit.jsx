import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    const [idea, setIdea] = useState(null);
    const [pov, setPOV] = useState(null);

    useEffect(() => {
        userService.getAll('idea').then(x => setIdea(x));
    }, []);
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        cost: Yup.string()
            .required('Cost is required'),
        idea: Yup.string()
            .required('Idea is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createPOV(data)
            : updatePOV(id, data);
    }

    function createPOV(data) {
        return userService.create(data, 'povs')
            .then(() => {
                alertService.success('POV added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updatePOV(id, data) {
        return userService.update(id, data, 'povs')
            .then(() => {
                alertService.success('POV updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            userService.getById(id).then(pov => {
                const fields = ['pov_id', 'name', 'start_date', 'end_date', 'cost', 'business_case_benefit_estimate', 'idea', 'scale_estimate'];
                fields.forEach(field => setValue(field, pov[field]));
                setPOV(pov);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add POV' : 'Edit POV'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Idea</label>
                    <select name="role" ref={register} className={`form-control ${errors.role ? 'is-invalid' : ''}`}>
                        {idea && idea.map(i =>
                            <option value={i.idea_id}>{i.name}</option>
                        )}
                    </select>
                    <div className="invalid-feedback">{errors.idea?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Name</label>
                    <input name="name" type="text" ref={register} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Start Date</label>
                    <input name="start_date" type="date" ref={register} className={`form-control ${errors.start_date ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.start_date?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>End Date</label>
                    <input name="end_date" type="date" ref={register} className={`form-control ${errors.end_date ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.end_date?.message}</div>
                </div>          
            </div>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Cost of POV</label>
                    <input name="cost" type="text" ref={register} className={`form-control ${errors.cost ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.cost?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>ESTIMATED VALUE - BUSINESS CASE</label>
                    <input name="business_case_benefit_estimate" type="text" ref={register} className={`form-control ${errors.business_case_benefit_estimate ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.business_case_benefit_estimate?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>ESTIMATED VALUE - SCALING CASE</label>
                    <input name="scale_estimate" type="text" ref={register} className={`form-control ${errors.scale_estimate ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.scale_estimate?.message}</div>
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