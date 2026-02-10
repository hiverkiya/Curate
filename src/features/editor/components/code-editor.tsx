import { useEffect, useMemo, useRef } from "react";
import { EditorView, keymap } from "@codemirror/view";
import { oneDark } from "@codemirror/theme-one-dark";

import { customTheme } from "@/features/editor/extensions/theme";
import { getLanguageExtension } from "@/features/editor/extensions/language-extension";
import { minimap } from "@/features/editor/extensions/minimap";
import { indentationMarkers } from "@replit/codemirror-indentation-markers";
import { customSetup } from "@/features/editor/extensions/custom-setup";

interface Props {
  fileName: string;
  initialValue?: string;
  onChange: (value: string) => void;
}

export const CodeEditor = ({
  fileName,
  initialValue = "",
  onChange,
}: Props) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const languageExtension = useMemo(
    () => getLanguageExtension(fileName),
    [fileName],
  );

  useEffect(() => {
    if (!editorRef.current) return;

    const view = new EditorView({
      doc: initialValue,
      parent: editorRef.current,
      extensions: [
        // Theme
        oneDark,
        customTheme,

        // Core editor features
        customSetup,

        // Language
        languageExtension,

        // Extra IDE features
        indentationMarkers(),
        minimap(),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
      ],
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, [languageExtension]);

  return <div ref={editorRef} className="size-full pl-4 bg-background" />;
};
