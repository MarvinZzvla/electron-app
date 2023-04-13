const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const window = new BrowserWindow({
        width: 600,
        height: 600,
        minWidth: 600,
        maxWidth: 800,
        maxHeight: 800
    })

    window.loadFile('index.html')
}
app.whenReady().then(() => {
    createWindow();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
