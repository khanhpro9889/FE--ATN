export const parseDate = (outputDate) => {
    const date = new Date(outputDate);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}