import { JwtModuleOptions, JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'supersecret',
  expiresIn: '1d', // token muddati
};

export const JwtConfig: JwtModuleAsyncOptions = {
  useFactory: async (): Promise<JwtModuleOptions> => ({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: jwtConstants.expiresIn },
  }),
};
