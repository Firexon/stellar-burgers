/// <reference types="cypress" />

describe('Burger Constructor Integration Test', () => {
  beforeEach(() => {
    //  Мокаем данные ингредиентов
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');

    // Мокаем заказ
    cy.intercept('POST', '**/orders', {
      body: {
        success: true,
        name: 'Тестовый заказ',
        order: { number: 1234 }
      }
    }).as('postOrder');

    //  Мокаем авторизованного пользователя
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

  afterEach(() => {
    // Очистка куков
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('добавляет булку и начинку в конструктор', () => {
    // Проверяем, что булка отсутствует
    cy.get('[data-cy=constructor-bun-top]').should('not.exist');

    // Добавляем булку
    cy.contains('[data-cy=ingredient-card]', 'Краторная булка N-200i', { timeout: 8000 })
      .find('button')
      .click();

    // Проверяем что булка появилась
    cy.get('[data-cy=constructor-bun-top]')
      .should('contain.text', 'Краторная булка N-200i');

    // Проверка что начинки нет
    cy.get('[data-cy=constructor-ingredient]').should('not.exist');

    // Добавляем начинку
    cy.contains('[data-cy=ingredient-card]', 'Соус Spicy-X', { timeout: 8000 })
      .find('button')
      .click();

    // Проверка, что начинка появилась
    cy.get('[data-cy=constructor-ingredient]')
      .should('have.length.at.least', 1);
  });

  it('открывает и закрывает модалку ингредиента', () => {
    cy.get('[data-cy=ingredient-card]').first().as('ingredientCard');

    // Сохраняем имя ингредиента
    cy.get('@ingredientCard').find('[data-cy=ingredient-name]').invoke('text').as('ingredientName');

    // Кликаем по ингредиенту
    cy.get('@ingredientCard').click();

    // Проверка, что модалка открыта и отображает нужный ингредиент
    cy.get('@ingredientName').then((text) => {
      cy.get('[data-cy=modal]').should('contain.text', text);
    });

    // Закрываем модалку
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
    // Проверка, что булки нет
    cy.get('[data-cy=constructor-bun-top]').should('not.exist');

    // Добавляем булку и начинку
    cy.contains('[data-cy=ingredient-card]', 'Краторная булка N-200i')
      .find('button')
      .click();
    cy.contains('[data-cy=ingredient-card]', 'Соус Spicy-X')
      .find('button')
      .click();

    // Нажимаем кнопку заказа
    cy.get('[data-cy=order-button]').should('not.be.disabled').click();
    cy.wait('@postOrder');

    // Проверка модалки с номером заказа
    cy.get('[data-cy=modal]').should('exist');
    cy.contains('1234').should('exist');

    // Закрытие модалки
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    // Проверка очистки конструктора
    cy.get('[data-cy=constructor-ingredient]').should('not.exist');
    cy.get('[data-cy=constructor-dropzone]').should('not.contain', 'Краторная булка N-200i');
  });
});




