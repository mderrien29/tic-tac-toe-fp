export interface AnyError {
  readonly _tag: string;
  readonly message: string;
}

export interface UnclassifiedError extends AnyError {
  readonly _tag: 'UnclassifiedError';
}

export interface TechError extends AnyError {
  readonly _tag: 'TechError';
}

export interface PlayerError extends AnyError {
  readonly _tag: 'PlayerError';
}
