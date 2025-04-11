
export interface Type {
  description: string
}

export interface Parameter {
  name: string,
  types: Type[],
  description: string,
  example?: string,
}
const IRI: Type = {description: 'IRI'};
const String: Type = {description: 'String'};
const Number: Type = {description: 'Number'};
const Boolean: Type = {description: 'Boolean'};
const Char: Type = {description: 'Char'};
const Tuple: Type = {description: 'Tuple'};
const Value: Type = {description: 'Value'};
const HeaderMap: Type = {description: 'Map'};
const ParamMap: Type = {description: 'Map'};

export const resource: Parameter = { 
  name: 'resource', 
  types: [IRI, String], 
  description: `The file name to write to. 
    If it contains an extension, this is used to automatically set the <code>compression</code> parameter. 
    If set to the empty string <code>\"\"</code>, the tuples are read from <code>stdin</code>. 
    This is restricted to one <code>stdin</code> resource per program. If omitted, this is set based on the predicate name, 
    file format and compression type <code>&lt;predicate-name&gt;.&lt;format&gt;.&lt;compression&gt;</code>.`
};

export const format: Parameter = { 
  name: 'format', 
  types: [Tuple, Value], 
  description: `The input-format of the imported data. 
  Might be <code>int</code>, <code>double</code>, <code>string</code>, <code>rdf</code> or <code>skip</code>.`
};

export const compression: Parameter = { 
  name: 'compression', 
  types: [String], 
  description: `The compression to use. Currently only <code>gzip</code> or <code>none</code> is supported. '
    This will normally be guessed correctly from the file extension, 
    but can be useful for non-standard file names or URLs.`
  };
  
export const limit: Parameter = { 
  name: 'limit', 
  types: [Number], 
  description: 'The maximum number of tuples to export. (great for testing when working with large files) '
};

export const delimiter: Parameter = { 
  name: 'delimiter', 
  types: [String], 
  description: 'The delimiter to use. '
};

export const ignore_headers: Parameter = { 
  name: 'ignore_headers', 
  types: [Boolean], 
  description: 'if <code>true</code>, the first record (containing the column headers) is ignored '
};

export const http_headers: Parameter = {
  name: 'http_headers', 
  types: [HeaderMap], 
  description: 'Each pair is added as HTTP headers when making an HTTP request '
};

export const http_get_parameters: Parameter = {
  name: 'http_get_parameters', 
  types: [ParamMap], 
  description: 'The map will be flattened into pairs that are appended to the IRI before making an HTTP request '
};

export const http_post_parameters: Parameter = {
  name: 'http_post_parameters', 
  types: [ParamMap], 
  description: 'The map will be flattened into pairs that are sent as the body of an HTTP POST request '
};

export const iri_fragment: Parameter = {
  name: 'iri_fragment', 
  types: [String], 
  description: 'add a fragment to a <code>resource</code> or <code>endpoint</code> IRI'
};

export const base: Parameter = {
  name: 'base', 
  types: [String], 
  description: 'Specify the base IRI to be used when importing RDF data; if given, relative IRIs will be made absolute based on this base; otherwise, relative IRIs remain relative in Nemo'
};

export const endpoint: Parameter = {
  name: 'endpoint', 
  types: [IRI, String], 
  description: 'Any endpoint that implements the W3C SPARQL standard. '
};

export const query: Parameter = {
  name: 'query', 
  types: [String], 
  description: 'The SPARQL query sent to the endpoint. The query will be validated before sending. Make sure to include all necessary prefixes. '
};
