describe('Scenario for liking a restaurant', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:8080');
  });

  test('go to favorite page should not have favorite yet', async () => {
    await page.click('a:has-text("Favorite")');

    await expect(page).toEqualUrl('http://localhost:8080/favorite');
    await expect(page).not.toHaveSelector('aladine-card');
    await expect(page).toHaveText(
      'div > p',
      "You don't have favorite restaurant."
    );
  });

  test('go to home, pick restaurant, should added to favorite', async () => {
    await page.click('a:has-text("Pangsit Express")');
    await expect(page).toHaveSelector('details');

    await page.click('[title="Add to favorite"]');

    await page.click('a:has-text("Favorite")');

    await expect(page).toEqualUrl('http://localhost:8080/favorite');
    await expect(page).toHaveSelectorCount('aladine-card', 1);
    await expect(page).toHaveText('div ~ a', 'Pangsit Express');
    await expect(page).not.toHaveText(
      'div > p',
      "You don't have favorite restaurant."
    );
  });
});
