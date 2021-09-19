import { Controller, Post, Body, Get, Param, Patch, Delete} from "@nestjs/common"; // Patch ` PUT
import { doesNotMatch } from "assert";
import { ProductsService } from "./products.service";

@Controller('products') // link url ~ locallhost:3000/products
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async addProduct(
        // đối số
        @Body('title') prodTitle: string, 
        @Body('description') prodDesc: string, 
        @Body('price') prodPrice: number
        ) {
        const generatedId = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return { id: generatedId};
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getProducts();
        return products ;
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string,) {
        return this.productsService.getSingleProduct(prodId);
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string, 
        @Body('title') prodTitle: string, 
        @Body('description') prodDesc: string, 
        @Body('price') prodPrice: number,
        ) {
            await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
            return 'done';
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        await this.productsService.deleteProduct(prodId);
        return 'done'
    }
}