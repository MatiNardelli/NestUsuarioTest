import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';


// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TareasModule } from './tareas/tareas.module';
import { CommonModule } from './common/common.module';


@Module({
  imports: [UsuariosModule,
    ServeStaticModule.forRoot({

      rootPath: join(__dirname,'..','public'),
      
      }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-cliente'),
    TareasModule,
    CommonModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
