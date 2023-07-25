export interface IBase {
    readonly id: number
}

export abstract class BaseValueObject implements IBase {
    public readonly id: number

    constructor(id: number) {
        this.id = id
    }
}