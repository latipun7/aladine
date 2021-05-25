type ResponsiveImageOutput = {
  height: number;
  images: { height: number; path: string; width: number }[];
  placeholder: string;
  src: string;
  srcSet: string;
  toString: () => string;
  width: number;
};

declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

declare module '*.svg' {
  const svg: string;
  export = svg;
}

declare module '*.png' {
  const content: ResponsiveImageOutput;
  export = content;
}

declare module '*.jpg' {
  const content: ResponsiveImageOutput;
  export = content;
}

declare module '*.jpeg' {
  const content: ResponsiveImageOutput;
  export = content;
}

declare module '*.webp' {
  const content: ResponsiveImageOutput;
  export = content;
}

declare module '*.gif' {
  const content: ResponsiveImageOutput;
  export = content;
}

declare module '*.bmp' {
  const content: ResponsiveImageOutput;
  export = content;
}

declare module '*.html' {
  const html: string;
  export = html;
}
