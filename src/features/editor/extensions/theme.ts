import { EditorView } from "@codemirror/view";

export const customTheme = EditorView.theme({
  "&": {
    outline: "none !important",
    height: "100%",
  },

  ".cm-content": {
    fontFamily: "var(--font-jetbrains-mono), var(--font-plex-mono), monospace",
    fontSize: "14px",
    fontWeight: 300,
    lineHeight: "1.5",
    fontVariantLigatures: "none",
    fontFeatureSettings: '"liga" 0',
  },

  ".cm-cursor": {
    borderLeftWidth: "2px",
  },

  ".cm-scroller": {
    scrollbarWidth: "thin",
    scrollbarColor: "#3f3f46 transparent",
  },
});
