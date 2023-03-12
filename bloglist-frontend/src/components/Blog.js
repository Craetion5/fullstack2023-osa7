import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleUpdateBlog, handleDeleteBlog, user }) => {

  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateBlog = () => {
    handleUpdateBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user
    })
  }

  const deleteBlog = () => {
    handleDeleteBlog(blog.id, blog.title)
  }

  return (
    <div className="blogcontainer" style={blogStyle}>
      {blog.title} {blog.author} <button id='openbloginfo' onClick={() => setExpanded(!expanded)}>{!expanded ? 'view' : 'hide'}</button>
      {expanded && <div>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>likes {blog.likes} <button id='likeblogbutton' onClick={() => updateBlog()}>like</button></p>
        <p>{blog.user.username}</p>
        {(user.username === blog.user.username) &&
          <div>
            <button id='deleteblogbutton' onClick={() => deleteBlog()}>delete</button>
          </div>
        }
      </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleUpdateBlog: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog