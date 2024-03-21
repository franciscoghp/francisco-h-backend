import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: "jwt",
        }),
        JwtModule.registerAsync({
            useFactory: async () => {
                return {
                    secret: process.env.AUTH_TOKEN_SECRET,
                    signOptions: {
                        expiresIn: process.env.AUTH_TOKEN_EXPIRY,
                    },
                };
            },
        }),
    ],
    providers: [AuthService],
    exports: [PassportModule, AuthService],
    controllers: [AuthController],
})
export class AuthModule {}