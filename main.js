const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
    
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  // Open a window if none are open (macOS)
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit the app when all windows are closed (Windows & Linux)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
