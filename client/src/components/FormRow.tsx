import { ChangeEvent } from "react"

type PropType = {
    type: string
    name: string
    placeholder: string
    value: string
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    errorFields: string[]
}

const FormRow = ({
    type,
    name,
    placeholder,
    value,
    handleChange,
    errorFields,
}: PropType) => {
    return (
        <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            value={value}
            className={errorFields.includes(name) ? "errorField" : ""}
            onChange={handleChange}
        />
    )
}

export default FormRow
