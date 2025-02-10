import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./schemas/users.schema";
import {Model} from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,) {
    }

    async createUser (createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userModel.findOne({ email: createUserDto.email } );
        if (user) {
            throw new ConflictException('User already exists');
        }
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async findUser (email:string) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new NotFoundException();
        }
        return user;
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException(id);
        }
        return user;
    }

    async verifyEmail (input: string) {
        const user = await this.userModel.findOne({ email: input });
        if(user) {
            return {
                statusCode: 400,
                message: "Email is already used"
            }
        }
        return {
            statusCode: 200,
            message: "Email is not used"
        }
    }
}
