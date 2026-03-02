import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
  keymap,
} from "@codemirror/view";
import { StateEffect, StateField, Transaction } from "@codemirror/state";
import { State } from "@inngest/agent-kit";
import { effect } from "zod/v3";
import { create } from "domain";
const setSuggestionEffect = StateEffect.define<string | null>();
//StateEffect: A way to send "messages" to update state
// We define one effect type for settings the suggestion text
// StateField: Holds our suggestion state in the editor.
// create()- returns the initial value when the editor loads
//update()- Called on every transaction (keystroke) to potentially update the value
const suggestionState = StateField.define<string | null>({
  create() {
    return null;
  },
  update(value, transaction) {
    //Check each effect in this transaction
    //If we find our setSuggestionEffect, return its new value
    //Otherwise, keep the current value unchanged
    for (const effect of transaction.effects) {
      if (effect.is(setSuggestionEffect)) {
        return effect.value;
      }
    }
    return value;
  },
});
// WidgetType: creates custom DOM elements to display in the editor.
// the toDOM() is called by CodeMirror to create the actual HTML element.

class SuggestionWidget extends WidgetType {
  constructor(readonly text: string) {
    super();
  }
  toDOM() {
    const span = document.createElement("span");
    span.textContent = this.text;
    span.style.opacity = "0.4"; //Ghost text appearance
    span.style.pointerEvents = "none"; //Don't interfere with clicks
    return span;
  }
}
let debounceTimer: number | null = null;
let isWaitingForSuggestion = false;
const DEBOUNCE_DELAY = 300;
const generateFakeSuggestion = (textBeforeCursor: string): string | null => {
  const trimmed = textBeforeCursor.trimEnd();
  if (trimmed.endsWith("const")) return "myVariable = ";
  return null;
};
const createDebouncePlugin = (fileName: string) => {
  return ViewPlugin.fromClass(
    class {
      constructor(view: EditorView) {
        this.triggerSuggestion(view);
      }
      update(update: ViewUpdate) {
        if (update.docChanged || update.selectionSet) {
          this.triggerSuggestion(update.view);
        }
      }
      triggerSuggestion(view: EditorView) {
        if (debounceTimer !== null) {
          clearTimeout(debounceTimer);
        }
        isWaitingForSuggestion = true;
        debounceTimer = window.setTimeout(async () => {
          //Fake suggestion here for a while
          const cursor = view.state.selection.main.head;
          const line = view.state.doc.lineAt(cursor);
          const textBeforeCursor = line.text.slice(0, cursor - line.from);
          const suggestion = generateFakeSuggestion(textBeforeCursor);
          isWaitingForSuggestion = false;
          view.dispatch({
            effects: setSuggestionEffect.of(suggestion), //Update the suggestion state with the new suggestion text
          });
        }, DEBOUNCE_DELAY);
      }
      destroy() {
        if (debounceTimer != null) {
          clearTimeout(debounceTimer);
        }
      }
    },
  );
};
const renderPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;
    constructor(view: EditorView) {
      this.decorations = this.build(view);
    }
    update(update: ViewUpdate) {
      //Rebuild decorations if doc changed, cursor moved, or suggestion moved
      const suggestionChanged = update.transactions.some((transaction) => {
        return transaction.effects.some((effect) => {
          return effect.is(setSuggestionEffect);
        });
      });
      //Rebuild decorations if doc changed, cursor moved, or suggestion changed
      const shouldRebuild =
        update.docChanged || update.selectionSet || suggestionChanged;
      if (shouldRebuild) {
        this.decorations = this.build(update.view);
      }
    }
    build(view: EditorView) {
      if (isWaitingForSuggestion) {
        return Decoration.none; //Don't show old suggestion while waiting for new one
      }
      //Get current suggestion from state
      const suggestion = view.state.field(suggestionState);
      if (!suggestion) {
        return Decoration.none;
      }
      //Create a widget decoration at the cursor position
      const cursor = view.state.selection.main.head;
      return Decoration.set([
        Decoration.widget({
          widget: new SuggestionWidget(suggestion),
          side: 1, // Render after the cursor (side:1), not before (side:-1)
        }).range(cursor),
      ]);
    }
  },
  {
    decorations: (plugin) => plugin.decorations, // Tell CodeMirror to use our decorations
  },
);
const acceptSuggestionKeymap = keymap.of([
  {
    key: "Tab",
    run: (view) => {
      const suggestion = view.state.field(suggestionState);
      if (!suggestion) {
        return false; //No suggestions found, let Tab do its normal behavior (indent)
      }
      const cursor = view.state.selection.main.head;
      view.dispatch({
        changes: { from: cursor, insert: suggestion }, //Insert the suggestion text at the cursor position
        selection: { anchor: cursor + suggestion.length }, //Move cursor to the end of the inserted suggestion
        effects: setSuggestionEffect.of(null), //Clear the suggestion after accepting
      });
      return true; // We handled the Tab key, prevent default behavior
    },
  },
]);
export const suggestion = (fileName: string) => [
  suggestionState, //Our state storage
  createDebouncePlugin(fileName), //Handles triggering suggestions with debounce while typing
  renderPlugin, // Renders the ghost text
  acceptSuggestionKeymap, // Tab to accept the suggestion
];
