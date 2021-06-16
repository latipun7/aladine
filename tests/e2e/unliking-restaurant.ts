describe('Scenario for disliking a restaurant', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080');
    await page.click('a:has-text("Pangsit Express")');
    await page.click('[title="Add to favorite"]');
  });

  test('go to favorite page should have favorite', async () => {
    await page.click('a:has-text("Favorite")');

    await expect(page).toEqualUrl('http://localhost:8080/favorite');
    await expect(page).toHaveSelector('aladine-card');
    await expect(page).toHaveText('div ~ a', 'Pangsit Express');
    await expect(page).not.toHaveText(
      'div > p',
      "You don't have favorite restaurant."
    );
  });

  test('select favorite restaurant, should remove from favorite', async () => {
    await page.click('a:has-text("Favorite")');

    await expect(page).toEqualUrl('http://localhost:8080/favorite');
    await expect(page).toHaveSelectorCount('aladine-card', 1);
    await expect(page).toHaveText('div ~ a', 'Pangsit Express');

    await page.click('div ~ a');

    await expect(page).toHaveSelector('details');

    await page.click('[title="Remove from favorite"]');
    await page.click('a:has-text("Favorite")');

    await expect(page).toEqualUrl('http://localhost:8080/favorite');
    await expect(page).not.toHaveSelector('aladine-card');
    await expect(page).toHaveText(
      'div > p',
      "You don't have favorite restaurant."
    );
  });
});
