import { IsOptional, IsString, Matches } from "class-validator";
import { IsNotEmpty } from "class-validator";

export class CreateWorkspaceDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'Slug must contain only lowercase letters, numbers and hyphens'
    })
    slug: string;

}