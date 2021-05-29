export type Styles = {
  city: string;
  description: string;
  detailContainer: string;
  flail: string;
  loading: string;
  rating: string;
  spinAround: string;
  starFill: string;
  starOutline: string;
  stars: string;
  title: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
