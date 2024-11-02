<template>
  <n-grid :cols="24" x-gap="12" y-gap="12">
    <n-grid-item :span="24">
      <n-card>
        <div class="time-display">{{ currentTime }}</div>
      </n-card>
    </n-grid-item>
    <n-grid-item :span="8">
      <n-card>
        <n-statistic label="应到" :value="expectedCount" />
      </n-card>
    </n-grid-item>
    <n-grid-item :span="8">
      <n-card>
        <n-statistic label="实到" :value="actualCount" />
      </n-card>
    </n-grid-item>
    <n-grid-item :span="8">
      <n-card>
        <n-statistic label="缺勤" :value="absentCount" />
      </n-card>
    </n-grid-item>
    <n-grid-item :span="24">
      <n-button @click="showModal = true">调节人数统计</n-button>
    </n-grid-item>
  </n-grid>

  <n-modal v-model:show="showModal" title="调节人数统计">
    <n-form>
      <n-form-item label="应到">
        <n-input-number v-model:value="expectedCount" />
      </n-form-item>
      <n-form-item label="缺勤">
        <n-input-number v-model:value="absentCount" />
      </n-form-item>
    </n-form>
    <template #footer>
      <n-button @click="showModal = false">关闭</n-button>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { NGrid, NGridItem, NCard, NStatistic, NButton, NModal, NForm, NFormItem, NInputNumber } from 'naive-ui';

const currentTime = ref('');
const expectedCount = ref(100);
const absentCount = ref(10);
const showModal = ref(false);

const actualCount = computed(() => expectedCount.value - absentCount.value);

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString();
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});
</script>

<style scoped>
.time-display {
  font-size: 2.5em;
  text-align: center;
}

.n-card {
  font-size: 1.8em;
}


.n-form-item {
  font-size: 1.6em;
}
</style>
