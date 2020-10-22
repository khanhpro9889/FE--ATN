export const parseDate = (outputDate) => {
    const date = new Date(outputDate);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}