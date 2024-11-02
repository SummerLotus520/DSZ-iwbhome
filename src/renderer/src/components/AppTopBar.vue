<template>
  <n-layout class="system-topbar">
    <n-space justify="space-between" align="center" style="width: 100%;">
      <n-space>
        <n-button circle size="large" type="primary" @click="goHome">
          <n-icon>
            <FontAwesomeIcon :icon="faHouse" />
          </n-icon>
        </n-button>
        <n-button circle secondary size="large" type="info" @click="goWindows">
          <n-icon>
            <FontAwesomeIcon :icon="faWindows" />
          </n-icon>
        </n-button>
        <n-button circle secondary size="large" type="info" @click="goSettings">
          <n-icon>
            <FontAwesomeIcon :icon="faCog" />
          </n-icon>
        </n-button>
      </n-space>
      <div class="time-clock">{{ time }}</div>
    </n-space>
  </n-layout>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse, faCog } from '@fortawesome/free-solid-svg-icons'
import { faWindows } from '@fortawesome/free-brands-svg-icons'

import { ref, onMounted, onUnmounted } from 'vue';

import { useAppGlobalStore } from '../stores/app.js';

const appGlobalStore = useAppGlobalStore();

const time = ref<string>('');

const updateTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  time.value = `${hours}:${minutes}`;
};

onMounted(() => {
  updateTime();
  const interval = setInterval(updateTime, 60000);
  onUnmounted(() => clearInterval(interval));
});

const goHome = () => {
  console.log('Navigating to Home');
  // Add your navigation logic here
};

const goSettings = () => {
  appGlobalStore.activeSettings = true;
};

const goWindows = () => {
  console.log('Navigating to Settings');
  // Add your navigation logic here
};
</script>

<style scoped>
.system-topbar {
  padding: 15px;
}

.time-clock {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
