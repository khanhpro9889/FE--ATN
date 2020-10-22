export function validateEmail(value) {
    return /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/i.test(value)
        ? true
        : false
}

export function validatePhone(value) {
    if(value === '') {
        return true;
    }
    return /((09|03|07|08|05)+([0-9]{8})\b)/gi.test(value)
        ? true
        : false
}

export function validateNumber(value) {
    return /^[1-9][0-9]*$/i.test(value)
        ? true
        : false
}