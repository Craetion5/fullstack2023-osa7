import { useState } from 'react'

const BlogForm = ({ handleNewBlog }) => {

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleNewBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: 0,
      user: null
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          id='addtitle'
          type="text"
          value={blogTitle}
          name="title"
          onChange={event => setBlogTitle(event.target.value)}
        />
      </div>
      <div>
        author
        <input
          id='addauthor'
          type="text"
          value={blogAuthor}
          name="author"
          onChange={event => setBlogAuthor(event.target.value)}
        />
      </div>
      <div>
        url
        <input
          id='addurl'
          type="text"
          value={blogUrl}
          name="url"
          onChange={event => setBlogUrl(event.target.value)}
        />
      </div>
      <button id='submitblog' type="submit">create</button>
    </form>
  )
}

export default BlogForm