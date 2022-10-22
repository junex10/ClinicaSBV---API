import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User, Modules, PasswordReset, Person, Permissions } from 'src/models';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Modules,
      PasswordReset,
      Person,
      Permissions
    ])
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {}
