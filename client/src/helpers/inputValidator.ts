type FormData = {
    email: string
    password: string
    username?: string
    confirmPassword?: string
}

export const inputValidator = (formData: FormData): string[] => {
    let emptyFields: string[] = []
    Object.keys(formData).forEach((key) => {
        const val = formData[key as keyof typeof formData]
        if (val !== undefined && val.trim() === "") {
            emptyFields.push(key)
        }
    })

    return emptyFields
}
