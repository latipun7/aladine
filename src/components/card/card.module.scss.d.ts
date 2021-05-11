export type Styles = {
  cardContainer: string;
  city: string;
  description: string;
  flail: string;
  rating: string;
  starFill: string;
  starOutline: string;
  stars: string;
  title: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
