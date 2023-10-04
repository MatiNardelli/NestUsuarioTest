import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator(
    (data:string, ctx:ExecutionContext) => {
        
        
        //console.log(ctx);
        const req = ctx.switchToHttp().getRequest();
        const user = req.user;

        if(!user)
            throw new InternalServerErrorException('user not found (request)');

        return (!data) ? user : data;
    }
);
