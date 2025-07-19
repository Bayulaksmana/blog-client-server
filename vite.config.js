import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  include: [],
  optimizeDeps: {
    include: [
      'highcharts',
      'highcharts/modules/organization',
      'highcharts/modules/exporting',
      'tinymce/tinymce',
    ]
  }
});
