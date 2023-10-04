import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CreateUserDto,LoginUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth, GetUser,RawHeaders } from './decorators';
import { User } from './entities/user.entity';
import { UserRolesGuard } from './guards/user-roles/user-roles.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { validRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')//el string me define el end point
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')//el string me define el end point
  loginUser(@Body() loginAuthDto: LoginUserDto) {
    return this.authService.login(loginAuthDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') userEmail:string,

    // @Req() request: Express.Request

    @RawHeaders() rawHeaders: string[], 

  ) {

    // console.log({user:request});
    

    return{
      ok:true,
      message:'hola mundo',
      user: user, //es lo musmo que dejar user solo una vez 
      userEmail,  //es lo mismo que el de arriba
      rawHeaders,
    }
  }

  @Get('private2')
  // @SetMetadata('roles',['admin','super-user']) //el problema con este decorador es que esta sometido a errores del programador
  @RoleProtected(validRoles.superUser,validRoles.admin) //todos los definidos aca pueden ingresar al endPoint
  @UseGuards(AuthGuard(),UserRolesGuard)
  privateRoute2(
    @GetUser() user: User,
  ){
    return{
      ok:true,
      user
    }
  }

@Get('private3')
@Auth(validRoles.admin)
privateRoute3(
    @GetUser() user: User,
  ){
  return{
    ok:true,
    user
  }
}



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateUserDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  @Auth(validRoles.admin)
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
