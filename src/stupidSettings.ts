import { TextDocuments, ClientCapabilities } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';

export class SettingsState {
  constructor() {
    this.maxErrorsComputed = 5000;
    this.charsComparassion = [
      ['(', ')'],
      ['[', ']'],
    ];
    this.disableBadLanguage = false;
  }

  documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);
  capabilities: ClientCapabilities | undefined;
  maxErrorsComputed: number;
  charsComparassion: string[][];
  disableBadLanguage: boolean;
}
