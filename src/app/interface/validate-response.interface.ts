import { ValidateDataResponse } from "./validate-data.interface";

export interface ValidateResponse {
    status: boolean;
    message: string;
    data: ValidateDataResponse
}