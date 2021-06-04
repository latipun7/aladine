export type Styles = {
  favoriteButton: string;
  loading: string;
  spinAround: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
