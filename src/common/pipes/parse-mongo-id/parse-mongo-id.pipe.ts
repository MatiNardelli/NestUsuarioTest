import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isMongoId } from 'class-validator';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  
  transform(value: string, metadata: ArgumentMetadata) {
    // console.log(value,metadata);

    if(!isValidObjectId(value)){
      throw new BadRequestException(`the id:${value} is not a MongoID`);
    }

    return value;
  }
}
