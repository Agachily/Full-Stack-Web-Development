const dummy = (blogs) => {
    return 1
}

const likeSum = (array) => {
    let sum = 0
    array.forEach(element => {
        sum = sum + element.likes
    })
    return sum
}

const favoriteBlog = (array) => {
    let max = 0
    let maxIndex = 0
    array.forEach((element,index) => {
        if (element.likes > max){
            max = element.likes
            maxIndex = index
        }
    })
    return({
      title: array[maxIndex].title,
      author: array[maxIndex].author,
      likes: array[maxIndex].likes
    })
}

module.exports = {
    dummy,
    likeSum,
    favoriteBlog
}