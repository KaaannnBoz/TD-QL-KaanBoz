import { test, expect } from "./fixtures/fixtures";

test.describe("Checkout", () => {
  test("Accès au checkout avec un utilisateur connecté", async ({
    checkoutStartPage,
    checkoutPage,
  }) => {
    // un utilisateur connecté ne doit PAS voir "Connexion requise".
    await expect(checkoutPage.loginRequiredHeading).not.toBeVisible();
    await expect(checkoutStartPage).toHaveURL(/\/checkout/);
  });

  test("Choix du mode de livraison", async ({
    checkoutStartPage,
    checkoutPage,
  }) => {
    await checkoutPage.fillShippingInformation();
    await checkoutPage.goToPaymentTab();

    // L'utilisateur arrive sur l'étape de paiement après avoir
    // cliqué sur "Continuer vers le paiement".
    await expect(
      checkoutStartPage.getByText("Paiement", { exact: true }),
    ).toBeVisible();
  });

  test("Confirmation de paiement", async ({
    checkoutPaymentPage,
    checkoutPage,
  }) => {
    await checkoutPage.confirmPayment();

    await expect(checkoutPage.orderConfirmedHeading).toBeVisible();
  });
});
