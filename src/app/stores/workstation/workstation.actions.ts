import { Workstation } from './../../models/workstation.model';

export class SetWorkstation {
    static readonly type = '[WORKSTATION] SET WORKSTATION'

    constructor(public payload: Workstation) {}
}