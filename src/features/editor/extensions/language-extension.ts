import type { Extension } from "@codemirror/state";

import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { sql } from "@codemirror/lang-sql";
import { rust } from "@codemirror/lang-rust";
import { xml } from "@codemirror/lang-xml";

/**
 * Returns a CodeMirror language extension based on filename.
 * Defaults to plain JavaScript if unknown.
 */
export const getLanguageExtension = (filename: string): Extension => {
  const ext = filename.split(".").pop()?.toLowerCase();

  switch (ext) {
    // JavaScript / TypeScript
    case "js":
      return javascript();

    case "jsx":
      return javascript({ jsx: true });

    case "ts":
      return javascript({ typescript: true });

    case "tsx":
      return javascript({ typescript: true, jsx: true });

    // Markup / styles
    case "html":
      return html();

    case "css":
      return css();

    // Data / config
    case "json":
      return json();

    // Markdown
    case "md":
    case "mdx":
      return markdown();

    // Backend / systems
    case "py":
      return python();

    case "java":
      return java();

    case "sql":
      return sql();

    case "rs":
      return rust();

    case "xml":
      return xml();

    // Fallback
    default:
      return javascript();
  }
};
