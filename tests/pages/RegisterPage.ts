import { Page, Locator } from "@playwright/test";

export interface RegistrationData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class RegisterPage {
  readonly page: Page;
  readonly inscriptionTab: Locator;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inscriptionTab = page.getByRole("tab", { name: "Inscription" });
    this.fullNameInput = page.getByLabel("Nom complet");
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByTestId("signup-password-input");
    this.confirmPasswordInput = page.getByTestId(
      "signup-confirm-password-input",
    );
    this.createAccountButton = page.getByRole("button", {
      name: "Créer mon compte",
    });
  }

  async goto(): Promise<void> {
    await this.page.goto(`${process.env.URL!}/auth`);
    await this.inscriptionTab.click();
  }

  async register(data: RegistrationData): Promise<void> {
    await this.inscriptionTab.click();
    await this.fullNameInput.fill(data.fullName);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.confirmPassword);
    await this.createAccountButton.click();
  }
}
