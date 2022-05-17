import {
  Connection,
  ProposedFeatures,
  createConnection,
} from 'vscode-languageserver/node';
import STUPIDServerInit from './stupidServerInit';
import { SettingsState } from './stupidSettings';

const connection: Connection =
  process.argv.indexOf('--stdio') === -1
    ? createConnection(ProposedFeatures.all)
    : createConnection();

console.log = connection.console.log.bind(connection.console);
console.error = connection.console.error.bind(connection.console);

/**
 * vscode-nls calls console.error(null) in some cases, so we put that in info,
 * to predict sending "null" in to telemetry
 */
console.error = (arg) => {
  if (arg === null) {
    connection.console.info(arg);
  } else {
    connection.console.error(arg);
  }
};

const stupidSettings = new SettingsState();

new STUPIDServerInit(connection, stupidSettings).start();
