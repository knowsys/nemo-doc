import { useState } from "react";

const parameterDetails = {
  resource: { 
    name: <><code>resource</code></>, 
    type: "IRI, String", 
    description: <>The file name to write to. 
      If it contains an extension, this is used to automatically set the <code>compression</code> parameter. 
      If set to the empty string <code>""</code>, the tuples are read from stdin until pressing <code>Ctrl + D</code>. 
      This is restricted to one stdin resource per program. If omitted, this is set based on the predicate name, 
      file format and compression type: <code>&lt;predicate-name&gt;.&lt;format&gt;.&lt;compression&gt;</code>.</> 
  },
  format: { 
    name: <><code>format</code></>, 
    type: "tuple, single value", 
    description: <>The input-format of the imported data. 
      Might be <code>int</code>, <code>double</code>, <code>string</code>, <code>rdf</code> or <code>skip</code>.</> 
  },
  compression: { 
    name: <><code>compression</code></>, 
    type: "String", 
    description: <>The compression to use. Currently only <code>gzip</code> or <code>none</code> is supported. 
      This will normally be guessed correctly from the file extension, 
      but can be useful for non-standard file names or URLs</> 
    },
  limit: { 
    name: <><code>limit</code></>, 
    type: "Number", 
    description: "The maximum number of tuples to export. (great for testing when working with large files)" 
  },
  delimiter: { 
    name: <><code>delimiter</code></>, 
    type: "String", 
    description: "The delimiter to use." 
  },
  ignore_headers: { 
    name: <><code>ignore_headers</code></>, 
    type: <><code>true</code> or <code>false</code></>, 
    description: <>if <code>true</code>, the first record (containing the column headers) is ignored </>
  },
  http_headers: {
    name: <><code>http_headers</code></>, 
    type: "map with single values", 
    description: "Each pair is added as HTTP headers when making an HTTP request" 
  },
  http_get_parameters: {
    name: <><code>http_get_parameters</code></>, 
    type: "map with single values or tuples of values", 
    description: "The map will be flattened into pairs that are appended to the IRI before making an HTTP request" 
  },
  http_post_parameters: {
    name: <><code>http_post_parameters</code></>, 
    type: "map with single values or tuples of values", 
    description: "The map will be flattened into pairs that are sent as the body of an HTTP POST request" 
  },
  iri_fragment: {
    name: <><code>iri_fragment</code></>, 
    type: "String", 
    description: <>add a fragment to a <code>resource</code> or <code>endpoint</code> IRI</>
  },
  base: {
    name: <><code>base</code></>, 
    type: "String", 
    description: "specify the base IRI to be used when importing RDF data; if given, relative IRIs will be made absolute based on this base; otherwise, relative IRIs remain relative in Nemo"
  },
  endpoint: {
    name: <><code>endpoint</code></>, 
    type: "IRI, String", 
    description: "Any endpoint that implements the W3C SPARQL standard." 
  },
  query: {
    name: <><code>query</code></>, 
    type: "String", 
    description: "The SPARQL query sent to the endpoint. The query will be validated before sending. Make sure to include all necessary prefixes." 
  },
};

const parameters = {
  csv: ["resource","format","compression","limit","ignore_headers","http_headers","http_get_parameters","http_post_parameters","iri_fragment"],
  dsv: ["resource","format","compression","limit","ignore_headers","delimiter","http_headers","http_get_parameters","http_post_parameters","iri_fragment"],
  //tsv: ["resource","format","compression","limit","ignore_headers","http_headers","http_get_parameters","http_post_parameters","iri_fragment"],
  rdf: ["resource","format","compression","limit","base","http_headers","http_get_parameters","http_post_parameters","iri_fragment"],
  //nquads: ["resource","format","compression","limit","base","http_headers","http_get_parameters","http_post_parameters","iri_fragment"],
  //trig: ["resource","format","compression","limit","base","http_headers","http_get_parameters","http_post_parameters","iri_fragment"],
  //ntriples: ["resource","format","compression","limit","base","http_headers","http_get_parameters","http_post_parameters","iri_fragment"],
  //rdfxml: ["resource","format","compression","limit","base","http_headers","http_get_parameters","http_post_parameters","iri_fragment"],
  //turtle: ["resource","format","compression","limit","base","http_headers","http_get_parameters","http_post_parameters","iri_fragment"],
  json: ["resource","format","compression","http_headers","http_get_parameters","http_post_parameters","iri_fragment"],
  sparql: ["endpoint","query","http_headers","http_get_parameters","http_post_parameters","iri_fragment"],

};


export default function InteractiveTable() {
  const [selectedFormat, setSelectedFormat] = useState("json");
  const parametersToShow = parameters[selectedFormat];

  return (
    <div>
      {/* Format Switcher */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}>
        {Object.keys(parameters).map((format) => (
          <button
            key={format}
            onClick={() => setSelectedFormat(format)}
            style={{
              padding: "8px 16px", // Consistent padding (horizontal + vertical)
              margin: "0",                border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: selectedFormat === format ? "#0070f3" : "#eee",
              color: selectedFormat === format ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {format.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Parameter Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Description</th>
          </tr>
        </thead>
        <tbody>
          {parametersToShow.map((paramKey) => {
            const param = parameterDetails[paramKey];


            return (
              <tr key={paramKey}>
                <td style={tdStyle}>{param.name}</td>
                <td style={tdStyle}>{param.type}</td>
                <td style={tdStyle}>{param.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  border: "1px solid #ccc",
  backgroundColor: "#f5f5f5",
  padding: "8px",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px",
};