export type Styles = {
  city: string;
  container: string;
  flail: string;
  header: string;
  rating: string;
  starFill: string;
  starOutline: string;
  stars: string;
  title: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
