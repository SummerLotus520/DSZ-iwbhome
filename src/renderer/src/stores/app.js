// Utilities
import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('app', {
  state: () => ({
    settingsWindowWidth: 400, // 设置弹窗宽度
    totalPeople: 50, // 总人数
    absentPeople: 0 // 请假人数
  }),
  persist: true
});

export const useAppGlobalStore = defineStore('app', {
  state: () => ({
    activeSettings: false
  }),
  persist: false
});
