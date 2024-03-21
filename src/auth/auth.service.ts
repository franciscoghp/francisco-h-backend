import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
// import { RegisterAuthDto } from "./dto/register-auth.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { userData } from "src/database/MOCK_DATA-USERS";
import { User } from "src/database/entitys/User";
import { RegisterAuthDto } from "./dto/register-auth.dto";

@Injectable()
export class AuthService {
    public userModel = userData;
    constructor(
        private jwtService: JwtService,
    ) {}

    public async login(userLoginBody: LoginAuthDto) {
        const userExist = this.userModel.find( (user: User) => userLoginBody.username == user.username);
        if (!userExist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

        const { id, name, surname, username, role, avatar } = userExist
        const payload = { id, name, surname, username, role, avatar } ;

        const token = this.jwtService.sign(payload);

        const data = {
          token,
          user: userExist,
        };    
        return data;
      }

    public async register(userBody: RegisterAuthDto) {
        const newUser = new User();
        const maxId = this.userModel.reduce((max, user) => (user.id > max ? user.id : max), -Infinity);

        newUser.id = maxId + 1;
        newUser.name = userBody.name;
        newUser.surname = userBody.surname;
        newUser.username = userBody.username;
        newUser.avatar = userBody.avatar;

        this.userModel.push(newUser);
    
        return newUser;
      }
}
