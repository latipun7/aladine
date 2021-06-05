export type Styles = {
  copyright: string;
  icon: string;
  pour: string;
  pulse: string;
  spinAround: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
