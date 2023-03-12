describe('Blog ', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('login form is shown first', function () {
    cy.contains('Login')
  })


  describe('Login', function () {
    it('user cannot login with wrong password', function () {

      const user = {
        name: 'epic user',
        username: 'epictest',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)

      cy.get('#username').type('epictest')
      cy.get('#password').type('notpassword')
      cy.get('#login-button').click()

      cy.contains('Failed')
    })

    it('user can login', function () {

      const user = {
        name: 'epic user',
        username: 'epictest',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)

      cy.get('#username').type('epictest')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('epic user logged in')
    })
  })


  describe('When logged in', function () {

    beforeEach(function () {      
      const user = {
        name: 'epic user',
        username: 'epictest',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)    
      cy.get('#username').type('epictest')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      
    })

    it('A blog can be created', function () {
      cy.contains('new blog')
      cy.get('#showtoggle-button').click()
      cy.get('#addtitle').type('title!')
      cy.get('#addauthor').type('author!')
      cy.get('#addurl').type('url!')
      cy.get('#submitblog').click()
      cy.contains('title! author!')
    })

    it('A blog can be liked', function () {
      cy.contains('new blog')
      cy.get('#showtoggle-button').click()
      cy.get('#addtitle').type('title!')
      cy.get('#addauthor').type('author!')
      cy.get('#addurl').type('url!')
      cy.get('#submitblog').click()
      cy.contains('title! author!')

      cy.get('#openbloginfo').click()
      cy.get('#likeblogbutton').click()
      cy.contains('likes 1')
    })

    it('A blog can be deleted', function () {
      cy.contains('new blog')
      cy.get('#showtoggle-button').click()
      cy.get('#addtitle').type('title!')
      cy.get('#addauthor').type('author!')
      cy.get('#addurl').type('url!')
      cy.get('#submitblog').click()
      cy.contains('title! author!')

      cy.get('#openbloginfo').click()
      cy.get('#deleteblogbutton').click()
      cy.get('#openbloginfo').should('not.exist')
    })

    it('Cannnot delete blog by someone else', function () {
      cy.contains('new blog')
      cy.get('#showtoggle-button').click()
      cy.get('#addtitle').type('title!')
      cy.get('#addauthor').type('author!')
      cy.get('#addurl').type('url!')
      cy.get('#submitblog').click()
      cy.contains('title! author!')
      cy.get('#logoutbutton').click()

      const user2 = {
        name: 'epic user2',
        username: 'epictest2',
        password: 'password2'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user2)
      cy.get('#username').type('epictest2')
      cy.get('#password').type('password2')
      cy.get('#login-button').click()

      cy.get('#openbloginfo').click()
      cy.get('#deleteblogbutton').should('not.exist')
    })

    it('Blogs are ordered in order of likes', function () {
      cy.get('#showtoggle-button').click()
      cy.get('#addtitle').type('title!')
      cy.get('#addauthor').type('author!')
      cy.get('#addurl').type('url!')
      cy.get('#submitblog').click()

      cy.get('#addtitle').type('title?')
      cy.get('#addauthor').type('author?')
      cy.get('#addurl').type('url?')
      cy.get('#submitblog').click()

      cy.get('.blogcontainer').eq(0).should('contain', 'title!')
      cy.get('.blogcontainer').eq(1).should('contain', 'title?')

      cy.get('button').then(buttons => {
        console.log('number of buttons', buttons.length)
        cy.wrap(buttons[2]).click()
      })
      cy.get('#likeblogbutton').click()
      cy.get('.blogcontainer').eq(0).should('contain', 'title?')
      cy.get('.blogcontainer').eq(1).should('contain', 'title!')
    })

  })
})