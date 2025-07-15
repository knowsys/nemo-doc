export interface Type {
  description: string;
}

export interface Parameter {
  name: string;
  types: Type[];
  description: string;
  example?: string;
  default?: string;
}
const IRI: Type = { description: "IRI" };
const String: Type = { description: "String" };
const Integer: Type = { description: "Unsigned integer" };
const Boolean: Type = { description: "Boolean" };
const Char: Type = { description: "Character" };
const Tuple: Type = { description: "Tuple of Nemo type names" };
const Value: Type = { description: "Nemo type name" };
const HeaderMap: Type = {
  description:
    "Map with key-value pairs that can be of type: String, Constant or Number",
};
const ParamMap: Type = {
  description:
    "Map where each key is of type String, Constant or Number and each value is a (possibly unary) tuple containing Strings, Numbers and Constants.",
};

export const resource: Parameter = {
  name: "resource",
  types: [IRI, String],
  description: `The file name to write to.
    If it contains an extension, this is used to automatically set the <code>compression</code> parameter. 
    If set to the empty string <code>\"\"</code>, the tuples are read from <code>stdin</code>. 
    This is restricted to one <code>stdin</code> resource per program. If omitted, this is set based on the predicate name, 
    file format and compression type <code>&lt;predicate-name&gt;.&lt;format&gt;.&lt;compression&gt;</code>.`,
};

export const format: Parameter = {
  name: "format",
  types: [Tuple, Value],
  description: `The input-format of the imported data.
  Can be <code>int</code>, <code>double</code>, <code>string</code>, <code>rdf</code> or <code>skip</code>.`,
};

export const compression: Parameter = {
  name: "compression",
  types: [String],
  description: `The compression to use. Currently only <code>gzip</code> or <code>none</code> is supported. '
    This will normally be guessed correctly from the file extension, 
    but can be useful for non-standard file names or URLs.`,
};

export const limit: Parameter = {
  name: "limit",
  types: [Integer],
  description:
    "The maximum number of tuples to import (great for testing when working with large files).",
};

export const delimiter: Parameter = {
  name: "delimiter",
  types: [Char],
  description: "The delimiter to use.",
};

export const ignore_headers: Parameter = {
  name: "ignore_headers",
  types: [Boolean],
  description:
    "if <code>true</code>, the first record (containing the column headers) is ignored.",
  default: "false",
};

export const quoting: Parameter = {
  name: "quoting",
  types: [Boolean],
  description:
    'if <code>true</code> (the default), quotation marks <code>"</code> in the input are interpreted. This allows, e.g., reading values containing the delimiter. Cannot currently be disabled for writing.',
  default: "true",
};

export const http_headers: Parameter = {
  name: "http_headers",
  types: [HeaderMap],
  description: "Each pair is added as HTTP headers when making an HTTP request",
  example: 'http_headers=("Accept-Language"="en-US","Accept-Charset="utf-8")',
};

export const http_get_parameters: Parameter = {
  name: "http_get_parameters",
  types: [ParamMap],
  description:
    "The map will be flattened into pairs that are appended to the IRI before making an HTTP request",
  example:
    'http_get_parameters={name="John Doe", age=42, parent=("Johanna Doe", "Josh Doe")}',
};

export const http_post_parameters: Parameter = {
  name: "http_post_parameters",
  types: [ParamMap],
  description:
    "The map will be flattened into pairs that are sent as the body of an HTTP POST request",
  example:
    'http_post_parameters={name="John Doe", age=42, parent=("Johanna Doe", "Josh Doe")}',
};

export const iri_fragment: Parameter = {
  name: "iri_fragment",
  types: [String],
  description:
    "A fragment that is appended to a <code>resource</code> or <code>endpoint</code> IRI",
};

export const base: Parameter = {
  name: "base",
  types: [String],
  description:
    "Specify the base IRI to be used when importing RDF data; if given, relative IRIs will be made absolute based on this base; otherwise, relative IRIs remain relative in Nemo",
};

export const endpoint: Parameter = {
  name: "endpoint",
  types: [IRI, String],
  description: "Any endpoint that supports SPARQL queries.",
};

export const query: Parameter = {
  name: "query",
  types: [String],
  description:
    "The SPARQL query sent to the endpoint. The query will be validated before sending. Make sure to include all necessary prefixes.",
};
