
export type Style = 'css' | 'scss' | 'less' | 'stylus' | 'postcss';
export type Lang = 'js' | 'ts';

export interface ComponentGeneratorSchema {
    name: string;
    project: string;
    directory?: string;
    scoped: boolean;
    style: Style;
    lang: Lang;
  }
