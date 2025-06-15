/// <reference types="cypress" />

describe('Burger Constructor Integration Test', () => {
  beforeEach(() => {
    // Мокаем данные ингредиентов
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');

    // Мокаем заказ
    cy.intercept('POST', '**/orders', {
      body: {
        success: true,
        name: 'Тестовый заказ',
        order: { number: 1234 }
      }
    }).as('postOrder');

    // Мокаем авторизованного пользователя
    cy.intercept('GET', '**/auth/user', {
      body: {
        success: true,
        user: { name: 'Test User', email: 'test@example.com' }
      }
    }).as('getUser');

    // Токены
    cy.setCookie('accessToken', 'test-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    // Загрузка страницы
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  it('добавляет булку и начинку в конструктор', () => {
  cy.contains('[data-cy=ingredient-card]', 'Краторная булка N-200i', { timeout: 8000 })
    .find('button')
    .click();

  // Проверка на добавление булки
  cy.get('[data-cy=constructor-bun-top]')
  .should('contain.text', 'Краторная булка N-200i');

  // Добавляем начинку
  cy.contains('[data-cy=ingredient-card]', 'Соус Spicy-X', { timeout: 8000 })
    .find('button')
    .click();

  // Проверка наличия хотя бы одной начинки
  cy.get('[data-cy=constructor-ingredient]')
    .should('have.length.at.least', 1);
});

  it('открывает и закрывает модалку ингредиента', () => {
    cy.get('[data-cy=ingredient-card]').first().click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('закрывает модалку по клику на оверлей', () => {
    cy.get('[data-cy=ingredient-card]').first().click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('создает заказ и очищает конструктор', () => {
    cy.contains('[data-cy=ingredient-card]', 'Краторная булка N-200i')
      .find('button')
      .click();

    cy.contains('[data-cy=ingredient-card]', 'Соус Spicy-X')
      .find('button')
      .click();

    cy.get('[data-cy=order-button]').should('not.be.disabled').click();
    cy.wait('@postOrder');

    cy.get('[data-cy=modal]').should('exist');
    cy.contains('1234').should('exist');

    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    // Конструктор очищен
    cy.get('[data-cy=constructor-ingredient]').should('not.exist');
    cy.get('[data-cy=constructor-dropzone]').should('not.contain', 'Краторная булка N-200i');
  });
});



