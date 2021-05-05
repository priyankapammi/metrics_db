import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Nav, Alert } from '@/_components';
import { Home } from '@/home';
import { Campaigns } from '@/campaigns';
import { Events } from '@/events';
import { POVs } from '@/povs';
import { Learning } from '@/learning';
import { Hypothesis } from '@/hypothesis';
import { Users } from '@/users';

function App() {
    const { pathname } = useLocation();  

    return (
        <div className="app-container bg-light">
            <Nav />
            <Alert />
            <div className="container pt-4 pb-4">
                <Switch>
                    <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                    <Route exact path="/" component={Home} />
                    <Route path="/campaigns" component={Campaigns} />
                    <Route path="/events" component={Events} />
                    <Route path="/povs" component={POVs} />
                    <Route path="/learning" component={Learning} />
                    <Route path="/hypothesis" component={Hypothesis} />
                    <Route path="/users" component={Users} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
        </div>
    );
}

export { App }; 