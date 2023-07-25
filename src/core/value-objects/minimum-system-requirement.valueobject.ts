export interface IMinimumSystemRequirement {
    readonly os        : string
    readonly processor : string
    readonly memory    : string
    readonly graphics  : string
    readonly storage   : string
}

export class MinimumSystemRequirement implements IMinimumSystemRequirement {
    public readonly os        : string
    public readonly processor : string
    public readonly memory    : string
    public readonly graphics  : string
    public readonly storage   : string

    constructor(os: string, processor: string, memory: string, graphics: string, storage: string) {
        this.os        = os
        this.processor = processor
        this.memory    = memory
        this.graphics  = graphics
        this.storage   = storage
    }
}