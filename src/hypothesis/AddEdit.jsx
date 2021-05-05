import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    const [povs, setPOVs] = useState(null);
    const [hypothesis, setHypothesis] = useState({});

    useEffect(() => {
        userService.getAll('povs').then(x => setPOVs(x));
    }, []);
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        description: Yup.string()
            .required('Description is required'),
        proven: Yup.string()
            .required('Proven is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createHypothesis(data)
            : updateHypothesis(id, data);
    }

    function createHypothesis(data) {
        return userService.create(data, 'hypothesis')
            .then(() => {
                alertService.success('Hypothesis added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateHypothesis(id, data) {
        return userService.update(id, data, 'hypothesis')
            .then(() => {
                alertService.success('Hypothesis updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            userService.getById(id, 'hypothesis').then(hypothesis => {
                const fields = ['pov', 'description', 'stretch', 'proven'];
                fields.forEach(field => setValue(field, hypothesis[field]));
                setHypothesis(hypothesis);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Hypothesis' : 'Edit Hypothesis'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>POV</label>
                    <select name="pov" ref={register} className={`form-control ${errors.pov ? 'is-invalid' : ''}`}>
                        {povs && povs.map(pov =>
                            <option value={pov.pov_id}>{pov.name}</option>
                        )}
                    </select>
                    <div className="invalid-feedback">{errors.pov?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Description</label>
                    <input name="description" type="text" ref={register} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.description?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group row checkbox">
                    <label>Proven?</label>
                    <input name="proven" type="checkbox" ref={register} className={`form-control ${errors.proven ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.proven?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group row checkbox">
                    <label>Was this a Stretch Hypothesis? </label>
                    <input name="stretch" type="checkbox" ref={register} className={`form-control ${errors.stretch ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.stretch?.message}</div>
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