import * as React from 'react';
import {renderToStaticMarkup, renderToString} from 'react-dom/server'
import {Routes} from "./Routes";
import {Template} from "./templates/Template";

// our simple ssr function accepts appProps and a webpackStats
// object provided by static-website-generator-webpack-plugin
export default function ssr({webpackStats, appProps, path}) {
    // fetch a list of all the assets created by the webpack compiler
    const assets = Object.keys(webpackStats.compilation.assets);

    const js = assets.filter(value => value.match(/\.js$/));
    const body = renderToString(<Routes {...appProps} path={path} />);

    const templateProps = {
        path: path ? path : '',
        css: '/main.css',
        js: js,
        body: body,

        // the template component will inject a script that sets
        // `window.ssr = ${props.ssr}` in order to initialize the
        // React app in the browser
        ssr: {
            appProps
        }
    };

    // the final html is the result of calling renderToStaticMarkup
    // with our Template component
    return `<!doctype html>${renderToStaticMarkup(<Template {...templateProps} />)}`;
}

