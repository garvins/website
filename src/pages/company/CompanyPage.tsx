import * as React from 'react';
import {CompanyHandler} from "../../handlers/CompanyHandler";
import {CompanyViewProps} from "./CompanyViewProps";
import {CompanyView} from "./CompanyView";

interface CompanyPageState {
    viewProps: CompanyViewProps;
    companyId: number;
    companyLoaded: boolean;
}

export class CompanyPage extends React.Component<{}, CompanyPageState> {
    public constructor(props) {
        super(props);

        this.state = {
            viewProps: {},
            companyId: 1,
            companyLoaded: false,
        };
    }

    public componentDidMount() {
        if (typeof document !== 'undefined' &&
            typeof document.getElementById === 'function') {
            this.downloadCompany();
        }
    }

    public render() {
        return React.createElement(CompanyView, this.state.viewProps)
    }

    private downloadCompany() {
        CompanyHandler.getCompany(
            this.state.companyId,
            (data) => {
                console.log(data);
            },
            () => {}
        );
    }
}