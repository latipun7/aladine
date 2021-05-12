export type Styles = {
  bottom: string;
  scrollButton: string;
  scrolled: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
