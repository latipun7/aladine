export type Styles = {
  addButton: string;
  buttonGroup: string;
  container: string;
  error: string;
  overlay: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
