import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface UserData {
  name: string;
  email: string;
  title: 'Mr' | 'Mrs';
  password: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  newsletter?: boolean;
  offers?: boolean;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export class LoginSignupPage extends BasePage {
  // Login selectors
  private readonly loginEmail: string = 'input[data-qa="login-email"]';
  private readonly loginPassword: string = 'input[data-qa="login-password"]';
  private readonly loginButton: string = 'button[data-qa="login-button"]';
  
  // Signup selectors
  private readonly signupName: string = 'input[data-qa="signup-name"]';
  private readonly signupEmail: string = 'input[data-qa="signup-email"]';
  private readonly signupButton: string = 'button[data-qa="signup-button"]';
  
  // Account information selectors
  private readonly titleMr: string = '#id_gender1';
  private readonly titleMrs: string = '#id_gender2';
  private readonly password: string = '#password';
  private readonly birthDay: string = '#days';
  private readonly birthMonth: string = '#months';
  private readonly birthYear: string = '#years';
  private readonly newsletter: string = '#newsletter';
  private readonly offers: string = '#optin';
  
  // Address information selectors
  private readonly firstName: string = '#first_name';
  private readonly lastName: string = '#last_name';
  private readonly company: string = '#company';
  private readonly address1: string = '#address1';
  private readonly address2: string = '#address2';
  private readonly country: string = '#country';
  private readonly state: string = '#state';
  private readonly city: string = '#city';
  private readonly zipcode: string = '#zipcode';
  private readonly mobileNumber: string = '#mobile_number';
  
  private readonly createAccountButton: string = 'button[data-qa="create-account"]';
  private readonly continueButton: string = 'a[data-qa="continue-button"]';
  
  // Success messages
  private readonly accountCreatedMessage: string = 'h2[data-qa="account-created"]';
  private readonly loggedInUser: string = 'a:has-text("Logged in as")';

  constructor(page: Page) {
    super(page);
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.fill(this.loginEmail, email);
    await this.page.fill(this.loginPassword, password);
    await this.page.click(this.loginButton);
    await this.waitForPageLoad();
  }

  async startSignup(name: string, email: string): Promise<void> {
    await this.page.fill(this.signupName, name);
    await this.page.fill(this.signupEmail, email);
    await this.page.click(this.signupButton);
    await this.waitForPageLoad();
  }

  async fillAccountInformation(userData: Partial<UserData>): Promise<void> {
    // Select title
    if (userData.title === 'Mr') {
      await this.page.check(this.titleMr);
    } else {
      await this.page.check(this.titleMrs);
    }
    
    // Fill password
    if (userData.password) {
      await this.page.fill(this.password, userData.password);
    }
    
    // Select date of birth
    if (userData.birthDay) {
      await this.page.selectOption(this.birthDay, userData.birthDay);
    }
    if (userData.birthMonth) {
      await this.page.selectOption(this.birthMonth, userData.birthMonth);
    }
    if (userData.birthYear) {
      await this.page.selectOption(this.birthYear, userData.birthYear);
    }
    
    // Check newsletter and offers if needed
    if (userData.newsletter) {
      await this.page.check(this.newsletter);
    }
    if (userData.offers) {
      await this.page.check(this.offers);
    }
  }

  async fillAddressInformation(userData: Partial<UserData>): Promise<void> {
    if (userData.firstName) await this.page.fill(this.firstName, userData.firstName);
    if (userData.lastName) await this.page.fill(this.lastName, userData.lastName);
    if (userData.company) await this.page.fill(this.company, userData.company);
    if (userData.address1) await this.page.fill(this.address1, userData.address1);
    if (userData.address2) await this.page.fill(this.address2, userData.address2);
    if (userData.country) await this.page.selectOption(this.country, userData.country);
    if (userData.state) await this.page.fill(this.state, userData.state);
    if (userData.city) await this.page.fill(this.city, userData.city);
    if (userData.zipcode) await this.page.fill(this.zipcode, userData.zipcode);
    if (userData.mobileNumber) await this.page.fill(this.mobileNumber, userData.mobileNumber);
  }

  async createAccount(): Promise<void> {
    await this.page.click(this.createAccountButton);
    await this.waitForPageLoad();
  }

  async continueAfterAccountCreation(): Promise<void> {
    await this.page.click(this.continueButton);
    await this.waitForPageLoad();
  }

  async verifyAccountCreated(): Promise<string> {
    await this.page.waitForSelector(this.accountCreatedMessage);
    const message = await this.page.textContent(this.accountCreatedMessage);
    return message || '';
  }

  async verifyLoggedIn(username: string): Promise<boolean> {
    try {
      await this.page.waitForSelector(this.loggedInUser, { timeout: 5000 });
      const loggedInText = await this.page.textContent(this.loggedInUser);
      return loggedInText?.includes(username) || false;
    } catch {
      return false;
    }
  }

  async verifyLoginFormElements(): Promise<boolean> {
    const emailVisible = await this.page.isVisible(this.loginEmail);
    const passwordVisible = await this.page.isVisible(this.loginPassword);
    const buttonVisible = await this.page.isVisible(this.loginButton);
    
    return emailVisible && passwordVisible && buttonVisible;
  }
}