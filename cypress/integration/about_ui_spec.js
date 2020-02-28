describe('About page', ()=> {
    it('Should load about page', ()=> {
        cy.visit('http://localhost:8002/todolist')
        cy.contains('Läs mer om sidan').click()
        cy.url().should('include', 'about')
        cy.contains('Denna sida har skapats av Nina')
    })
})