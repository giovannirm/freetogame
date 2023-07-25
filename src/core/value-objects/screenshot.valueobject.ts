import { BaseValueObject, IBase } from "./base.valueobject"


export interface IScreenshot extends IBase {
    readonly image: string
}

export class Screenshot extends BaseValueObject implements IScreenshot {
    public readonly image: string

    constructor(id: number, image: string) {
        super(id)
        this.image = image
    }
}