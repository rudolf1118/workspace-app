import { Document } from 'mongoose'
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Workspace extends Document {
    @Prop({ required: true, index: true })
    name: string;

    @Prop({ required: true, index: true })
    userId: string;

    @Prop({ required: true, default: Date.now() })
    createdAt: Date;

    @Prop({ required: true })
    slug: string;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
