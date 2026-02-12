import { Page, Locator } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly catalogueHeading: Locator;
  readonly addToCartButton: Locator;
  readonly addToCartNotification: Locator;

  constructor(page: Page) {
    this.page = page;
    this.catalogueHeading = page.getByRole("heading", {
      name: "Notre Catalogue",
    });
    this.addToCartButton = page.getByRole("button", {
      name: "Ajouter au panier",
    });
    this.addToCartNotification = page.getByText(
      /Écouteurs Sans Fil Pro ajouté au panier/i,
    );
  }

  async goto(): Promise<void> {
    await this.page.goto(`${process.env.URL!}/products`);
  }

  getProductLinkByName(name: string): Locator {
    return this.page.getByRole("link", { name });
  }

  async openProductByName(name: string): Promise<void> {
    await this.getProductLinkByName(name).click();
  }

  async addProductToCartByName(name: string): Promise<void> {
    await this.goto();
    await this.openProductByName(name);
    await this.addToCartButton.click();
  }
}
