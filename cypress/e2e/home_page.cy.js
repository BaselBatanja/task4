import { expect } from "chai";

describe("The Home Page", () => {
  beforeEach(() => {
    cy.request(
      "DELETE",
      "https://task4-ef227-default-rtdb.firebaseio.com/activities.json"
    );
  });

  it("verify if in dashboard page", () => {
    cy.visit("/");
    cy.url().should("include", "/dashboard");
  });

  it("verify if in record an activity page", () => {
    cy.get("a").contains("Record an activity").click();
    cy.url().should("include", "/record-an-activity");
  });

  it("test record an acitivity if its fields are empty", () => {
    cy.get("#dateInput").should("have.value", "");
    cy.get("#numberInput").should("have.value", "");
    cy.get("#activityId").should("have.value", "sleep");
    cy.get("button").contains("+").should("not.be.visible");
  });

  it("add some data to fields and test if error span appear or not", () => {
    cy.get("#dateInput").type("2022-07-22");
    cy.get("#numberInput").type("25");
    cy.get("#errorSpan").should("be.visible");
    cy.get("#activityId").select("work");
    cy.get("#activityId").should("have.value", "work");
  });

  it("add correct data before send request and ensure that button is now visible", () => {
    cy.get("#numberInput").clear();
    cy.get("#numberInput").type("24");
    cy.get("#errorSpan").should("not.exist");
    cy.get("button").contains("+").should("be.visible");
  });

  it("send data and test if fields automatically returns to empty state", () => {
    cy.get("button").contains("+").click();
    cy.get("#dateInput").should("have.value", "");
    cy.get("#numberInput").should("have.value", "");
    cy.get("#activityId").should("have.value", "sleep");
    cy.get("button").contains("+").should("not.be.visible");
  });

  it("return to dashboard page", () => {
    cy.get("a").contains("Dashboard").click();
  });

  it('test if select box contains "Per Week" as default value', () => {
    cy.get("#selectTime").should("have.value", "perWeek");
  });

  it("test if title has the same name as select tag current state", () => {
    cy.get("#selectTime").select("perWeek");
    cy.get("#titleOfDashboard").should("contain.text", "per week");

    cy.get("#selectTime").select("perMonth");
    cy.get("#titleOfDashboard").should("contain.text", "per month");

    cy.get("#selectTime").select("perYear");
    cy.get("#titleOfDashboard").should("contain.text", "per year");
  });

  it('test if "To" span has today\'s date', () => {
    const year = new Date().getFullYear();
    const month = new Date().toLocaleString("en-US", { month: "long" });
    const day = new Date().toLocaleString("en-US", { day: "2-digit" });
    cy.get("#toSpan").should("contain.text", year);
    cy.get("#toSpan").should("contain.text", month);
    cy.get("#toSpan").should("contain.text", day);
  });
});
