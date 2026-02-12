import { test, expect } from "./fixtures/fixtures";

test("E2E: from login to payment confirmation", async ({
  page,
  loginPage,
  cartPage,
  checkoutPage,
}) => {
  await loginPage.goto();
  await loginPage.login("test01@gmail.com", "testtest");
  await expect(page).toHaveURL(`${process.env.URL!}/`);

  await page.getByTestId("nav-link-products").click();
  await expect(page).toHaveURL(/\/products/);

  await page.getByTestId("product-card-1").click();
  await page.getByTestId("product-detail-add-to-cart").click();

  await page.getByTestId("cart-button").click();
  await cartPage.goToCheckout();
  await expect(page).toHaveURL(/\/checkout/);

  await checkoutPage.fillShippingInformation();
  await checkoutPage.goToPaymentTab();

  await checkoutPage.confirmPayment();

  await expect(checkoutPage.orderConfirmedHeading).toBeVisible();
});
