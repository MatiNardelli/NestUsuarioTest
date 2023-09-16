import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Model, isValidObjectId } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {

  //inyeccion de dpendencia solo en constructor
  //esto para poder trabajr con la baseDatos
  constructor(
    @InjectModel(Usuario.name)
    private readonly usuarioModel: Model<Usuario>
  ){}
  
  async create(createUsuarioDto: CreateUsuarioDto) {
  
  try {   
      createUsuarioDto.name=createUsuarioDto.name.toLocaleLowerCase()
      createUsuarioDto.email=createUsuarioDto.email.toLocaleLowerCase()
      //inserccion en DB
      const usuario = await this.usuarioModel.create(createUsuarioDto);
      
      return usuario;
    
  } catch (error) {
      this.handleExceptions(error);
  }

  } 

  // findAll() {
  //   return this.usuarios;
  // }

  async findOne(id: string) {
    let usuario: Usuario;
    if(!isNaN(+id)) {
      usuario = await this.usuarioModel.findOne({no: id})
    }

    //MongoID
    if(!usuario && isValidObjectId(id)){
      usuario = await this.usuarioModel.findOne({_id: id});
    }
    //se puede hacer con else pero elegimos la facilidad de lectura
    //Name -> trim elimina los espacios adelante y atras
    if(!usuario){
      usuario=await this.usuarioModel.findOne({name: id.toLocaleLowerCase().trim()})
    }

    if(!usuario)
      throw new NotFoundException(`Usuario with id ${id} not found`);
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);
    try {
      if(updateUsuarioDto.name)
        updateUsuarioDto.name = updateUsuarioDto.name.toLocaleLowerCase();
  
      await usuario.updateOne(updateUsuarioDto);
  
      //con 3 punto expando todas las propiedades que tiene y sobre escribo con updateDto
      return {...usuario.toJSON(),...updateUsuarioDto};
      
    } catch (error) {
      this.handleExceptions(error);
    }
  }  
  

  private handleExceptions(error: any){
    if (error.code === 11000) {
      throw new BadRequestException(`Usuario exits in DB ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can not create usuario - check server logs`);
  }

  async remove(id: string) {

    //aca se haria dos consulta a las DB y se quiere evitar eso
    // const usuario = await this.findOne(id);
    // await usuario.deleteOne();

    // const usuario = await this.usuarioModel.findByIdAndDelete(id);

    const {deletedCount} = await this.usuarioModel.deleteOne({_id: id}); //si dejo many es igual a * y elimino toda la dataBase
    if(deletedCount===0)
      throw new BadRequestException(`Usuario with id ${id} not exist`);

    return;
    
    // this.usuarios = this.usuarios.filter(usuario => usuario.id!==id);
    
  }
}
