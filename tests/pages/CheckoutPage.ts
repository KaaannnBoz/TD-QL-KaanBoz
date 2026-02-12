import { Page, Locator } from "@playwright/test";
import { faker } from "@faker-js/faker";

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
    const cardNumber = faker.finance.creditCardNumber();
    const cardHolder = faker.person.fullName();
    const month = String(faker.number.int({ min: 1, max: 12 })).padStart(
      2,
      "0",
    );
    const year = String(new Date().getFullYear() + 3).slice(-2);
    const expiry = `${month}/${year}`;
    const cvv = faker.string.numeric(3);

    await this.paymentCardNumberInput.fill(cardNumber);
    await this.paymentCardNameInput.fill(cardHolder);
    await this.paymentExpiryInput.fill(expiry);
    await this.paymentCvvInput.fill(cvv);
    await this.paymentSubmitButton.click();
  }

  async backToCart(): Promise<void> {
    await this.backToCartButton.click();
  }

  async fillShippingInformation(): Promise<void> {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const phone = faker.phone.number();
    const address = faker.location.streetAddress();
    const city = faker.location.city();
    const postalCode = faker.location.zipCode();

    await this.shippingFirstnameInput.fill(firstName);
    await this.shippingLastnameInput.fill(lastName);
    await this.shippingEmailInput.fill(email);
    await this.shippingPhoneInput.fill(phone);
    await this.shippingAddressInput.fill(address);
    await this.shippingCityInput.fill(city);
    await this.shippingPostalCodeInput.fill(postalCode);

    await this.shippingSubmitButton.click();
  }

  async goToPaymentTab(): Promise<void> {
    await this.paymentTab.click();
  }
}
