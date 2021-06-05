export type Styles = {
  city: string;
  container: string;
  error: string;
  flail: string;
  header: string;
  loading: string;
  pour: string;
  pulse: string;
  rating: string;
  reviewContainer: string;
  spinAround: string;
  starFill: string;
  starOutline: string;
  subtitle: string;
  this: string;
  title: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
