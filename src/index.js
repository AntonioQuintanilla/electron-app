const { createWindow } = require('./main.js');
const { app } = require('electron')

require('./database.js')

app.whenReady().then(createWindow)
