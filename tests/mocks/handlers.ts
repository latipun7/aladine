import RestaurantAPI from 'lib/restaurant-api';
import { rest } from 'msw';
import type {
  AddCustomerReview,
  DetailResponse,
  ListResponse,
  ReviewResponse,
} from 'lib/restaurant-api';

import { PangsitExpressDetail, RestaurantsList } from './response-data';

const api = new RestaurantAPI();
const { baseURL } = api;

const pangsitExpress = { ...PangsitExpressDetail };

const handlers = [
  rest.get(`${baseURL}/list`, (_, response, context) =>
    response(context.status(200), context.json<ListResponse>(RestaurantsList))
  ),

  rest.get(`${baseURL}/detail/:id`, (request, response, context) => {
    const { id } = request.params;

    if (id === 'dy62fuwe6w8kfw1e867') {
      return response(
        context.status(200),
        context.json<DetailResponse>(pangsitExpress)
      );
    }

    return response(
      context.status(404),
      context.json({
        error: true,
        message: 'Restaurant ID not match.',
      })
    );
  }),

  rest.post<AddCustomerReview>(
    `${baseURL}/review`,
    (request, response, context) => {
      const { id, name, review } = request.body;
      const newReview = {
        id,
        name,
        review,
        date: new Date().toLocaleDateString(),
      };

      if (id === 'dy62fuwe6w8kfw1e867') {
        pangsitExpress.restaurant.customerReviews.push(newReview);

        return response(
          context.status(200),
          context.json<ReviewResponse>({
            error: false,
            message: 'success',
            customerReviews: pangsitExpress.restaurant.customerReviews,
          })
        );
      }

      return response(
        context.status(404),
        context.json({ error: true, message: 'Restaurant ID not match.' })
      );
    }
  ),
];

export default handlers;
