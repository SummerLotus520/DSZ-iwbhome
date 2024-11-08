import { app } from 'electron';
import { electronApp } from '@electron-toolkit/utils';
import windowManager from './utils/windowManager';
import ipcWindow from './ipc/window';
import axios from 'axios'; 

app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');
  ipcWindow.register(); 
  const wallPaperWindow = windowManager.createMainWindow();
  // wallPaperWindow.show()
});

app.on('window-all-closed', () => {
  app.quit();
});

async function getWeatherData(province: string, city: string) {
  const stationId = await getStationId(province, city);
  return await fetchWeatherData(stationId);
}

async function getStationId(provinceName: string, cityName: string) {
  const provinceCode = await getProvinceCode(provinceName);
  if (provinceCode) {
    return getCityCode(provinceCode, cityName);
  } else {
    throw new Error('无法找到省份代码');
  }
}

async function getProvinceCode(provinceName: string) {
  const response = await axios.get('http://www.nmc.cn/rest/province');
  const provinces = response.data;
  const province = provinces.find((p: any) => p.name === provinceName);
  return province ? province.code : null;
}

async function getCityCode(provinceCode: string, cityName: string) {
  const response = await axios.get(`http://www.nmc.cn/rest/province/${provinceCode}`);
  const cities = response.data;
  const city = cities.find((c: any) => c.city === cityName);
  return city ? city.code : null;
}

async function fetchWeatherData(stationId: string) {
  const response = await axios.get(`http://www.nmc.cn/rest/weather?stationid=${stationId}`);
  return response.data;
}

export { getWeatherData }; // 导出getWeatherData函数以便在其他地方使用
