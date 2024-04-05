import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormResponsesController } from './form-responses/form-responses.controller';


@Module({
  imports: [],
  controllers: [AppController, FormResponsesController],
  providers: [AppService],
})
export class AppModule {}
