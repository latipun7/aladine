import axios from 'axios';
import type { AxiosInstance } from 'axios';

type Category = { name: string };

type Menu = {
  foods: Category[];
  drinks: Category[];
};

type CustomerReview = {
  name: string;
  review: string;
  date: string;
};

type RestaurantDetail = {
  id: string;
  name: string;
  description: string;
  pictureId: string;
  city: string;
  rating: number;
  address: string;
  categories: Category[];
  menus: Menu;
  customerReviews: CustomerReview[];
};

export type Restaurant = Omit<
  RestaurantDetail,
  'address' | 'categories' | 'menus' | 'customerReviews'
>;

interface Response {
  error: boolean;
  message: string;
  count: number;
  founded: number;
}

interface List extends Response {
  restaurants: Restaurant[];
}

interface Detail extends Response {
  restaurant: RestaurantDetail;
}

interface Review extends Response {
  customerReviews: CustomerReview[];
}

type ListResponse = Omit<List, 'founded'>;
type DetailResponse = Omit<Detail, 'count' | 'founded'>;
type SearchResponse = Omit<List, 'count' | 'message'>;
type ReviewResponse = Omit<Review, 'count' | 'founded'>;

class RestaurantAPI {
  axios: AxiosInstance;

  constructor(
    public baseURL = 'https://restaurant-api.dicoding.dev',
    public apiKey = '12345'
  ) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.axios = axios.create({
      baseURL: this.baseURL,
      headers: { 'X-Auth-Token': this.apiKey },
    });
  }

  static #handleError(error: unknown) {
    if (axios.isAxiosError<Response>(error)) {
      if (error.response) {
        throw new Error(error.response.data.message);
      }

      throw new Error(error.message);
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error('Sorry, something went wrong.');
  }

  async getList() {
    try {
      const { data } = await this.axios.get<ListResponse>('/list');

      return data;
    } catch (error) {
      throw RestaurantAPI.#handleError(error);
    }
  }

  async getDetail(id: string) {
    try {
      const { data } = await this.axios.get<DetailResponse>(`/detail/${id}`);

      return data;
    } catch (error) {
      throw RestaurantAPI.#handleError(error);
    }
  }

  async search(query: string) {
    try {
      const { data } = await this.axios.get<SearchResponse>(
        `/search?q=${query}`
      );

      if (data.founded === 0) {
        throw new Error(`Sorry, "${query}" not found.`);
      }

      return data;
    } catch (error) {
      throw RestaurantAPI.#handleError(error);
    }
  }

  async addReview(review: { id: string; name: string; review: string }) {
    try {
      const { data } = await this.axios.post<ReviewResponse>('/review', review);

      return data;
    } catch (error) {
      throw RestaurantAPI.#handleError(error);
    }
  }

  pictureLink(id?: string, resolution: 'small' | 'medium' | 'large' = 'small') {
    if (id) return `${this.baseURL}/images/${resolution}/${id}`;
    return undefined;
  }
}

export default RestaurantAPI;
