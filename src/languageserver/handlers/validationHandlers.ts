import {
  Connection,
  Diagnostic,
  DiagnosticSeverity,
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { SettingsState } from '../../stupidSettings';

export class ValidationHandler {
  private stupidSettings: SettingsState;
  constructor(
    private readonly connection: Connection,
    settingsLanguage: SettingsState
  ) {
    this.stupidSettings = settingsLanguage;

    this.stupidSettings.documents.onDidChangeContent((change) => {
      this.validate(change.document);
    });

    this.stupidSettings.documents.onDidClose((event) => {
      this.connection.sendDiagnostics({
        uri: event.document.uri,
        diagnostics: [],
      });
    });
  }

  validate(textDocument: TextDocument): void {
    const text = textDocument.getText();
    const patterr = /\b[A-Z]{2,}\b/g;
    let m: RegExpExecArray | null;

    const diagnostics: Diagnostic[] = [];
    while ((m = patterr.exec(text))) {
      const diagnostic: Diagnostic = {
        severity: DiagnosticSeverity.Warning,
        range: {
          start: textDocument.positionAt(m.index),
          end: textDocument.positionAt(m.index + m[0].length),
        },
        message: `${m[0]} is all uppercase.`,
        source: 'ex',
      };
      diagnostics.push(diagnostic);
    }

    this.connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
  }
}
