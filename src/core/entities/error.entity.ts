import { IErrorDTO } from "@infrastructure/dtos/game.dto"

export interface IError {
    status         : number
    statusMessage  : string
}

export class ErrorEntity implements IError {
    public status         : number
    public statusMessage  : string

    constructor() {
        this.status         = 1
        this.statusMessage  = ''
    }

    public setEntityFromDTO(errorDTO: IErrorDTO): void {
        this.status         = errorDTO.status
        this.statusMessage  = errorDTO.status_message
    }
}