import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.modules';
import {MongooseModule} from '@nestjs/mongoose'

// mongoose set up kết nối db
//forRoot cung cấp và cấu hình các dịch vụ cùng một lúc.
//Nó nhận một đối tượng cấu hình dịch vụ và trả về ModuleWithProviders.
@Module({
  imports: [ProductsModule, MongooseModule.forRoot('mongodb://localhost:27017/demo')], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
