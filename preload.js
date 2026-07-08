const { contextBridge } = require('electron');

const argVersion = (process.argv.find((a) => a.startsWith('--copilot-version=')) || '').split('=')[1];

contextBridge.exposeInMainWorld('copilotNative', {
  platform: process.platform,
  version: argVersion || process.env.npm_package_version || '',
});
