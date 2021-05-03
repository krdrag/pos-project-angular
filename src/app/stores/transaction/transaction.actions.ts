export class ScanBarcode {
    static readonly type = '[TRANSACTION] SCAN BARCODE'

    constructor(public barcode: string) {}
}