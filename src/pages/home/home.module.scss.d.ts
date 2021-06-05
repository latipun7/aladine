export type Styles = {
  gridContainer: string;
  isLoading: string;
  loading: string;
  pour: string;
  pulse: string;
  spinAround: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
