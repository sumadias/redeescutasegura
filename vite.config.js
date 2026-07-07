import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // Recursos do editor/telemetria do Base44 só fazem sentido dentro do builder
  // (dev). No build de produção (hospedagem externa, ex. HostGator) eles geram
  // chamadas para /api no próprio domínio, que não existem lá.
  const isDev = command === 'serve';
  return {
    logLevel: 'error', // Suppress warnings, only show errors
    plugins: [
      base44({
        // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
        // can be removed if the code has been updated to use the new SDK imports from @base44/sdk
        legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
        hmrNotifier: isDev,
        navigationNotifier: isDev,
        analyticsTracker: isDev,
        visualEditAgent: isDev
      }),
      react(),
    ]
  };
});
