import { CustomValidationRuleParams } from '_validations'

import { GeneralOptionBuilder } from './general'

type Properties = {
    label: string | undefined
    default: string | Date | number | undefined
    min: string | Date | number | undefined
    max: string | Date | number | undefined
    pattern: string | undefined
    disable: boolean | undefined
    nullable: boolean | undefined
    readonly: boolean | undefined
    placeholder: string | undefined
    helpText: string | undefined
}

const getInitialProperties: () => Properties = () => ({
    label: undefined,
    default: undefined,
    min: undefined,
    max: undefined,
    pattern: undefined,
    disable: undefined,
    nullable: undefined,
    readonly: undefined,
    placeholder: undefined,
    helpText: undefined,
})

export class DateBuilder<Value = Properties['default']> extends GeneralOptionBuilder<Value, Properties> {
    constructor() {
        super({ type: 'date', properties: getInitialProperties() })
    }

    public label(value: Properties['label']) {
        this.properties.label = value
        return this
    }

    public default(value: Properties['default']) {
        this.properties.default = value
        return this
    }

    public min(value: Properties['min']) {
        this.properties.min = value
        return this
    }

    public max(value: Properties['max']) {
        this.properties.max = value
        return this
    }

    public pattern(value: Properties['pattern']) {
        this.properties.pattern = value
        return this
    }

    public disable() {
        this.properties.disable = true
        return this
    }

    public nullable() {
        this.properties.nullable = true
        return this as DateBuilder<Value | null>
    }

    public readonly(value: Properties['readonly']) {
        this.properties.readonly = value
        return this
    }

    public placeholder(value: Properties['placeholder']) {
        this.properties.placeholder = value
        return this
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
        return this as DateBuilder<Exclude<Value, undefined>>
    }

    public minDate(minDate: NonNullable<Properties['min']>) {
        this.validations.push({ name: 'minDate', params: { minDate } })
        return this
    }

    public maxDate(maxDate: NonNullable<Properties['max']>) {
        this.validations.push({ name: 'maxDate', params: { maxDate } })
        return this
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

export const date = () => new DateBuilder()
