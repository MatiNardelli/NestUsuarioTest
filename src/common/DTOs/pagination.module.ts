import { Type } from "class-transformer";
import { IsBoolean, IsIn, IsOptional, IsPositive, MIN, Min, MinLength } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    //transformar
    @Type( () => Number )
    limit?:number;

    @IsOptional()
    @Min(0)
    @Type(()=>Number)
    offset?:number;

    @IsOptional()
    @IsIn(['SIN COMENZAR','COMENZADA','FINALIZADA','ELIMINADA'])
    statu:string;
}