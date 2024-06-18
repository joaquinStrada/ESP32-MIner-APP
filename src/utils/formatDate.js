const formatDate = date => {
    if (!date) return ''

    const objDate = new Date(date)

    return `${formatNumber(objDate.getDate())}/${formatNumber(objDate.getMonth() + 1)}/${objDate.getFullYear()} ${formatNumber(objDate.getHours())}:${formatNumber(objDate.getMinutes())}:${formatNumber(objDate.getSeconds())}`
}

const formatNumber = number => number < 10 ? `0${number}` : number

export default formatDate