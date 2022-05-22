import { TextDocuments, ClientCapabilities } from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';

export interface Settings {
  messages: {
    disableBadLanguage: boolean;
  };
  validation: {
    maxErrorsComputed: number;
    charsComparassion: string[][];
    excludeEndedWith: string[];
    excludeBeginningWith: string[];
  };
}

export class SettingsState {
  constructor() {
    this.charsComparassion = [
      ['(', ')'],
      ['[', ']'],
    ];
    this.excludeEndedWith = ["'", '"'];
    this.excludeBeginningWith = ['"', "'"];
  }

  documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);
  capabilities: ClientCapabilities | undefined;
  maxErrorsComputed = 5000;
  charsComparassion: string[][];
  disableBadLanguage = false;
  excludeEndedWith: string[];
  excludeBeginningWith: string[];
  hasConfigurationCapability = false;
  clientDynamicRegisterSupport = false;
}
