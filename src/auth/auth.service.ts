import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import  * as bcrypt from "bcrypt";


import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { LoginUserDto } from './dto';


@Injectable()
export class AuthService {

  //es para usar mi modelo/entity
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ){}

  async create(createAuthDto: CreateUserDto) {
    try {

      const {password,...userData} = createAuthDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password,10),  //con esta funcion siempre genera un id diferente -> concatena un string a esa contraseña. El 10 es para la cantidad de vuelta
      });
      await this.userRepository.save(user);
      delete user.password;
      
      return {
        ...user,
        token: this.getJwtToken({id:user.id})
      };

    } catch (error) {
      this.handleDBErrors(error);
    }
  
  }

  async login(loginUser:LoginUserDto){
    const {password, email}=loginUser;
    const user = await this.userRepository.findOne({
      where:{email},
      select:{email:true,password:true,id:true}
    });

    if(!user)
      throw new UnauthorizedException('Credentials are not valid (email).');

    if( !bcrypt.compareSync(password,user.password))
      throw new UnauthorizedException('Credential are not valid (password).');


    return {
      ...user,
      token: this.getJwtToken({id:user.id})
    };
      

  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  async remove(id: string) {
    const statu = await this.userRepository.findOneBy({id:id});
    
    statu.status=false;
    await this.userRepository.save(statu);

    return `user, ${statu.fullName}, with id (${id}) was eliminated`; 
  }

  //private porque no se usa en otro servicio solo este
  private getJwtToken (payload: JwtPayload){

    const token = this.jwtService.sign(payload);
    return token;
  }

  //never es porque jamas retorna un valor
  private handleDBErrors(error:any): never{
    if (error.code === '23505'){
      throw new BadRequestException(error.detail);
    }
    console.log(error);
    throw new InternalServerErrorException(`please, check server logs`);
  }
}
