import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

type Fixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  loggedInPage: Page;
  checkoutStartPage: Page;
  checkoutPaymentPage: Page;
  productDetailPage: Page;
  cartWithItemsPage: Page;
};

const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  loggedInPage: async ({ page, loginPage }, use) => {
    await loginPage.goto();
    await loginPage.login("test01@gmail.com", "testtest");
    await use(page);
  },

  checkoutStartPage: async (
    { loggedInPage, cartPage }: { loggedInPage: Page; cartPage: CartPage },
    use,
  ) => {
    // Préparation d'un contexte simple : utilisateur connecté + produit ajouté au panier + page checkout ouverte
    await loggedInPage.getByTestId("nav-link-products").click();
    await loggedInPage.getByTestId("product-card-1").click();
    await loggedInPage.getByTestId("product-detail-add-to-cart").click();
    await loggedInPage.getByTestId("cart-button").click();
    await cartPage.goToCheckout();

    await use(loggedInPage);
  },

  checkoutPaymentPage: async (
    {
      checkoutStartPage,
      checkoutPage,
    }: { checkoutStartPage: Page; checkoutPage: CheckoutPage },
    use,
  ) => {
    // Contexte pour les tests de paiement : déjà au checkout, infos de livraison remplies,
    // et utilisateur sur l'onglet Paiement.
    await checkoutPage.fillShippingInformation();
    await checkoutPage.goToPaymentTab();

    await use(checkoutStartPage);
  },

  productDetailPage: async (
    { page, productsPage }: { page: Page; productsPage: ProductsPage },
    use,
  ) => {
    // Contexte pour les tests d'ajout au panier : sur la page détail d'un produit.
    await productsPage.goto();
    await page.getByTestId("product-card-1").click();

    await use(page);
  },

  cartWithItemsPage: async (
    {
      page,
      productsPage,
      cartPage,
    }: { page: Page; productsPage: ProductsPage; cartPage: CartPage },
    use,
  ) => {
    // Contexte pour les tests de suppression : un produit est déjà présent dans le panier.
    await productsPage.goto();
    await page.getByTestId("product-card-1").click();
    await page.getByTestId("product-detail-add-to-cart").click();
    await page.getByTestId("cart-button").click();

    await use(page);
  },
});

const expect = base.expect;

export { test, expect };
