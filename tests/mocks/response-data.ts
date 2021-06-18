import { DetailResponse, ListResponse } from 'lib/restaurant-api';

export const RestaurantsList: ListResponse = {
  error: false,
  message: 'success',
  count: 3,
  restaurants: [
    {
      id: 'rqdv5juczeskfw1e867',
      name: 'Melting Pot',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      pictureId: '14',
      city: 'Medan',
      rating: 4.2,
    },
    {
      id: 'dy62fuwe6w8kfw1e867',
      name: 'Pangsit Express',
      description:
        'Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.',
      pictureId: '43',
      city: 'Surabaya',
      rating: 4.8,
    },
    {
      id: 'vfsqv0t48jkfw1e867',
      name: 'Gigitan Makro',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      pictureId: '04',
      city: 'Surabaya',
      rating: 4.9,
    },
  ],
};

export const PangsitExpressDetail: DetailResponse = {
  error: false,
  message: 'success',
  restaurant: {
    id: 'dy62fuwe6w8kfw1e867',
    name: 'Pangsit Express',
    description:
      'Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.',
    city: 'Surabaya',
    address: 'Jln. Pandeglang no 19',
    pictureId: '43',
    categories: [{ name: 'Modern' }],
    menus: {
      foods: [{ name: 'Ikan teri dan roti' }, { name: 'Bebek crepes' }],
      drinks: [
        { name: 'Air' },
        { name: 'Coklat panas' },
        { name: 'Kopi espresso' },
      ],
    },
    rating: 4.8,
    customerReviews: [
      {
        name: 'Ahmad',
        review: 'Tempatnya bagus namun menurut saya masih sedikit mahal.',
        date: '13 Juli 2019',
      },
    ],
  },
};
