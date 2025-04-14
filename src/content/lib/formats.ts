import {resource, delimiter,format,compression,limit,ignore_headers, http_headers,http_get_parameters,http_post_parameters,iri_fragment, base, endpoint,query ,type Parameter} from './parameters.ts';
import type { HTMLAttributes } from 'astro/types'


function createFormats<T extends Record<K, Format>, K extends string>(o: T) {
  return o
}


export type Direction  = 'import' | 'export' | 'both';

export interface Format {
    name: string,
    io: Direction,
    description: string,
    parameters: Parameter[],
}

export const formats = createFormats({
  csv : {
    name: `csv`,
    io: 'both',
    description: 'Comma-separated values.',
    parameters: [resource,format,compression,limit,ignore_headers,http_headers,http_get_parameters,http_post_parameters,iri_fragment],
  },

  dsv : {
    name: `dsv`,
    io: 'both',
    description: 'Delimited separated values. (Like <code>csv</code>, but allows specifying different delimiters e.g. <code>delimiter=";"</code>)',
    parameters: [delimiter, resource,format,compression,limit,ignore_headers,http_headers,http_get_parameters,http_post_parameters,iri_fragment],
  },

  tsv : {
    name: `tsv`,
    io: 'both',
    description: 'Tab-separated values.',
    parameters: [resource,format,compression,limit,ignore_headers,http_headers,http_get_parameters,http_post_parameters,iri_fragment],
  },

  rdf : {
    name: `rdf`,
    io: 'both',
    description: 'Generic RDF format. The actual format will be guessed using the file name.',
    parameters: [base, resource,format,compression,limit,http_headers,http_get_parameters,http_post_parameters,iri_fragment],
  },

  nquads : {
    name: `nquads`,
    io: 'both',
    description: 'RDF NQuads format.',
    parameters: [resource,format,compression,limit,base,http_headers,http_get_parameters,http_post_parameters,iri_fragment],
  },

  trig : {
    name: `trig`,
    io: 'both',
    description: 'RDF TriG format.',
    parameters: [resource,format,compression,limit,base,http_headers,http_get_parameters,http_post_parameters,iri_fragment],
  },

  ntriples : {
    name: `ntriples`,
    io: 'both',
    description: 'RDF Ntriples format',
    parameters: [resource,format,compression,limit,base,http_headers,http_get_parameters,http_post_parameters,iri_fragment],
  },

  rdfxml : {
    name: `rdfxml`,
    io: 'both',
    description: 'RDF/XML format.',
    parameters: [resource,format,compression,limit,base,http_headers,http_get_parameters,http_post_parameters,iri_fragment],
  },

  turtle : {
    name: `turtle`,
    io: 'both',
    description: 'RDF Turtle format.',
    parameters: [resource,format,compression,limit,base,http_headers,http_get_parameters,http_post_parameters,iri_fragment],
  },

  sparql : {
    name: `sparql`,
    io: 'import',
    description: 'SPARQL query format.',
    parameters: [endpoint,query,http_headers,http_get_parameters,http_post_parameters,iri_fragment],
  },

  json : {
    name: `json`,
    io: 'import',
    description: 'JSON triples.',
    parameters: [resource,format,compression,http_headers,http_get_parameters,http_post_parameters,iri_fragment], 
  },
});

export function checkIODirection(format: Format, direction: Direction): boolean{
 return format.io === direction || format.io === 'both';
}