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

    useEffect(() => {
        userService.getAll('povs').then(x => setPOVs(x));
    }, []);
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        category: Yup.string()
            .required('Category is required'),
        description: Yup.string()
            .required('Description is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createLearning(data)
            : updateLearning(id, data);
    }

    function createLearning(data) {
        return userService.create(data, 'learning')
            .then(() => {
                alertService.success('Learning added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateLearning(id, data) {
        return userService.update(id, data, 'learning')
            .then(() => {
                alertService.success('Learning updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    const [learning, setLearning] = useState({});

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            userService.getById(id, 'learning').then(learning => {
                const fields = ['pov', 'category', 'sub_category', 'description', 'score'];
                fields.forEach(field => setValue(field, learning[field]));
                setLearning(learning);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Learning' : 'Edit Learning'}</h1>
            <div className="form-row">
                <div className="form-group col-5">
                <label>Category</label>
                    <input name="category" type="text" ref={register} className={`form-control ${errors.category ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.category?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Sub Category</label>
                    <input name="sub_category" type="text" ref={register} className={`form-control ${errors.sub_category ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.sub_category?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>score</label>
                    <input name="score" type="text" ref={register} className={`form-control ${errors.score ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.score?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>POV</label>
                    <select name="pov" ref={register} className={`form-control ${errors.pov ? 'is-invalid' : ''}`}>
                        {povs && povs.map(pov =>
                            <option value={pov.pov_id}>{pov.name}</option>
                        )}
                    </select>
                    <div className="invalid-feedback">{errors.pov?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-10">
                    <label>Description</label>
                    <input name="description" type="text" ref={register} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.description?.message}</div>
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