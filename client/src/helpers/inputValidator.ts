type FormInputData = {
    username: string
    email: string
    password: string
    confirmPassword: string
}

const inputValidator = (
    formData: FormInputData,
    formType: "login" | "register"
): string[] => {
    // @ts-ignore
    if (formType !== "login" || formType !== "register") {
        throw new Error("Please provide correct form type")
    }
    if (formType === "login") {
    }

    return [""]
}
