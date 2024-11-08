import { ipcMain, BrowserWindow, app } from 'electron';
import windowManager from '../utils/windowManager';
import WindowName from '../types/WindowName';
import { fileUtils } from '../utils/fileManager';
import { getWeatherData } from '../index'; 

const ipcWindow = {
  register() {
    ipcMain.on('window:minimize', (event) => {
      const window = BrowserWindow.fromId(event.sender.id);
      if (window) {
        window.minimize();
      } else {
        console.error('Failed to minimize: Window not found');
      }
    });
    ipcMain.on('prog:exit', (event) => {
      windowManager.destroyAllWindows();
      app.quit();
    });
    ipcMain.on('window:open', (event, name: WindowName) => {
      return windowManager.createByName(name);
    });

    ipcMain.on('prog:loadjson', async (event) => {
      const window = BrowserWindow.fromId(event.sender.id);
      const file = await fileUtils.readFile();
      await window.webContents.send('common:openFile', file);
    });

    ipcMain.handle('get-weather', async (event, { province, city }) => {
      return await getWeatherData(province, city);
    });
  }
};

export default ipcWindow;
