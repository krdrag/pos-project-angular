import { Transaction } from '../types/transaction';
import { TaObject } from './taObject';

export class ArticleObject implements TaObject
{
    transaction: Transaction;
    seqNmbr: number;

}