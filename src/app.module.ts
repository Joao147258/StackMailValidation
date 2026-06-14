import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailVadidorModule } from './email-vadidor/email-vadidor.module';

@Module({
  imports: [EmailVadidorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
