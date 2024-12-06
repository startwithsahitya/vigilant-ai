const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'vigilant-ai-exam',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

