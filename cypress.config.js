import { defineConfig } from "cypress";
import cypressMochawesomeReporterPlugin from 'cypress-mochawesome-reporter/plugin';

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      cypressMochawesomeReporterPlugin(on);
    },
  },
});
