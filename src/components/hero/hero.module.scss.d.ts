export type Styles = {
  hero: string;
  lamp: string;
  lemonade: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
