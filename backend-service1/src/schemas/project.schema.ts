import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"

export type ProjectDocument = Project & Document; 

@Schema() 
export class Project {
    @Prop()
    id:string;
    @Prop()
    name: string;
    @Prop()
    description: string;
    @Prop()
    budget: number;
    @Prop()
    isActive: boolean;
    @Prop()
    imageUrl: string;
    @Prop()
    signed_at: string;
    @Prop()
    typeContractId: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);