import { Injectable, NotFoundException } from "@nestjs/common";
import { throwError } from "rxjs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Product } from "./products.model";

@Injectable()
export class ProductsService {
    products : Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel : Model<Product>) {}

     async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({ 
            title: title, 
            description: desc, 
            price: price,
        });
        const result = await newProduct.save().then();
        //console.log(result);
        return result.id as string;
       
    }

    async getProducts() {
       // trả lại một bản sao, có thể tạo một bản sao đơn
       // giản bằng cách gọi slide tại đây hoặc bây giờ thay thế bằng cách trả về một mảng
       // return this.products.slice();
       const products = await this.productModel.find().exec();
       return products.map( prod => ({ 
           id: prod.id, 
           title: prod.title, 
           description: prod.description, 
           price: prod.price
       }));
      
    }

    async getSingleProduct(productId : string) {
        const product = await this.findProduct(productId);
        return {
            id: product.id,
            titlle: product.title,
            description: product.description,
            price: product.price
        }; //
    }

    // thêm private để chỉ có thể gọi từ bên trong service
    async updateProduct(productId: string, title: string, description: string, price: number) {
        const updatedProduct = await this.findProduct(productId);
        if(title) {
            updatedProduct.title = title;
        }
        if(description) {
            updatedProduct.description = description;
        }
        if(price) {
            updatedProduct.price = price;
        }
        updatedProduct.save();
       
    }

    async deleteProduct(id: string) {
        const product =  await this.productModel.deleteOne({_id: id}).exec();
        console.log(product)
        if(product.n === 0) {
            throw new NotFoundException('Could not find product.')
        }
    }

    private async findProduct(id: String) : Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id);
        } catch (error) {
            throw new NotFoundException("Could not found product");
        }
        return product;
    }
        
}