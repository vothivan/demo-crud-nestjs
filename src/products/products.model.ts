import * as mongoose from 'mongoose';
import { string } from 'yargs';

//mongoose không dùng TS => String cú pháp của JS
export const ProductSchema =  new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    price:  { type: Number, require: true }
});

export interface Product extends mongoose.Document{
    id: string;
    title: string;
    description: string;
    price: number;
    
}