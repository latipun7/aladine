export type Styles = {
  hero: string;
  lamp: string;
  lemonade: string;
  pour: string;
  pulse: string;
  readyToPour: string;
  spinAround: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
