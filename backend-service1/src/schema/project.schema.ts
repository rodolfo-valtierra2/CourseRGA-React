import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"

@Schema() 
export class Project {
    @Prop()
    name: string;
    @Prop()
    description: string;
    @Prop()
    budget: number;
    @Prop()
    active: boolean;
    @Prop()
    imageUrl: string;
    @Prop()
    signed: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);