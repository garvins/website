import * as React from 'react';
import {VacanciesView} from "./VacanciesView";
import {VacanciesViewProps} from "./VacanciesViewProps";
import {VacancyHandler} from "../../handlers/VacancyHandler";

interface VacanciesState {
    viewProps: VacanciesViewProps;

    vacanciesLoaded: boolean;
}

export class VacanciesPage extends React.Component<{}, VacanciesState> {
    public constructor(props) {
        super(props);

        this.state = {
            viewProps: {},
            vacanciesLoaded: false,
        };
    }

    public componentDidMount() {
        if (typeof document !== 'undefined' &&
            typeof document.getElementById === 'function') {
            this.downloadVacancies();
        }
    }

    public render() {
        return React.createElement(VacanciesView, this.state.viewProps)
    }

    private downloadVacancies() {
        VacancyHandler.getVacancies(
            (data) => {
                console.log(data);
            },
            () => {}
        );
    }
}