import {
  Connection,
  Diagnostic,
  DiagnosticSeverity,
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { SettingsState } from '../../stupidSettings';

interface charDiagnosticError {
  char: string;
  start: number;
  end: number;
}

export class ValidationHandler {
  private stupidSettings: SettingsState;

  private closeChars: string[];
  private openChars: string[];

  constructor(
    private readonly connection: Connection,
    settingsLanguage: SettingsState
  ) {
    this.stupidSettings = settingsLanguage;
    this.closeChars = this.returnCloseChars();
    this.openChars = this.returnOpenChars();

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

  private returnCloseChars(): string[] {
    const closeChars: string[] = [];
    this.stupidSettings.charsComparassion.forEach((element) => {
      closeChars.push(element[1]);
    });
    return closeChars;
  }

  private returnOpenChars() {
    const openChars: string[] = [];
    this.stupidSettings.charsComparassion.forEach((element) => {
      openChars.push(element[0]);
    });
    return openChars;
  }

  private returnConntraryChar(char: string): string | null {
    let result = '';
    this.stupidSettings.charsComparassion.forEach((element) => {
      if (element[1] == char) result = element[0];
      else if (element[0] == char) result = element[1];
    });
    return result;
  }

  private returnErrorsFromTxt(txt: string): charDiagnosticError[] {
    const depthChars: charDiagnosticError[] = [];

    for (let i = 0; i <= txt.length; i++) {
      if (depthChars.length >= this.stupidSettings.maxErrorsComputed) break;

      if (this.openChars.includes(txt[i])) {
        depthChars.push({ start: i, end: i + txt[i].length, char: txt[i] });
      } else if (
        this.closeChars.includes(txt[i]) &&
        depthChars[depthChars.length - 1].char ==
          this.returnConntraryChar(txt[i])
      ) {
        depthChars.pop();
      }
    }
    return depthChars;
  }

  validate(textDocument: TextDocument): void {
    const txt = textDocument.getText();

    const diagnostics: Diagnostic[] = [];

    const parenthesPositions = this.returnErrorsFromTxt(txt);

    parenthesPositions.forEach((position) => {
      const diagnostic: Diagnostic = {
        severity: DiagnosticSeverity.Warning,
        range: {
          start: textDocument.positionAt(position.start),
          end: textDocument.positionAt(position.end),
        },
        message: 'JUST CLOSES THIS SH!#',
        source: 'ex',
      };
      diagnostics.push(diagnostic);
    });

    this.connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
  }
}
