import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Commit } from './commit.schema';


export type TaskDocument = Task & Document

@Schema()
export class Task {
    
    @Prop({ required: true })
    id: number;

    @Prop({ required: true })
    userId: number;

    @Prop({ required: true })
    date: string;

    @Prop([String])
    list: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'  })
    user: User;

    @Prop({raw: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Commit' }]})
    commit: Commit[];

}

export const TaskSchema = SchemaFactory.createForClass(Task);

