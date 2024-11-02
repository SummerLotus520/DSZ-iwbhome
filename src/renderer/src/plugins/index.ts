/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import pinia from '../stores';
import router from '../router';

export function registerPlugins(app) {
  app.use(router).use(pinia);
}
