import { STUPIDDocDiagnostic } from '../utils/parseUtils';

export class STUPIDDocument {
  private errors: STUPIDDocDiagnostic[];
  private warnings: STUPIDDocDiagnostic[];

  constructor() {
    this.errors = [];
    this.warnings = [];
  }
}
