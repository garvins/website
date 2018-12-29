import {apiClientInstance} from "../utils/ApiClient";

class CompanyHandler {
    public static getCompany(
        companyId: number,
        successCallback: (data: any) => void,
        errorCallback?: (data: any) => void
    ) {
        apiClientInstance.get('companies/' + companyId +'/')
            .then(successCallback)
            .catch(errorCallback);
    }
}

export {CompanyHandler};