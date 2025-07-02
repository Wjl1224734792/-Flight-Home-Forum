function formatDate(date) {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = d.getMonth() + 1 // 月份从 0 开始
    const day = d.getDate()
    return `${year}.${month}.${day}`
}

export { formatDate }