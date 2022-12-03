import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWTAuth, Constants } from 'src/utils';

@Injectable()
export class GeneralGuard implements CanActivate {
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
            (main.LEVEL !== Constants.LEVELS.PATIENT) && 
            (main.LEVEL !== Constants.LEVELS.ADMIN) && 
            (main.LEVEL !== Constants.LEVELS.BOSS) &&
            (main.LEVEL !== Constants.LEVELS.DOCTOR) && 
            (main.LEVEL !== Constants.LEVELS.SECRETARY)
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