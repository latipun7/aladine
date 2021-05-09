export type Styles = {
  hero: string;
  lamp: string;
  lemonade: string;
  pour: string;
  readyToPour: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
