import {
  Connection,
  InitializeResult,
  TextDocumentSyncKind,
} from 'vscode-languageserver/node';

class STUPIDServerInit {
  constructor(private readonly connection: Connection) {
    /**
     * Run when the client connects to the server after it is activated.
     * The server receives the root path(s) of the workspace and the client
     * capabilities.
     */
    connection.onInitialize(() => this.connectionInitialized());
  }

  // public for test setup
  private connectionInitialized(): InitializeResult {
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
}

export default STUPIDServerInit;
