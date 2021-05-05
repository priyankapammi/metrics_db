import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    const [businessArea, setBusinessArea] = useState(null);
    const [campaign, setCampaign] = useState(null);

    useEffect(() => {
        userService.getAll('businessArea').then(x => setBusinessArea(x));
    }, []);
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        campaign_id: Yup.string()
                .required('Campaign ID is required'),
        name: Yup.string()
            .required('Campaign name is required'),
        comments: Yup.string()
            .required('Campaign comments are required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createCampaign(data)
            : updateCampaign(id, data);
    }

    function createCampaign(data) {
        return userService.create(data, 'campaigns')
            .then(() => {
                alertService.success('Campaign added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateCampaign(id, data) {
        return userService.update(id, data, 'campaigns')
            .then(() => {
                alertService.success('Campaign updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }


    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            userService.getById(id, 'campaigns').then(campaign => {
                const fields = ['campaign_id', 'name', 'date_launched', 'date_closed', 'comments', 'ba'];
                fields.forEach(field => setValue(field, campaign[field]));
                setCampaign(campaign);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Campaign' : 'Edit Campaign'}</h1>
            <div className="form-row">
                <div className="form-group col-3">
                    <label>Campaign ID</label>
                    <input name="campaign_id" type="text" ref={register} className={`form-control ${errors.campaign_id ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.campaign_id?.message}</div>
                </div>
                <div className="form-group col-4">
                    <label>Name</label>
                    <input name="name" type="text" ref={register}  className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
                <div className="form-group col-3">
                    <label>Date Launched</label>
                    <input name="date_launched" type="date" ref={register} className={`form-control ${errors.date_launched ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.date_launched?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div class="form-group col-5">
                    <label>Date Closed</label>
                    <input name="date_closed" type='date' ref={register}  className={`form-control ${errors.date_closed ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.date_closed?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Entity</label>
                    <select name="role" ref={register} className={`form-control ${errors.ba ? 'is-invalid' : ''}`}>
                        {businessArea && businessArea.map(ba =>
                            <option value={ba.ba_id}>{ba.area_name} - {ba.sub_area_name}</option>
                        )}
                    </select>
                    <div className="invalid-feedback">{errors.ba?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-10">
                    <label>Comments</label>
                    <input name="comments" type="text" ref={register} className={`form-control ${errors.comments ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.comments?.message}</div>
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