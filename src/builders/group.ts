import { MakeKeysOptional, SomeObject, Undefinable, Unwrap } from '@form-crafter/utils'

import { GroupStruct, GroupStructFromOutput, OutputFromGroupStruct } from '_types'

import { GeneralOptionBuilder } from './general'

type Properties = {
    label: string | undefined
}

const getInitialProperties = (): Properties => ({
    label: undefined,
})

export class GroupBuilder<Output extends Undefinable<SomeObject> = SomeObject> extends GeneralOptionBuilder<MakeKeysOptional<Output>, Properties> {
    private struct: GroupStructFromOutput<NonNullable<Output>> = Object.create(null)

    constructor(struct: GroupStructFromOutput<Output>) {
        super({ type: 'group', properties: getInitialProperties() })
        this.setStruct(struct)
    }

    public label(value: Properties['label']) {
        this.properties.label = value
        return this
    }

    public hideIf() {
        this.relations.push({ name: 'hideIf' })
        return this
    }

    private setStruct<T extends Undefinable<Output>>(struct: GroupStructFromOutput<T>) {
        this.struct = struct as GroupStructFromOutput<NonNullable<Output>>
    }

    protected cast() {
        console.log(this.struct)
    }
}

export const group = <T extends GroupStruct>(struct: T) => {
    type Output = Unwrap<OutputFromGroupStruct<T>>

    return new GroupBuilder<Output>(struct as GroupStructFromOutput<Output>)
}
