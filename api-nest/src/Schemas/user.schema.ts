import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";


export type UserDocument = User & Document

@Schema()
export class User {
    
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    job: string;

    @Prop()
    description: string;

    @Prop()
    photo: string;

}

export const UserSchema = SchemaFactory.createForClass(User);



