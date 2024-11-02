/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from './plugins';

// Components
import App from './App.vue';

import "./styles/main.scss"

// Composables
import { createApp } from 'vue';

import 'virtual:svg-icons-register';

const app = createApp(App);

registerPlugins(app);

app.mount('#app');
