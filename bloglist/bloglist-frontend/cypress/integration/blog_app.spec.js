describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'vudinhhung',
      name: 'Testing',
      password: 'p4ssw0rd'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown by default', function() {
    cy.get('#login_div').contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username_input').type('vudinhhung')
      cy.get('#password_input').type('p4ssw0rd')
      cy.get('#login_button').click()

      cy.contains('Testing logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username_input').type('vudinhhung')
      cy.get('#password_input').type('12345abcde')
      cy.get('#login_button').click()

      cy.contains('invalid credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'vudinhhung', password: 'p4ssw0rd' })
    })

    it('a blog can be created', function() {
      cy.contains('add blog').click()
      cy.get('#blog_title_input').type('new blog')
      cy.get('#blog_author_input').type('tester')
      cy.get('#blog_url_input').type('new url')
      cy.get('#blog_submit_button').click()
      cy.contains('a new blog')
      cy.contains('new blog')
    })

    describe('When a few blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'blog1', author: 'tester', url: 'none' })
        cy.createBlog({ title: 'blog2', author: 'tester', url: 'none' })
        cy.createBlog({ title: 'blog3', author: 'tester', url: 'none' })
      })

      it('they can be liked', function() {
        cy.contains('blog2').contains('view').click()
        cy.contains('blog2').parent().contains('like').click()
        cy.wait(100)
        cy.contains('blog2').parent().contains('like').click()
        cy.wait(100)
        cy.contains('blog2').parent().contains('like').click()
        cy.wait(100)
        cy.contains('blog2').parent().contains('like').click()
        cy.wait(100)
        cy.contains('blog2').parent().contains('4')
      })

      it('they can be deleted by the user who created them', function() {
        cy.contains('blog2').contains('view').click()
        cy.contains('blog2').parent().contains('remove').click()
          .then(function() {
            cy.contains('blog2').should('not.exist')
          })
      })

      it('they are sorted by number of likes', function() {
        cy.contains('blog1').contains('view').click()
        cy.wait(100)
        cy.contains('blog1').parent().contains('like').click()
        cy.wait(100)
        cy.contains('blog1').parent().contains('like').click()
        cy.wait(100)
        cy.contains('blog1').parent().contains('like').click()
        cy.wait(100)
        cy.contains('blog1').parent().contains('like').click()

        cy.contains('blog2').contains('view').click()
        cy.wait(100)
        cy.contains('blog2').parent().contains('like').click()
        cy.wait(100)
        cy.contains('blog2').parent().contains('like').click()
        cy.wait(100)
        cy.contains('blog2').parent().contains('like').click()
        cy.wait(100)
        cy.contains('blog2').parent().contains('like').click()
        cy.wait(100)
        cy.contains('blog2').parent().contains('like').click()

        cy.contains('blog3').contains('view').click()
        cy.wait(100)
        cy.contains('blog3').parent().contains('like').click()
        cy.wait(100)
        cy.contains('blog3').parent().contains('like').click()
        cy.wait(100)
        cy.contains('blog3').parent().contains('like').click()
        cy.wait(200)

        cy.get('.blog_likes').should('have.length', 3)
          .then($els => {
            return (
              Cypress.$.makeArray($els).map(el => el.innerText[0])
            )
          })
          .should('deep.equal', ['5', '4', '3'])
      })
    })
  })
})
