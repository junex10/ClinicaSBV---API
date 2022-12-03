import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWTAuth, Constants } from 'src/utils';

@Injectable()
export class SecretaryGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const auth = context.getArgs()[0]?.headers?.authorization?.replace('Bearer ', '');
    const errorMessage = 'Acceso denegado, no hay suficientes permisos para realizar esta acción';
    if (auth !== '' && auth !== undefined) {
      const key = JWTAuth.readToken(auth)?.key;

      const main = Constants.TOKENS.find(x => x.KEY === key);
      if (main === undefined) {
        throw new ForbiddenException(errorMessage);
      } else {
        if (
            (main.LEVEL !== Constants.LEVELS.SECRETARY) && 
            (main.LEVEL !== Constants.LEVELS.ADMIN)
        ) {
          throw new ForbiddenException(errorMessage);
        }
      }
    } else {
      throw new ForbiddenException(errorMessage);
    }
    return true;
  }
}