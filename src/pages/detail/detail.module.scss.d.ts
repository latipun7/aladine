export type Styles = {
  city: string;
  container: string;
  error: string;
  flail: string;
  header: string;
  loading: string;
  rating: string;
  reviewContainer: string;
  spinAround: string;
  starFill: string;
  starOutline: string;
  stars: string;
  subtitle: string;
  this: string;
  title: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
