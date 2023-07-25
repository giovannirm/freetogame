import { IBaseDTO } from "@infrastructure/dtos/base.dto"
import { IGameDTO } from "@infrastructure/dtos/game.dto"
import { BaseEntity, IBase } from "./base.entity"
import { Screenshot } from "@core/value-objects/screenshot.valueobject"
import { MinimumSystemRequirement } from "@core/value-objects/minimum-system-requirement.valueobject"

export interface IGame extends IBase {
    title: string
    thumbnail: string
    status?: string
    shortDescription: string
    description?: string
    gameUrl: string
    genre: string
    platform: string
    publisher: string
    developer: string
    releaseDate: Date
    freetogameProfileUrl: string
    minimumSystemRequirements?: MinimumSystemRequirement
    screenshots?: Screenshot[]
}

export class GameEntity extends BaseEntity implements IGame {
    public title: string
    public thumbnail: string
    public status?: string
    public shortDescription: string
    public description?: string
    public gameUrl: string
    public genre: string
    public platform: string
    public publisher: string
    public developer: string
    public releaseDate: Date
    public freetogameProfileUrl: string
    public minimumSystemRequirements?: MinimumSystemRequirement
    public screenshots?: Screenshot[]

    constructor() {
        super()
        this.title                     = ''
        this.thumbnail                 = ''
        this.status                    = ''
        this.shortDescription          = ''
        this.description               = ''
        this.gameUrl                   = ''
        this.genre                     = ''
        this.platform                  = ''
        this.publisher                 = ''
        this.developer                 = ''
        this.releaseDate               = new Date()
        this.freetogameProfileUrl      = ''
        this.minimumSystemRequirements = new MinimumSystemRequirement('', '', '', '', '')
        this.screenshots               = []
    }

    public override setEntityFromDTO(gameDTO: IGameDTO): void {
        super.setEntityFromDTO({ id: gameDTO.id } as IBaseDTO)
        this.title                     = gameDTO.title
        this.thumbnail                 = gameDTO.thumbnail
        this.status                    = gameDTO.status
        this.shortDescription          = gameDTO.short_description
        this.description               = gameDTO.description
        this.gameUrl                   = gameDTO.game_url
        this.genre                     = gameDTO.genre
        this.platform                  = gameDTO.platform
        this.publisher                 = gameDTO.publisher
        this.developer                 = gameDTO.developer
        this.releaseDate               = new Date(gameDTO.release_date)
        this.freetogameProfileUrl      = gameDTO.freetogame_profile_url
        this.minimumSystemRequirements = gameDTO.minimum_system_requirements ? new MinimumSystemRequirement(
            gameDTO.minimum_system_requirements.os,
            gameDTO.minimum_system_requirements.processor,
            gameDTO.minimum_system_requirements.memory,
            gameDTO.minimum_system_requirements.graphics,
            gameDTO.minimum_system_requirements.storage
        ) : undefined
        this.screenshots               = gameDTO.screenshots?.map(
            (screenshotDTO) => new Screenshot(screenshotDTO.id, screenshotDTO.image)
        )
    }
}