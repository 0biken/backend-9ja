import { Prisma } from "@prisma/client";
import { IsArray, IsDate, IsDefined, IsEmail, IsNotEmpty, IsString, IsStrongPassword, ValidateNested } from "class-validator";
import { AddressCreateDto } from "../../../../dtos/address-create.dto";
import { Type } from "class-transformer";

interface CustomerCreateInput extends Omit<Prisma.CustomerCreateInput, "phoneNumbers" | "addresses"> {
    phoneNumbers?: string[];
    addresses?: AddressCreateDto[];
}

export class CustomerRegisterRequestDto implements CustomerCreateInput {
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    declare email: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    declare password: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    declare firstName: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    declare lastName: string;

    @IsDate()
    dateOfBirth?: string | Date;

    @IsArray()
    @IsString({ each: true })
    phoneNumbers?: string[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddressCreateDto)
    addresses?: AddressCreateDto[];
}