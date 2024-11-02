<template>
  <n-config-provider id="main-container" :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-layout id="main-layout">
      <AppTopBar></AppTopBar>
      <router-view />

      <n-drawer v-model:show="appGlobalStore.activeSettings" :width="settingsStore.settingsWindowWidth" placement="right">
        <n-drawer-content title="设置">
          <SettingsView></SettingsView>
        </n-drawer-content>
      </n-drawer>

    </n-layout>

  </n-config-provider>


</template>

<script lang="ts" setup>
import { darkTheme } from 'naive-ui';
import themeOverrides from '../naive-ui-theme-overrides.json';
import { useAppGlobalStore, useSettingsStore } from '../stores/app.js';

const appGlobalStore = useAppGlobalStore();
const settingsStore = useSettingsStore();

</script>

