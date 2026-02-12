import { test, expect } from "./fixtures/fixtures";
import { faker } from "@faker-js/faker";

test.describe("Connexion", () => {
  test("Login valide avec compte de démonstration", async ({
    page,
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.login("test01@gmail.com", "testtest");

    await expect(page).toHaveURL(`${process.env.URL!}/`);
  });

  test("Login invalide affiche un message d’erreur", async ({
    page,
    loginPage,
  }) => {
    await loginPage.goto();
    const invalidEmail = faker.internet.email();
    const invalidPassword = `Invalid1!${faker.string.alphanumeric(4)}`;

    await loginPage.login(invalidEmail, invalidPassword);

    const errorMessage = page
      .getByText(/Email ou mot de passe incorrect|Identifiants incorrects/i)
      .first();

    await expect(errorMessage).toBeVisible();
    await expect(page).toHaveURL(`${process.env.URL!}/auth`);
  });

  test("Mot de passe oublié envoie un email", async ({ page, loginPage }) => {
    await loginPage.goto();

    await page.getByTestId("forgot-password-link").click();
    await page.getByTestId("forgot-email-input").fill("test@gmail.com");
    await page.getByTestId("forgot-submit-button").click();

    const toastTitle = page.getByText(/Email envoyé/).first();
    await expect(toastTitle).toBeVisible();
  });

  test("Déconnexion depuis le menu utilisateur", async ({ loggedInPage }) => {
    const page = loggedInPage;

    await page.getByTestId("user-menu-button").click();
    await page.getByTestId("logout-button").click();
    await page.getByTestId("login-button").click();
    await page.getByRole("heading", { name: "Connexion" }).click();

    await expect(page).toHaveURL(`${process.env.URL!}/auth`);
    await expect(
      page.getByRole("heading", { name: "Connexion" }),
    ).toBeVisible();
  });
});
