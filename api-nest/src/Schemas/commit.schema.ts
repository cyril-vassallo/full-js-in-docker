import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { Task } from './task.schema';


export type CommitDocument = Commit & Document

@Schema()
export class Commit {
    
    @Prop({ required: true })
    hash: string;

    @Prop({ required: true })
    Url: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Task'  })
    task: Task;

}

export const CommitSchema = SchemaFactory.createForClass(Commit);

