'use strict';

const { app, BrowserWindow, Menu, shell, session } = require('electron');
const path = require('path');
const fs = require('fs');

const YTM_URL = 'https://music.youtube.com/';

// Present a plain desktop-Chrome user agent. Electron's default UA contains an
// "Electron/x.y" token which trips Google's "this browser may not be secure"
// sign-in block. Stripping it lets the normal Google login flow through.
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

app.userAgentFallback = USER_AGENT;

// Keep audio playing smoothly when the window is minimised / in the background.
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-renderer-backgrounding');

const STATE_FILE = () => path.join(app.getPath('userData'), 'window-state.json');

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE(), 'utf8'));
  } catch {
    return { width: 1280, height: 820 };
  }
}

function saveState(win) {
  if (!win || win.isDestroyed() || win.isMinimized()) return;
  try {
    const b = win.getBounds();
    fs.writeFileSync(STATE_FILE(), JSON.stringify({ ...b, maximized: win.isMaximized() }));
  } catch {
    /* best effort */
  }
}

let mainWindow = null;

function createWindow() {
  const state = loadState();

  mainWindow = new BrowserWindow({
    width: state.width || 1280,
    height: state.height || 820,
    x: state.x,
    y: state.y,
    minWidth: 940,
    minHeight: 600,
    backgroundColor: '#121212',
    title: 'Cadence',
    icon: path.join(__dirname, 'icon.png'),
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false, // preload needs fs to read the theme/cleanup files
      backgroundThrottling: false,
      spellcheck: false,
      partition: 'persist:ytmusic', // keeps you logged in between launches
    },
  });

  if (state.maximized) mainWindow.maximize();

  mainWindow.loadURL(YTM_URL, { userAgent: USER_AGENT });

  mainWindow.once('ready-to-show', () => mainWindow.show());

  // Open genuinely external links (socials, ToS, etc.) in the real browser,
  // but keep YouTube Music + Google auth navigations inside the app.
  const isInternal = (url) =>
    /^https:\/\/(music\.youtube\.com|www\.youtube\.com|accounts\.google\.com|myaccount\.google\.com)\//.test(
      url,
    );

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (isInternal(url)) return { action: 'allow' };
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!isInternal(url)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  ['resize', 'move', 'close'].forEach((evt) =>
    mainWindow.on(evt, () => saveState(mainWindow)),
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function buildMenu() {
  const template = [
    {
      label: 'Cadence',
      submenu: [
        { role: 'reload', label: 'Reload' },
        { role: 'forceReload', label: 'Force Reload' },
        { type: 'separator' },
        { role: 'quit', label: 'Quit' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
        { role: 'toggleDevTools' },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// Single-instance: focus the existing window instead of opening a second copy.
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    // Belt-and-suspenders UA override on the persistent session.
    try {
      session.fromPartition('persist:ytmusic').setUserAgent(USER_AGENT);
    } catch {
      /* older Electron: userAgentFallback already covers it */
    }
    buildMenu();
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
}
