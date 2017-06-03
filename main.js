const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800, height: 600,
    title: "CKEditor Offline",
    webPreferences: {
      backgroundThrottling: false
    },
    icon: path.join(__dirname, '/icons/web_hi_res_512.png')
  })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: "New",
        accelerator: 'CmdOrCtrl+N',
        click (item, focusedWindow) {
          focusedWindow.webContents.send("click_menu", "new");
        }
      },
      {
        label: "Open...",
        accelerator: 'CmdOrCtrl+O',
        click (item, focusedWindow) {
          focusedWindow.webContents.send("click_menu", "open");
        }
      },
      {
        label: "Save",
        accelerator: 'CmdOrCtrl+S',
        click (item, focusedWindow) {
          focusedWindow.webContents.send("click_menu", "save");
        }
      },
      {
        label: "Save As...",
        accelerator: 'CmdOrCtrl+Shift+S',
        click (item, focusedWindow) {
          focusedWindow.webContents.send("click_menu", "saveas");
        }
      },
      {type: 'separator'},
      {role: 'close'}
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
/*
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
    ]
  },
*/
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'About',
        click () { require('electron').shell.openExternal('https://electron.atom.io') }
      }
    ]
  }
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
