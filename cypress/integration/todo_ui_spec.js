// Här skriver vi våra UI tester

// mocha syntax
// Valfri rubrik som beskriver att detta är en samling av test för appen/ sidan.
describe('UI test for Todo app', ()=> {
    // prova att besöka sidan
    it('', ()=> {
        cy.visit('http://localhost:8001/todolist')


    cy.contains('Osorterat')
    // kolla om det finns en länk eller knapp.
    // klicka på länken
    cy.contains('Prio 1 → 5').click()
    
    // kontrollera att vi hamnar på rätt sökväg tex./prio1to5
    cy.url().should('include', '/prio1to5')
    
    cy.get('#todoInput').type('Sjunga').should('have.value', 'Sjunga')

    // hitta elementet Radera, clicka på alla
    cy.get('#deleteButton').click({multiple: true})
    })

    // man kan även loopa genom alla element Radera och klicka på varje, börja med sista.

    // cy.get('#deleteButton').each(() => {
    //     cy.get('#deleteButton').last().click();
    //     });

    it('Should add a new task', ()=>{
        cy.visit('http://localhost:8001/todolist')

        cy.get('#todoInput').type('Walk')
        cy.get('#nameInput').type('Someone')
        cy.get('#addTaskButton').click()
    })
})