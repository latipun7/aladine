import FavoriteButton from 'components/favorite-button';
import { screen, waitFor } from '@testing-library/dom';
import { addOrUpdateToStore, clearStore, getAllFromStore } from 'lib/idb-utils';
import { render } from 'test.utils';

describe('favorite-button Component for Add to Favorite', () => {
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
    await render(favoriteButton, true);
  });

  it('should show "Add to favorite" button when restaurant not liked', async () => {
    await waitFor(() => {
      const buttonElement = screen.getByTitle('Add to favorite');

      expect(buttonElement).toBeInTheDocument();
    });
  });

  it('should not show loading and "Remove from favorite" button when restaurant not liked', async () => {
    await waitFor(() => {
      const buttonElement = screen.getByRole('button');

      expect(buttonElement.title).not.toBe('Getting favorite info...');
      expect(buttonElement.title).not.toBe('Remove from favorite');
    });
  });

  it('should be able to like the restaurant and added to favorite', async () => {
    let buttonElement: HTMLElement;

    await waitFor(() => {
      buttonElement = screen.getByTitle('Add to favorite');

      buttonElement.click();
    });

    await waitFor(async () => {
      const favorite = await getAllFromStore('favorite');

      expect(buttonElement.title).toBe('Remove from favorite');
      expect(favorite).toHaveLength(1);
    });
  });

  it('should not add to favorite again when already liked', async () => {
    let buttonElement: HTMLElement;

    await waitFor(() => {
      buttonElement = screen.getByTitle('Add to favorite');
    });

    await addOrUpdateToStore('favorite', restaurant);

    const favorite = await getAllFromStore('favorite');
    expect(favorite).toHaveLength(1);

    await waitFor(() => {
      buttonElement.click();
    });

    await waitFor(async () => {
      const favoriteAfterClick = await getAllFromStore('favorite');

      expect(buttonElement.title).toBe('Remove from favorite');
      expect(favoriteAfterClick).toHaveLength(1);
    });
  });

  // it 'should not add to favorite when restaurant has missing ID';
  // typescript should already make sure this can't be the case when defining component
  // new FavoriteButton(data: Restaurant), type `Restaurant` requiring all the properties,
  // otherwise typescript would error when building or type-check and linting.
});
