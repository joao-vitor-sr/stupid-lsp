import {
  Connection,
  InitializeParams,
  InitializeResult,
  TextDocumentSyncKind,
} from 'vscode-languageserver/node';
import { ValidationHandler } from './languageserver/handlers/validationHandlers';
import { SettingsState } from './stupidSettings';

class STUPIDServerInit {
  validationHandler?: ValidationHandler;
  constructor(
    private readonly connection: Connection,
    private stupidSettings: SettingsState
  ) {
    this.stupidSettings.documents.listen(this.connection);
    this.validationHandler = undefined;
    /**
     * Run when the client connects to the server after it is activated.
     * The server receives the root path(s) of the workspace and the client
     * capabilities.
     */
    this.connection.onInitialize((params: InitializeParams) =>
      this.connectionInitialized(params)
    );
  }

  // public for test setup
  private connectionInitialized(params: InitializeParams): InitializeResult {
    this.stupidSettings.capabilities = params.capabilities;

    this.stupidSettings.hasConfigurationCapability = !!(
      this.stupidSettings.capabilities.workspace &&
      !!this.stupidSettings.capabilities.workspace.configuration
    );

    this.registerHandlers();

    return {
      capabilities: {
        textDocumentSync: TextDocumentSyncKind.Incremental,
        completionProvider: { resolveProvider: false },
        hoverProvider: true,
        documentSymbolProvider: true,
        documentFormattingProvider: false,
        documentOnTypeFormattingProvider: {
          firstTriggerCharacter: '\n',
        },
        documentRangeFormattingProvider: false,
        definitionProvider: true,
        documentLinkProvider: {},
        foldingRangeProvider: true,
        codeActionProvider: false,
        codeLensProvider: {
          resolveProvider: false,
        },
        workspace: {
          workspaceFolders: {
            changeNotifications: true,
            supported: true,
          },
        },
      },
    };
  }

  /**
   * Starts the lsp server.
   */
  public start(): void {
    this.connection.listen();
  }

  private registerHandlers(): void {
    this.validationHandler = new ValidationHandler(
      this.connection,
      this.stupidSettings
    );
  }
}

export default STUPIDServerInit;
