
import { TaObject } from '../objects/taObject';
import { Transaction } from './transaction';

export class SaleTransaction implements Transaction
{
    startDate: Date;
    endDate: Date;
    storeID: number;
    workstationID: number;
    operatorID: number;
    objects: TaObject[] = [];
    bardcode: string;

    CreateObject<T extends TaObject>(type: { new(): T ;} ): T {
        var obj = new type();

        return obj;
    }
    GetObject(seqNmbr: Number): TaObject {
        throw new Error('Method not implemented.');
    }
    RemoveObject(seqNmbr: number): boolean {
        throw new Error('Method not implemented.');
    }
    
    
    
}
