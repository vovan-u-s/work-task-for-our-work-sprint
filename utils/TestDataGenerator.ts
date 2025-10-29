import { UserData } from '../pages/LoginSignupPage';

export interface PaymentData {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

export class TestDataGenerator {
  static generateRandomString(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateRandomNumber(min: number = 1, max: number = 1000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static generateRandomEmail(domain: string = 'test.com'): string {
    const username = this.generateRandomString(10).toLowerCase();
    const timestamp = Date.now();
    return `${username}${timestamp}@${domain}`;
  }

  static generateUserData(): UserData {
    const firstName = this.generateRandomString(6);
    const lastName = this.generateRandomString(8);
    
    return {
      // Signup data
      name: `${firstName} ${lastName}`,
      email: this.generateRandomEmail(),
      
      // Account information
      title: Math.random() > 0.5 ? 'Mr' : 'Mrs',
      password: 'TestPassword123!',
      birthDay: String(this.generateRandomNumber(1, 28)),
      birthMonth: String(this.generateRandomNumber(1, 12)),
      birthYear: String(this.generateRandomNumber(1980, 2000)),
      newsletter: true,
      offers: true,
      
      // Address information
      firstName: firstName,
      lastName: lastName,
      company: 'Test Company Ltd',
      address1: '123 Test Street',
      address2: 'Apt 456',
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      zipcode: '90210',
      mobileNumber: '+1234567890'
    };
  }

  static getValidLoginCredentials(): { email: string; password: string } {
    // For existing user login tests
    return {
      email: 'testuser@example.com',
      password: 'TestPassword123!'
    };
  }

  static getPaymentData(): PaymentData {
    return {
      nameOnCard: 'Test User',
      cardNumber: '4111111111111111', // Test card number
      cvc: '123',
      expiryMonth: '12',
      expiryYear: '2025'
    };
  }

  static getTestProducts(): string[] {
    return [
      'Blue Top',
      'Men Tshirt',
      'Dress'
    ];
  }

  static generateTimestamp(): string {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }
}