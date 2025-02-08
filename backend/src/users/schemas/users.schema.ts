import { Document } from 'mongoose'
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true, index: true })
    email: string;

    @Prop({ required: true, index: true })
    name: string;

    @Prop({ required: true, index: true })
    surname: string;

    @Prop({ required: true })
    password: string;

    @Prop({enum: ['admin', 'user'], default: 'user', required: true})
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
