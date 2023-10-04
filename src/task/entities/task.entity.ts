import { IsIn, IsString } from "class-validator";
import { User } from "../../auth/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        type:"timestamptz",
        default: ()=>"CURRENT_TIMESTAMP",
    })
    createdAt: Date;
    
    @Column({
        type:'text',
        nullable:true,
        default:'Add a task brief'        
    })
    descripcion:string;
    
    @Column('text')
    prioridad:string;

    @Column('text')
    statu:string;

    @ManyToOne(
        ()=> User,
        (user)=>user.task,
    )
    user: User;
    
    
    

}
