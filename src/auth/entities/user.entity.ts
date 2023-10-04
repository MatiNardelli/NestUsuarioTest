import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { IsArray, IsBoolean, IsString, IsStrongPassword } from "class-validator";

//import { Product } from "../../products/entities/product.entity";
import { Task } from "../../task/entities/task.entity";

@Entity('user')
export class User {
    
    //uso uuid porque si dejo correo se puede cambiar y tengo que cargar el historial
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique:true,
    })
    email:string;

    @Column('text',{
        select:false,//no muestro contraseña al usuario
    })
    password:string;

    @Column('text')
    fullName:string;

    @Column('bool',{
        default:true,
    })
    status:boolean;

    @Column('text',{
        array:true,
        default:['user'],
    })
    roles:string[];

    // @OneToMany(
    //     () => Product,
    //     (product) => product.user,
    // )
    // product: Product;

    @OneToMany(
        ()=>Task,
        (task)=>task.user,
    )
    task: Task;

    @BeforeInsert()
    checkFieldBeforeInsert(){
        this.email = this.email.toLowerCase().trim();   //trim limpia al ppio y al fin
    }

    @BeforeUpdate()
    checkFieldBeforeUpdate(){
        this.checkFieldBeforeInsert();
    }
}
