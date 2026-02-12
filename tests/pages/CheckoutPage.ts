import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly loginRequiredHeading: Locator;
  readonly backToCartButton: Locator;
  readonly shippingFirstnameInput: Locator;
  readonly shippingLastnameInput: Locator;
  readonly shippingEmailInput: Locator;
  readonly shippingPhoneInput: Locator;
  readonly shippingAddressInput: Locator;
  readonly shippingCityInput: Locator;
  readonly shippingPostalCodeInput: Locator;
  readonly shippingSubmitButton: Locator;
  readonly paymentTab: Locator;
  readonly standardDeliveryOption: Locator;
  readonly expressDeliveryOption: Locator;
  readonly paymentCardNumberInput: Locator;
  readonly paymentCardNameInput: Locator;
  readonly paymentExpiryInput: Locator;
  readonly paymentCvvInput: Locator;
  readonly paymentSubmitButton: Locator;
  readonly orderConfirmedHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginRequiredHeading = page.getByRole("heading", {
      name: "Connexion requise",
    });
    // Bouton global d'accès au panier dans le header
    this.backToCartButton = page.getByTestId("cart-button");

    // Formulaire d'adresse de livraison
    this.shippingFirstnameInput = page.getByTestId("shipping-firstname-input");
    this.shippingLastnameInput = page.getByTestId("shipping-lastname-input");
    this.shippingEmailInput = page.getByTestId("shipping-email-input");
    this.shippingPhoneInput = page.getByTestId("shipping-phone-input");
    this.shippingAddressInput = page.getByTestId("shipping-address-input");
    this.shippingCityInput = page.getByTestId("shipping-city-input");
    this.shippingPostalCodeInput = page.getByTestId(
      "shipping-postalcode-input",
    );
    this.shippingSubmitButton = page.getByTestId("shipping-submit-button");

    this.paymentTab = page.getByText("Paiement", { exact: true });

    this.standardDeliveryOption = page.getByLabel(/standard/i);
    this.expressDeliveryOption = page.getByLabel(/express/i);

    // Formulaire de paiement
    this.paymentCardNumberInput = page.getByTestId("payment-cardnumber-input");
    this.paymentCardNameInput = page.getByTestId("payment-cardname-input");
    this.paymentExpiryInput = page.getByTestId("payment-expiry-input");
    this.paymentCvvInput = page.getByTestId("payment-cvv-input");
    this.paymentSubmitButton = page.getByTestId("payment-submit-button");

    this.orderConfirmedHeading = page.getByRole("heading", {
      name: "Commande confirmée !",
    });
  }

  async goto(): Promise<void> {
    await this.page.goto(`${process.env.URL!}/checkout`);
  }

  async selectStandardDelivery(): Promise<void> {
    await this.standardDeliveryOption.check();
  }

  async selectExpressDelivery(): Promise<void> {
    await this.expressDeliveryOption.check();
  }

  async confirmPayment(): Promise<void> {
    await this.paymentCardNumberInput.fill("4242424242424242");
    await this.paymentCardNameInput.fill("John Doe");
    await this.paymentExpiryInput.fill("12/30");
    await this.paymentCvvInput.fill("123");
    await this.paymentSubmitButton.click();
  }

  async backToCart(): Promise<void> {
    await this.backToCartButton.click();
  }

  async fillShippingInformation(): Promise<void> {
    await this.shippingFirstnameInput.click();
    await this.shippingFirstnameInput.fill("Test");

    await this.shippingLastnameInput.click();
    await this.shippingLastnameInput.fill("Boz");

    await this.shippingEmailInput.click();
    await this.shippingEmailInput.fill("test01@gmail.com");

    await this.shippingPhoneInput.click();
    await this.shippingPhoneInput.fill("0783180797");

    await this.shippingAddressInput.click();
    await this.shippingAddressInput.fill("test");

    await this.shippingCityInput.click();
    await this.shippingCityInput.fill("Paris");

    await this.shippingPostalCodeInput.click();
    await this.shippingPostalCodeInput.fill("59100");

    await this.shippingSubmitButton.click();
  }

  async goToPaymentTab(): Promise<void> {
    await this.paymentTab.click();
  }
}
