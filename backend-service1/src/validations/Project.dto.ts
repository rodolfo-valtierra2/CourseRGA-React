import { IsBoolean, IsNotEmpty, isNumber, IsString, Min, MinLength } from "class-validator";

export class ProjectDto {
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    readonly name:string;

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    readonly description: string;

    @Min(1)
    readonly budget: number;

    readonly typeSignId: number;
    readonly signed_at: string;
    readonly imageUrl: string;
}