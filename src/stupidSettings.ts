import { TextDocuments, ClientCapabilities } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';

export class SettingsState {
  constructor() {
    this.maxErrorsComputed = 5000;
    this.charsComparassion = [['(', ')'], ['[', ']']];
    this.disableBadLanguage = false;
  }

  documents: TextDocuments<TextDocument> | TextDocumentTestManager =
    new TextDocuments(TextDocument);
  capabilities: ClientCapabilities | undefined;
  maxErrorsComputed: number;
  charsComparassion: string[][];
  disableBadLanguage: boolean;
}

export class TextDocumentTestManager extends TextDocuments<TextDocument> {
  testTextDocuments = new Map<string, TextDocument>();

  constructor() {
    super(TextDocument);
  }

  get(uri: string): TextDocument | undefined {
    return this.testTextDocuments.get(uri);
  }

  set(textDocument: TextDocument): void {
    this.testTextDocuments.set(textDocument.uri, textDocument);
  }
}
