import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type GithubDocument = Github & Document

@Schema()
export class Github {
    
    @Prop({type: String, required: true})
    owner: string;

    @Prop({type: String, required: true})
    repository: string;

    @Prop({type: String, required: true})
    branch: string;

    @Prop({type: Boolean, required: true})
    enabled: boolean; 

    @Prop({type: String, required: true})
    token: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

}

export const GithubSchema = SchemaFactory.createForClass(Github);

