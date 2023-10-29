//const listHelper = require('./utils/list_helper')
const noBlogList = []

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const listWithThreeBlogs = [
    {
        _id: '1',
        title: 'Bleh Blah 1',
        author: 'Edsandwich',
        url: 'http://www.bleh.blah/',
        likes: 5,
        __v: 0
    },
    {
        _id: '2',
        title: 'Howdy Hoe Neighbourino',
        author: 'Ned Flanders',
        url: 'http://www.nedflandersacademy.com/howdy_hoe_neighbourino_blog.html',
        likes: 2,
        __v: 0
    },        {
        _id: '3',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
    }
]

const maxLikes = (reigningBlog, currBlog) => {
    return reigningBlog.likes >= currBlog.likes ? reigningBlog : currBlog
}

const favouriteBlog = (blogs) => {
    var topBlog = blogs.reduce((reigningBlog, currBlog) => {
        return maxLikes(reigningBlog, currBlog)
    },[])
    return { 'title': topBlog.title, 'author': topBlog.author, 'likes': topBlog.likes }
}