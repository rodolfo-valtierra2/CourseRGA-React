import {Document} from 'mongoose'

export interface IProject extends Document {
    readonly _id: string;
    readonly name: string;
    readonly description: string;
    readonly budget: number;
    readonly active: boolean;
    readonly typeContractId: number;
    readonly signed_at: string;
    readonly imageUrl: string;
    
}