import * as React from 'react';
import {StaticRouter} from 'react-router';
import {FC} from "react";

export const Routes: FC<{ path: string }> = (props) => (
    <React.Fragment>
        <StaticRouter location={props.path ? props.path : ''} context={{}}>
        </StaticRouter>
    </React.Fragment>
);
