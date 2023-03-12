import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import AlertMessage from './components/AlertMessage'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [alertMessageContent, setAlertMessageContent] = useState(null)
  const [alertMessageType, setAlertMessageType] = useState('alert')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
    userService.getAll().then(users =>
      setUsers(users)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    triggerAlert(`Logged out from ${user.username}`, 'alert')
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      triggerAlert(`Logged in as ${user.username}`, 'alert')
    } catch (exception) {
      triggerAlert('Failed to login', 'error')
    }
  }

  const handleNewBlog = async (blogObject) => {
    blogObject.user = user
    try {
      const response = await blogService.create(blogObject)
      response.user = blogObject.user
      setBlogs(blogs.concat(response))
      triggerAlert(`Added ${blogObject.title}.`, 'alert')
      userService.getAll().then(users =>
        setUsers(users)
      )
    } catch (exception) {
      triggerAlert('Failed to add a new blog', 'error')
    }
  }

  const handleUpdateBlog = async (id, blogObject) => {
    try {
      const response = await blogService.update(id, blogObject)
      response.user = blogObject.user
      setBlogs(blogs.map(b => b.title !== blogObject.title ? b : response))
      triggerAlert(`Updated ${blogObject.title}.`, 'alert')
    } catch (exception) {
      triggerAlert('Failed to update blog', 'error')
    }
  }

  const handleDeleteBlog = async (id, title) => {
    if (window.confirm(`Delete ${title}?`)) {
      try {
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter(b => b.id !== id))
        triggerAlert(`Deleted ${title}.`, 'alert')
      } catch (exception) {
        triggerAlert(`Failed to delete ${title}`, 'error')
      }
    }
  }

  const loginForm = () => (

    <div>

      <h2>Login</h2>
      <AlertMessage text={alertMessageContent} style={alertMessageType} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <AlertMessage text={alertMessageContent} style={alertMessageType} />
      {blogs
        .sort((a, b) => a.likes > b.likes ? -1 : 1)
        .map(blog =>
          <Blog key={blog.id} blog={blog} handleUpdateBlog={handleUpdateBlog} handleDeleteBlog={handleDeleteBlog} user={user} />
        )}
      <br></br>


      <Togglable buttonLabel="new blog">
        <BlogForm handleNewBlog={handleNewBlog} />
      </Togglable>
    </div>
  )

  const usersForm = () => (
    <div>
      <h2>users</h2>
      <AlertMessage text={alertMessageContent} style={alertMessageType} />
      {users
        .sort((a, b) => a.blogs.length > b.blogs.length ? -1 : 1)
        .map(user =>
          <div key={user.id}>
            {user.username} has written {user.blogs.length} blogs
          </div>
        )}
    </div>
  )
  const triggerAlert = (messageInAlert, typeOfAlert) => {
    setAlertMessageType(typeOfAlert)
    setAlertMessageContent(messageInAlert)
    setTimeout(() => {
      setAlertMessageContent(null)
    }, 4000)
  }

  return (
    <Router>
      <div>
        {!user && loginForm()}
        {user &&
          <div>
            <p>{user.name} logged in</p>
            <button id='logoutbutton' onClick={handleLogout}>
              logout
            </button>
            <br /><br />
            <div>
              <Link to="/">blogs</Link>&nbsp;
              <Link to="/users">users</Link>
            </div>

            <Routes>
              <Route path="/" element={blogForm()} />
              <Route path="/users" element={usersForm()} />
            </Routes>

          </div>
        }
      </div>
    </Router>
  )
}

export default App