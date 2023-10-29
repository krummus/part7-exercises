const dummy = (blogs) => {
    if (blogs === blogs) {
        return Number(1)
    }
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes,0)
}

const maxLikes = (reigningBlog, currBlog) => {
    return reigningBlog.likes >= currBlog.likes ? reigningBlog : currBlog
}

const favouriteBlog = (blogs) => {
    var topBlog = blogs.reduce((reigningBlog, currBlog) => {
        return maxLikes(reigningBlog, currBlog)
    },[])
    return { 'title': topBlog.title, 'author': topBlog.author, 'likes': topBlog.likes }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}