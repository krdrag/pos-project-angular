import { TaObject } from "./taObject.model";

export interface Transaction {
    transactionID: string;
    startDate: Date;
    endDate: Date;
    objects: TaObject[];
    storeID: number;
    workstationID: number;
    closed: boolean;
}