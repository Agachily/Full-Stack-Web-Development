const dummy = (blogs) => {
    return 1
}

const likeSum = (array) => {
    let sum = 0
    array.forEach(element => {
        sum = sum + element.likes
    });
    return sum
}

module.exports = {
    dummy,
    likeSum
}