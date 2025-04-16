import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  // Agrega validación
  if (!user) {
    throw new Error('Usuario no encontrado en la solicitud');
  }

  return data ? user[data] : user;
});