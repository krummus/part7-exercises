const Blog = ({ blog }) => {

  const hideWhenVisible = { 
    paddingTop: 10,
    paddingLeft: 2,
    fontFamily: 'Arial' 
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <label key={blog.title}>{blog.title} - {blog.author}  </label>
      </div>
    </div>
 
  )
}

export default Blog

