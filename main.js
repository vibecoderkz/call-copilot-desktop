const { app, BrowserWindow, Menu, session, desktopCapturer, systemPreferences, shell } = require('electron');
const path = require('path');

app.setAboutPanelOptions({
  applicationName: 'Call Copilot',
  applicationVersion: app.getVersion(),
  copyright: 'Разработано Dias Zhumagaliyev — https://dias.now',
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1380,
    height: 880,
    minWidth: 960,
    minHeight: 620,
    backgroundColor: '#0b0d13',
    title: 'Call Copilot',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });
  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(async () => {
  if (process.platform === 'darwin') {
    try { await systemPreferences.askForMediaAccess('microphone'); } catch {}
  }

  // getDisplayMedia в рендерере: на Windows отдаём системный звук (loopback),
  // на остальных платформах собеседники берутся с аудиоустройства (monitor/BlackHole)
  session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
    desktopCapturer.getSources({ types: ['screen'] }).then((sources) => {
      if (process.platform === 'win32') callback({ video: sources[0], audio: 'loopback' });
      else callback({ video: sources[0] });
    }).catch(() => callback({}));
  });

  const menu = Menu.buildFromTemplate([
    ...(process.platform === 'darwin' ? [{ role: 'appMenu' }] : []),
    { role: 'editMenu' },
    { role: 'viewMenu' },
    { role: 'windowMenu' },
    {
      label: 'Справка',
      submenu: [
        { label: 'О разработчике — dias.now', click: () => shell.openExternal('https://dias.now') },
        { label: 'BlackHole для macOS', click: () => shell.openExternal('https://existential.audio/blackhole/') },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);

  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
