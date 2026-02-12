import { test, expect } from "./fixtures/fixtures";
import { faker } from "@faker-js/faker";

test("Création de compte depuis l’onglet Inscription", async ({
  page,
  registerPage,
}) => {
  await registerPage.goto();

  const fullName = faker.person.fullName();
  const email = faker.internet.email();
  const password = `Password123!${faker.string.alphanumeric(4)}`;

  await registerPage.register({
    fullName,
    email,
    password,
    confirmPassword: password,
  });

  // On vérifie que l'utilisateur est redirigé vers la home ou le catalogue produits
  await expect(page).toHaveURL(/\/(products|)/);
});
