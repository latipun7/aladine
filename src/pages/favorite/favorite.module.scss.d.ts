export type Styles = {
  gridContainer: string;
  isLoading: string;
  loading: string;
  spinAround: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
