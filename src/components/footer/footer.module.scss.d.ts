export type Styles = {
  copyright: string;
  icon: string;
  pulse: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
