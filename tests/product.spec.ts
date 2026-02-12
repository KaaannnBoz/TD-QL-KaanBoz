import { test, expect } from "./fixtures/fixtures";

test.describe("Catalogue produits", () => {
  test("Accès à la page catalogue", async ({ page, productsPage }) => {
    await productsPage.goto();

    await expect(productsPage.catalogueHeading).toBeVisible();
    await expect(page).toHaveURL(/\/products/);
  });

  test("Sélection d’un produit depuis le catalogue", async ({
    page,
    productsPage,
  }) => {
    await productsPage.goto();
    await productsPage.openProductByName("Écouteurs Sans Fil Pro");

    await expect(
      page.getByRole("heading", { name: "Écouteurs Sans Fil Pro" }),
    ).toBeVisible();
    await expect(page).toHaveURL(/\/product\/1/);
  });
});
