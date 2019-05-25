import {AppPage} from './app.po';
import {browser, by, element, logging} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });


  it('1.0 Test that you can successfully navigate to home', () => {
    browser.get('home/login');
    let loginText = element(by.id('login')).getText();
    expect(loginText).toEqual('Login');

  });

  it('2.0 Test login in', () => {
    browser.get('home/login');
    element(by.id('username')).sendKeys('Username');
    element(by.id('password')).sendKeys('Password');
    element(by.id('login_btn')).click();
    let title = element(by.id('title')).getText();
    expect(title).toEqual('Quizzes');
  });


  it('3.0 Test that a new quiz is created', () => {

    // browser.get('portal/display-quizzes');
    // browser.get('portal/create-quiz');
    element.all(by.css('.cards')).then((elemsAfter) => {
      let start = elemsAfter.length;
      element(by.id('create-quiz-btn')).click();
      element(by.id('quiz-title')).sendKeys('super fed test quiz');
      element(by.id('new-question')).click();
      element(by.id('question-title')).sendKeys('This is the quiz title');
      element.all(by.css('.option')).get(0).sendKeys('Quiz option 1');
      element.all(by.css('.option')).get(1).sendKeys('Quiz option 2');
      element(by.id('save-quiz')).click();
      element.all(by.css('.cards')).then((elementsAfter) => {
        let endVal = elementsAfter.length;
        expect(endVal).toEqual(+start + 1);

      });
    });

  });

  it('4.0 Test that deletes a quiz', () => {
    element.all(by.css('.cards')).then((elemsAfter) => {

      let start = elemsAfter.length;
      element.all(by.css('.delete-btn')).get(start - 1).click();
      element.all(by.css('.cards')).then((elementsAfter) => {
        let endVal = elementsAfter.length;
        expect(endVal).toEqual(+start - 1);

      });
    });

  });

  it("5.0 Test that search function is finding whats intended", () => {

    //Create new quiz to test on
    element(by.id('create-quiz-btn')).click();
    element(by.id('quiz-title')).sendKeys('super fed test quiz');
    element(by.id('new-question')).click();
    element(by.id('question-title')).sendKeys('This is the quiz title');
    element.all(by.css('.option')).get(0).sendKeys('Quiz option 1');
    element.all(by.css('.option')).get(1).sendKeys('Quiz option 2');
    element(by.id('save-quiz')).click();

    //Check that the quiz is able to being found
     element.all(by.css('.search')).sendKeys('super fed test quiz');

    expect(element(by.id('quiz-title'))).toEqual('super fed test quiz');
    element.all(by.css('.delete.btn')).click();
  })

});
