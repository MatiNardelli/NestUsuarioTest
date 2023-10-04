import { IsIn, IsNumber, IsOptional, IsString, isNumber } from "class-validator";

export class CreateTaskDto {
    

    @IsString()
    @IsOptional()
    descripcion?:string;

    @IsIn(['alta','media','baja'])
    prioridad:string;

    @IsIn(['SIN COMENZAR','COMENZADA','FINALIZADA','ELIMINADA'])
    statu:string;
}


