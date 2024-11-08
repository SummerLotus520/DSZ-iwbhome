<template>
  <div class="homepage-container">
    <n-tabs type="line" animated size="large">
      <n-tab-pane name="homepage" tab="首页">
        <HomeView/>
      </n-tab-pane>
      <n-tab-pane name="programs" tab="应用">
        asdfasdfasdf
      </n-tab-pane>
      <n-tab-pane name="mini_apps" tab="小程序">
        DSZ App Framework
        <div>
          <label for="province">省份:</label>
          <input type="text" v-model="province" placeholder="请输入省份">
          <br>
          <label for="city">城市:</label>
          <input type="text" v-model="city" placeholder="请输入城市">
          <br>
          <button @click="getWeather">获取天气</button>
        </div>
        <h2>天气信息</h2>
        <div id="weatherInfo">
          <div v-if="weatherData">
            <p>{{ weatherData.city }} {{ weatherData.temperature }}°C 湿度: {{ weatherData.humidity }}% 风速风向: {{ weatherData.windDirect }} {{ weatherData.windPower }}</p>
            <p>空气质量: {{ weatherData.airQuality }} 降水量: {{ weatherData.rain }}mm 体感温度: {{ weatherData.feelst }}°C</p>
            <div v-if="weatherData.alertText">
              <p>{{ weatherData.alertText }}</p>
            </div>
            <div v-for="(forecast, index) in weatherData.forecast" :key="index">
              <p>{{ forecast.dayOfWeek }} {{ forecast.maxTemp }}°C/{{ forecast.minTemp }}°C {{ forecast.dayText }}/{{ forecast.nightText }}
              <img v-if="forecast.dayImgUrl" :src="forecast.dayImgUrl" alt="白天图片">
              <img v-if="forecast.nightImgUrl" :src="forecast.nightImgUrl" alt="夜间图片">
              </p>
            </div>
          </div>
        </div>
      </n-tab-pane>
      <n-tab-pane name="files" tab="文件">
        阿斯顿法师打发斯蒂芬
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const province = ref('');
const city = ref('');
const weatherData = ref(null);

async function getWeather() {
  try {
    const data = await window.api.getWeather(province.value, city.value);
    const real = data.data.real;
    const station = real.station;
    const weather = real.weather;
    const wind = real.wind;
    const air = data.data.air;

    weatherData.value = {
      city: station.city,
      temperature: weather.temperature,
      humidity: weather.humidity,
      windDirect: wind.direct === "9999" ? "无持续风向" : wind.direct,
      windPower: wind.power,
      airQuality: air.text,
      rain: weather.rain,
      feelst: weather.feelst,
      alertText: real.warn && real.warn.alert !== "9999" ? real.warn.alert.split("信号")[0] + "信号" : null,
      forecast: []
    };

    const tempchart = data.data.tempchart;
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
    const startIndex = tempchart.findIndex(d => d.time === today);
    if (startIndex !== -1) {
      for (let i = startIndex; i < startIndex + 7 && i < tempchart.length; i++) {
        const dayData = tempchart[i];
        const dayOfWeek = i === startIndex ? "今天" : new Date(dayData.time).toLocaleString('zh-CN', { weekday: 'short' });

        const maxTemp = dayData.max_temp === "9999" ? "" : dayData.max_temp;
        const minTemp = dayData.min_temp === "9999" ? "" : dayData.min_temp;
        const dayText = dayData.day_text === "9999" ? "" : dayData.day_text;
        const nightText = dayData.night_text === "9999" ? "" : dayData.night_text;
        const dayImg = dayData.day_img === "9999" ? "" : dayData.day_img;
        const nightImg = dayData.night_img === "9999" ? "" : dayData.night_img;

        const dayImgUrl = dayImg ? `http://image.nmc.cn/assets/img/w/40x40/4/${dayImg}.png` : "";
        const nightImgUrl = nightImg ? `http://image.nmc.cn/assets/img/w/40x40/4/${nightImg}.png` : "";

        weatherData.value.forecast.push({
          dayOfWeek,
          maxTemp,
          minTemp,
          dayText,
          nightText,
          dayImgUrl,
          nightImgUrl
        });
      }
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}
</script>

<style scoped>
.homepage-container {
  height: 100%;
  padding: 10px 20px 10px 20px;
}
</style>
