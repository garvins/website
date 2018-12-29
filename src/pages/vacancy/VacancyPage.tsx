import * as React from 'react';
import {VacancyHandler} from "../../handlers/VacancyHandler";
import {VacancyViewProps} from "./VacancyViewProps";
import {VacancyView} from "./VacancyView";

interface VacancyState {
    viewProps: VacancyViewProps;
    vacancyId: number;
    vacancyLoaded: boolean;
}

export class VacancyPage extends React.Component<{}, VacancyState> {
    public constructor(props) {
        super(props);

        this.state = {
            viewProps: {},
            vacancyId: 1,
            vacancyLoaded: false,
        };
    }

    public componentDidMount() {
        if (typeof document !== 'undefined' &&
            typeof document.getElementById === 'function') {
            this.downloadVacancy();
        }
    }

    public render() {
        return React.createElement(VacancyView, this.state.viewProps)
    }

    private downloadVacancy() {
        VacancyHandler.getVacancy(
            this.state.vacancyId,
            (data) => {
                console.log(data);
            },
            () => {}
        );
    }
}