import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly emptyCartHeading: Locator;
  readonly removeFirstItemButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emptyCartHeading = page.getByRole("heading", {
      name: "Votre panier est vide",
    });
    this.removeFirstItemButton = page.getByTestId("remove-item-1");
    this.checkoutButton = page.getByTestId("checkout-button");
  }

  async goto(): Promise<void> {
    await this.page.goto(`${process.env.URL!}/cart`);
  }

  async removeFirstItem(): Promise<void> {
    await this.removeFirstItemButton.click();
  }

  async goToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
