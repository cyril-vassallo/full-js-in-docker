import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { CommitInterface } from '../Interfaces/interfaces';



export type TaskDocument = Task & Document

@Schema()
export class Task {
    

    @Prop({type: String,  required: true })
    date: string;

    @Prop({type: [String]})
    list: string[];

    @Prop(raw([{
        hash: {type: String},
        url: {type: String}
    }]))
    commits: CommitInterface[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

}

export const TaskSchema = SchemaFactory.createForClass(Task);

