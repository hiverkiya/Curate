import { Extension } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { go } from "@codemirror/lang-go";
import { rust } from "@codemirror/lang-rust";
import { php } from "@codemirror/lang-php";
import { sql } from "@codemirror/lang-sql";
import { xml } from "@codemirror/lang-xml";
import { yaml } from "@codemirror/lang-yaml";
import { sass } from "@codemirror/lang-sass";
import { less } from "@codemirror/lang-less";

export const getLanguageExtension = (filename: string): Extension => {
  const ext = filename.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "js":
      return javascript();
    case "jsx":
      return javascript({ jsx: true });
    case "ts":
      return javascript({ typescript: true });
    case "tsx":
      return javascript({ typescript: true, jsx: true });
    case "html":
    case "htm":
      return html();
    case "css":
      return css();
    case "json":
      return json();
    case "md":
    case "mdx":
      return markdown();
    case "py":
      return python();
    case "java":
      return java();
    case "cpp":
    case "cc":
    case "cxx":
    case "c++":
    case "h":
    case "hpp":
    case "hxx":
      return cpp();
    case "go":
      return go();
    case "rs":
      return rust();
    case "php":
      return php();
    case "sql":
      return sql();
    case "xml":
    case "svg":
      return xml();
    case "yaml":
    case "yml":
      return yaml();
    case "scss":
    case "sass":
      return sass();
    case "less":
      return less();
    default:
      return javascript(); // Default to JavaScript if unknown extension
  }
};
