import * as React from 'react';
import {Route, StaticRouter, Switch} from 'react-router';
import {StartPage} from "./pages/start/Start";
import {FC} from "react";
import {CompanyPage, VacancyPage, VacanciesPage} from "./pages";

export const Routes: FC<{ path: string }> = (props) => (
    <React.Fragment>
        <StaticRouter location={props.path ? props.path : ''} context={{}}>
            <Switch>
                <Route exact path='/' component={StartPage}/>
                <Route path='/company' component={CompanyPage}/>
                <Route path='/vacancy' component={VacancyPage}/>
                <Route path='/vacancies' component={VacanciesPage}/>
            </Switch>
        </StaticRouter>
    </React.Fragment>
);
