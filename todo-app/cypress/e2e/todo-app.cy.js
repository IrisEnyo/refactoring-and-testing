/// <reference types="cypress" />

describe("todo app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should have input field and add new todo to the list", () => {
    cy.get("#new-todo").should("exist");
    cy.get("#new-todo").type("Learn Cypress");
    cy.get("#add-todo").click();
    cy.get("#todo-list")
      .get("li")
      .should("have.length", 2)
      .last()
      .should("have.text", "Learn Cypress");
  });

  it("check off an item as completed", () => {
    cy.contains("Learn Cypress")
      .parent()
      .find("input[type=checkbox]")
      .check()
      .parents("li")
      .should("have.class", "done");
  });

  context("continue tests with a checked task", () => {
    beforeEach(() => {
      cy.contains("Learn Cypress")

        .find("input[type=checkbox]")
        .check();
    });

    it("should have filter section and filter todos", () => {
      cy.contains("open").click();
      cy.get("#todo-list li.done").should("have.attr", "hidden");
    });

    it("should have a delete button", () => {
      cy.get("#delete-todos").should("exist");
    });

    it("should have todo list", () => {
      cy.get("#todo-list").should("exist");
    });
  });
});
