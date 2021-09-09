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

const authorBlogs = (array, string) => {
    if(array.length == 1 && array[0].author === string){
        return 1
    }
    if(array.length == 1 && array[0].author != string){
        return 0
    }
    if(array[0].author === string){
        return 1 + authorBlogs(array.slice(1), string)
    }else{
        return 0 + authorBlogs(array.slice(1), string)
    }
}

const authorLikes = (array, string) => {
    if(array.length == 1 && array[0].author === string){
        return array[0].likes
    }
    if(array.length == 1 && array[0].author != string){
        return 0
    }
    if(array[0].author === string){
        return array[0].likes + authorLikes(array.slice(1), string)
    }else{
        return 0 + authorLikes(array.slice(1), string)
    }
}

const mostBlogsAuthor  = (array) => {
    let maxBlogNumber = 0
    let maxIndex = 0
    array.forEach((element, index) => {
      let blognumber = authorBlogs(array, element.author)
      if(blognumber > maxBlogNumber){
        maxIndex = index
        maxBlogNumber = blognumber
      }
    })

    return({
        author: array[maxIndex].author,
        blogs: maxBlogNumber
    })
}

const mostLikeAuthor = (array) => {
    let maxLikeNumber = 0
    let maxIndex = 0
    array.forEach((element, index) => {
      let likenumber = authorLikes(array, element.author)
      if(likenumber > maxLikeNumber){
        maxIndex = index
        maxLikeNumber = likenumber
      }
    })

    return({
        author: array[maxIndex].author,
        likes: maxLikeNumber
    })
}

module.exports = {
    dummy,
    likeSum,
    favoriteBlog,
    mostBlogsAuthor,
    mostLikeAuthor
}