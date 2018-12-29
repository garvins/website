import {apiClientInstance} from "../utils/ApiClient";

class VacancyHandler {
    public static getVacancy(
        vacancyId: number,
        successCallback: (data: any) => void,
        errorCallback?: (data: any) => void
    ) {
        apiClientInstance.get('vacancies/' + vacancyId +'/')
            .then(successCallback)
            .catch(errorCallback);
    }

    public static getVacancies(
        successCallback: (data: any) => void,
        errorCallback?: (data: any) => void
    ) {
        apiClientInstance.get('vacancies/')
            .then(successCallback)
            .catch(errorCallback);
    }
}

export {VacancyHandler};