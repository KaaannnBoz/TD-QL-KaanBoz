import { test, expect } from "./fixtures/fixtures";

test.describe("Panier", () => {
  test("Ajout d’un produit au panier", async ({
    page,
    productDetailPage,
    productsPage,
  }) => {
    // La fixture productDetailPage nous place déjà sur la page détail du produit.
    await expect(
      page.getByRole("heading", { name: "Écouteurs Sans Fil Pro" }),
    ).toBeVisible();
    await page.getByTestId("product-detail-add-to-cart").click();

    await expect(productsPage.addToCartNotification).toBeVisible();
  });

  test("Suppression d’un produit du panier", async ({
    page,
    cartPage,
    cartWithItemsPage,
  }) => {
    // La fixture cartWithItemsPage nous place déjà sur la page panier
    // avec au moins un produit présent.
    await cartPage.removeFirstItem();

    await expect(cartPage.emptyCartHeading).toBeVisible();
  });

  test("Ajout de deux produits identiques depuis le catalogue", async ({
    page,
    productsPage,
  }) => {
    // L'utilisateur se trouve sur le catalogue produits.
    await productsPage.goto();

    await page.getByTestId("add-to-cart-1").click();
    await page.getByTestId("add-to-cart-1").click();

    await expect(page.getByTestId("cart-count")).toHaveText("2");
  });
});
