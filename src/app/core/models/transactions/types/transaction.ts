import { TaObject } from './../objects/taObject';

export interface Transaction {

    startDate: Date;
    endDate: Date;
    storeID: number;
    workstationID: number;
    operatorID: number;
    objects: TaObject[];
    bardcode: string;

    CreateObject<T extends TaObject>(type: { new(): T ;} ): T;
    GetObject(seqNmbr: Number): TaObject;
    RemoveObject(seqNmbr: number): boolean;

}