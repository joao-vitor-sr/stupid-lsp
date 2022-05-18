import { ErrorCode } from 'vscode-json-languageservice/lib/umd/jsonLanguageTypes';

export interface STUPIDDocDiagnostic {
  message: string;
  location: {
    start: number;
    end: number;
    toLineEnd: boolean;
  };
  severity: 1 | 2;
  source?: string;
  code: ErrorCode;
}
