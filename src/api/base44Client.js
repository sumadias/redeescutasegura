import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// Em desenvolvimento o proxy do Vite atende /api; em produção (hospedagem
// externa ao Base44, ex. HostGator) as chamadas vão direto para a API do Base44.
export const serverUrl = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_BASE44_SERVER_URL || 'https://base44.app');

//Create a client with authentication required
export const base44 = createClient({
  appId,
  token,
  functionsVersion,
  serverUrl,
  requiresAuth: false,
  appBaseUrl
});
