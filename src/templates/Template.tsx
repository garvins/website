import * as React from 'react'
import {FC} from "react";
require ('./Template.css');

interface TemplateProps {
    css: string,
    js: string[],
    body: string,
    ssr: any
}

export const Template: FC<TemplateProps> = (props) => {
    return (
        <html lang="en" data-timestamp={(new Date()).toISOString()}>
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="theme-color" content="#0091DE"/>

            <meta name="google-site-verification" content="wMIEhmuiqs2DHu-Pox5BI54CfVPPiLbkRWxnK2mBb4Q"/>

            <link rel="manifest" href={"page_files/manifest.json"}/>
            <link rel="shortcut icon" href={"page_files/favicon.ico"}/>

            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Comfortaa:300,400,700|Roboto|Libre+Franklin"/>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/combine/npm/purecss@1.0.0/build/base-min.css,npm/purecss@1.0.0/build/grids-min.css,npm/purecss@1.0.0/build/grids-responsive-min.css"/>
            <link rel="stylesheet" href='main.css'/>


            <title>enwork</title>
        </head>
        <body>
            <div id='react-root' dangerouslySetInnerHTML={{__html: props.body}}/>
            <script dangerouslySetInnerHTML={{__html: `window.ssr = ${JSON.stringify(props.ssr)}`}}/>
            { props.js.map(src => <script src={src} />) }
            <noscript>
                You need to enable JavaScript to run this app.
            </noscript>
        </body>
        </html>
    )
};

