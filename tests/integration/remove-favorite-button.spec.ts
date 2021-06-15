import FavoriteButton from 'components/favorite-button';
import { screen, waitFor } from '@testing-library/dom';
import {
  addOrUpdateToStore,
  clearStore,
  deleteFromStore,
  getAllFromStore,
} from 'lib/idb-utils';
import { render } from 'test.utils';

describe('favorite-button Component for Remove from Favorite', () => {
  const restaurant = {
    id: 'test1',
    city: 'Yogyakarta',
    description: 'Great place.',
    name: 'Angkringan',
    pictureId: '',
    rating: 5,
  };

  beforeEach(async () => {
    const favoriteButton = new FavoriteButton(restaurant);

    await clearStore('favorite');
    await addOrUpdateToStore('favorite', restaurant);
    await render(favoriteButton, true);
  });

  it('should show "Remove from favorite" button when restaurant has been liked', async () => {
    await waitFor(() => {
      const buttonElement = screen.getByTitle('Remove from favorite');

      expect(buttonElement).toBeInTheDocument();
    });
  });

  it('should not show loading and "Add to favorite" button when restaurant has been liked', async () => {
    await waitFor(() => {
      const buttonElement = screen.getByRole('button');

      expect(buttonElement.title).not.toBe('Getting favorite info...');
      expect(buttonElement.title).not.toBe('Add to favorite');
    });
  });

  it('should be able to unlike the restaurant and removed from favorite', async () => {
    let buttonElement: HTMLElement;

    await waitFor(() => {
      buttonElement = screen.getByTitle('Remove from favorite');

      buttonElement.click();
    });

    await waitFor(async () => {
      const favorite = await getAllFromStore('favorite');

      expect(buttonElement.title).toBe('Add to favorite');
      expect(favorite).toHaveLength(0);
    });
  });

  it('should not crashing the app when remove restaurant not in favorite', async () => {
    let buttonElement: HTMLElement;

    await waitFor(() => {
      buttonElement = screen.getByTitle('Remove from favorite');
    });

    await deleteFromStore('favorite', restaurant.id);

    const favorite = await getAllFromStore('favorite');
    expect(favorite).toHaveLength(0);

    await waitFor(() => {
      buttonElement.click();
    });

    await waitFor(async () => {
      const favoriteAfterClick = await getAllFromStore('favorite');

      expect(buttonElement.title).toBe('Add to favorite');
      expect(favoriteAfterClick).toHaveLength(0);
    });
  });
});
