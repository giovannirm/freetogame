import { IBaseDTO } from "./base.dto"

interface IMinimunSystemRequirementsDTO {
    os        : string
    processor : string
    memory    : string
    graphics  : string
    storage   : string
}

interface IScreenshotDTO extends IBaseDTO {
    image : string
}

export interface IGameDTO extends IBaseDTO {
    title                        : string
    thumbnail                    : string
    status?                      : string
    short_description            : string
    description?                 : string
    game_url                     : string
    genre                        : string
    platform                     : string
    publisher                    : string
    developer                    : string
    release_date                 : Date
    freetogame_profile_url       : string
    minimum_system_requirements? : IMinimunSystemRequirementsDTO
    screenshots?                 : IScreenshotDTO[]
}

export interface IErrorDTO {
    status         : number
    status_message : string
}