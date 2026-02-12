import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly connexionTab: Locator;
  readonly inscriptionTab: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.connexionTab = page.getByRole("tab", { name: "Connexion" });
    this.inscriptionTab = page.getByRole("tab", { name: "Inscription" });
    this.emailInput = page.getByTestId("login-email-input");
    this.passwordInput = page.getByTestId("login-password-input");
    this.loginButton = page.getByTestId("login-submit-button");
  }

  async goto(): Promise<void> {
    await this.page.goto(`${process.env.URL!}/auth`);
  }

  async openLoginTab(): Promise<void> {
    await this.connexionTab.click();
  }

  async openRegisterTab(): Promise<void> {
    await this.inscriptionTab.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.openLoginTab();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
