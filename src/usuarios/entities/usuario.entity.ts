//entity hacen referencia a como queremos grabar en base de datos

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//decorador que indica que es base de dato
@Schema()
export class Usuario extends Document{
    //id:string//mongo me lo da
    
    // id: string;

    @Prop({
        unique: true,
        index:true,
    })
    name: string;

    @Prop({
        unique: true,
        index:true,
    })
    email:string;

    @Prop({
        unique: true,
        index:true,
    })
    phone:number;

    @Prop({
        unique: true,
        index:true,
    })
    no:string;
    // createdAt:number;


    
    
    
    
    // id: string;
    // name: string;
    // email: string;
    // phone: number;
    // status: boolean;

    // createdAt: number;
    // updatedAt?: number;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);