import { TextDocuments } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';

export class SettingsState {
  documents: TextDocuments<TextDocument> | TextDocumentTestManager =
    new TextDocuments(TextDocument);
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
