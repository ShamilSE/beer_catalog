function allFieldsFilled(fields) {
    for (let index = 0; index < fields.length; index++) {
        if (fields[index] === undefined)
            return false
    }
    return true
}

export function formValidation(fields) {
    return allFieldsFilled(fields)
}

export function fullNameValidation(text) {
    return (text && text.length > 0)
}

export function passwordValidation(password) {
    return (password && password.length >= 6)
}