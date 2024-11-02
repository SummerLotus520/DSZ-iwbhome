<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSettingsStore } from '../stores/app.js';
import { NForm, NFormItem, NInputNumber, NButton } from 'naive-ui';

const settingsStore = useSettingsStore();

const settingsWindowWidth = ref(400);
const totalPeople = ref(0);
const absentPeople = ref(0);

settingsStore.settingsWindowWidth = 400;

console.log(settingsStore.settingsWindowWidth.valueOf());

const saveSettings = () => {
  settingsStore.settingsWindowWidth = settingsWindowWidth.value;
  settingsStore.totalPeople = totalPeople.value;
  settingsStore.absentPeople = absentPeople.value;
  console.log('Settings saved:', settingsStore.$state);
};

onMounted(() => {
  settingsWindowWidth.value = settingsStore.settingsWindowWidth.valueOf();
  totalPeople.value = settingsStore.totalPeople.valueOf();
  absentPeople.value = settingsStore.absentPeople.valueOf();
});
</script>

<template>
  <n-form label-width="auto">
    <n-form-item label="设置弹窗宽度">
      <n-input-number v-model:value="settingsWindowWidth"/>
    </n-form-item>
    <n-form-item label="总人数">
      <n-input-number v-model:value="totalPeople" />
    </n-form-item>
    <n-form-item label="请假人数">
      <n-input-number v-model:value="absentPeople" />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" @click="saveSettings">保存设置</n-button>
    </n-form-item>
  </n-form>
</template>

<style scoped>
/* 添加样式以适应你的设计 */
</style>
