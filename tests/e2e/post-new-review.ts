describe('Scenario for posting new review', () => {
  test('go to home, pick restaurant, should posted new review', async () => {
    await page.goto('http://localhost:8080');
    await page.click('a:has-text("Pangsit Express")');
    await expect(page).toHaveSelector('details');

    const initialReviews = await page.$$('detail-review');
    const initialReviewsCount = initialReviews.length;

    await page.click('[title="Add Review"]');

    await page.fill('id=name', 'Latipun');
    await page.fill('id=review', 'This is great! 👍');

    await page.click('[type=submit]');
    await page.waitForTimeout(3000);

    await expect(page).toHaveSelectorCount(
      'detail-review',
      initialReviewsCount + 1
    );
  });

  test('empty one of form input, should cannot post new review', async () => {
    const initialReviews = await page.$$('detail-review');
    const initialReviewsCount = initialReviews.length;

    await page.click('[title="Add Review"]');

    await page.fill('id=review', 'This is great! 👍');

    await page.click('[type=submit]');
    await page.waitForTimeout(3000);

    await expect(page).not.toHaveSelectorCount(
      'detail-review',
      initialReviewsCount + 1
    );

    await page.fill('id=name', 'Latipun');
    await page.fill('id=review', '');

    await page.click('[type=submit]');
    await page.waitForTimeout(3000);

    await expect(page).not.toHaveSelectorCount(
      'detail-review',
      initialReviewsCount + 1
    );
  });
});
