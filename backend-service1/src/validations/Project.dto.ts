import { IsBoolean, IsDecimal, IsNotEmpty, isNumber, IsString, Min, MinLength } from "class-validator";

export class ProjectDto {
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    readonly name:string;

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    readonly description: string;

    @IsDecimal()
    readonly budget: number;
}