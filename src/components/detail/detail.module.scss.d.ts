export type Styles = {
  city: string;
  container: string;
  error: string;
  favoriteButton: string;
  flail: string;
  header: string;
  loading: string;
  rating: string;
  spinAround: string;
  starFill: string;
  starOutline: string;
  stars: string;
  this: string;
  title: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
