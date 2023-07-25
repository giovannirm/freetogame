import { IBaseDTO } from "@infrastructure/dtos/base.dto";

export interface IBase {
    id: number
}

export abstract class BaseEntity implements IBase {
    public id: number

    constructor() {
        this.id = Math.random()
    }

    public setEntityFromDTO(baseDTO: IBaseDTO): void {
        this.id = baseDTO.id
    }
}