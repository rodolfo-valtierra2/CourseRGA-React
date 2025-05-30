import {IsNumber, IsNotEmpty, IsString, MinLength } from "class-validator";

export class ProjectDto {
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    readonly name:string;

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    readonly budget: number;
}