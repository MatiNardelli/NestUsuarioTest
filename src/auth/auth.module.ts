import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports:[ //con esto ya aparece en la DB
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({defaultStrategy: 'jwt'}),

    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:( configService: ConfigService )=>{
        //solo para mostrar que tenemos el mismo resultado
        // console.log('JWT Secret', configService.get('JWT_SECRET'))
        // console.log('JWT SECRET',process.env.JWT_SECRET);
        return {
            secret: configService.get('JWT_SECRET'),
            signOptions: {
            expiresIn: '2h',
          }
        }
      }
    })
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: {
    //     expiresIn: '2h',
    //   }
    // })
  ],
  exports: [TypeOrmModule, JwtStrategy,PassportModule,JwtModule], //permite que el modelo sea usado fuera de este module
})
export class AuthModule {}
