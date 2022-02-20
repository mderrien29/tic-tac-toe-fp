export interface UnclassifiedError {
  readonly _tag: 'UnclassifiedError';
  readonly message: string;
}

export interface TechError {
  readonly _tag: 'TechError';
  readonly message: string;
}

export interface PlayerError {
  readonly _tag: 'PlayerError';
  readonly message: string;
}
