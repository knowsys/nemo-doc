
interface Type {
  description: string
}

export interface Parameter {
  name: string,
  types: Type[],
  description: string,
  example?: string,
}

const String: Type = {
  description: 'String'
};

const Char: Type = {
  description: 'Char'
};

export const resource: Parameter = {
    name: 'resource',
    types: [String],
    description: 'This is a test with ``` code ```',
    example: 'resource=<https://example.org/path/to/file.csv>'
  };

export const delimiter: Parameter = {
  name: 'delimiter',
  types: [String, Char],
  description: 'This is a test without code'
};


