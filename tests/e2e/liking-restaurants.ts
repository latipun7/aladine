import { clearStore } from 'lib/idb-utils';

describe('Scenario for liking a restaurant', () => {
  test("go to favorite page should didn't have favorite yet", async () => {
    await clearStore('favorite');

    await page.goto('http://localhost:8080/favorite');
    await expect(page).toHaveText('p', "You don't have favorite restaurant.");
  });
});
