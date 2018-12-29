import * as React from 'react'
import {render} from 'react-dom'
import {Routes} from "./Routes";
import registerServiceWorker from './registerServiceWorker';

// our mount function
export default function () {
    // renders the app with the props provided by the
    // server (set with the Template component)
    const appProps = {}; //window.ssr.appProps;

    render(
        <Routes {...appProps} path={window.location.pathname} />,
        document.getElementById('react-root')
    );

    registerServiceWorker();
}