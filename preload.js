const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('copilotNative', {
  platform: process.platform,
  version: process.env.npm_package_version || '',
});
