import { App } from 'vue';
import * as components from './components';
import * as views from './views';
import * as composables from './composables';

// Export everything
export * from './components';
export * from './views';
export * from './composables';
export * from './types';
export * from './utils/api';

// Default export for plugin installation
export default {
  install(app: App) {
    // Register all components globally
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  }
};

// Individual exports for selective imports
export { components, views, composables };