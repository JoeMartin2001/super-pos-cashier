export function get_time_diff(dt2) {
    const dt1 = new Date()
    let diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));     
}

export const parseTime = (d) => `${new Date(d).getHours()}:${new Date(d).getMinutes()}`

export const getTotalPrice = (list) => {
    return list.reduce((accumulator, item) => accumulator + (parseInt(item.item.price) * parseInt(item.count)), 0)
}

export function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}