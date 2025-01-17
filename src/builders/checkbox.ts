import { Maybe, NonUndefinable, Nullable, Undefinable } from '@form-crafter/utils'

import { CustomValidationRuleParams } from '_validations'

import { GeneralOptionBuilder } from './general'

type Properties = {
    label: Undefinable<string>
    checked: Undefinable<boolean>
    disable: Undefinable<boolean>
    nullable: Undefinable<boolean>
    readonly: Undefinable<boolean>
    helpText: Undefinable<string>
}

const getInitialProperties = (): Properties => ({
    label: undefined,
    checked: undefined,
    disable: undefined,
    nullable: undefined,
    readonly: undefined,
    helpText: undefined,
})

export class CheckboxBuilder<Output extends Maybe<Properties['checked']> = Properties['checked']> extends GeneralOptionBuilder<Output, Properties> {
    constructor() {
        super({ type: 'checkbox', properties: getInitialProperties() })
    }

    public label(value: Properties['label']) {
        this.properties.label = value
        return this
    }

    public checked(value: Properties['checked']) {
        this.properties.checked = value
        return this
    }

    public disable(value: Properties['disable']) {
        this.properties.disable = value
        return this
    }

    public readonly(value: Properties['readonly']) {
        this.properties.readonly = value
        return this
    }

    public nullable() {
        this.properties.nullable = true
        return this as CheckboxBuilder<Nullable<Output>>
    }

    public helpText(value: Properties['helpText']) {
        this.properties.helpText = value
        return this
    }

    public customValidation(params: CustomValidationRuleParams) {
        this.validations.push(params)
        return this
    }

    public required() {
        this.validations.push({ name: 'required' })
        return this as unknown as CheckboxBuilder<NonUndefinable<Output>>
    }

    public hideIf() {
        this.relations.push({ name: 'hideIf' })
        return this
    }

    public disableIf() {
        this.relations.push({ name: 'disableIf' })
        return this
    }
}

export const checkbox = () => new CheckboxBuilder()
