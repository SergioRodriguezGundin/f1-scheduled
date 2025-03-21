/**
 * Welcome to Cloudflare Workers!
 *
 * This is a template for a Scheduled Worker: a Worker that can run on a
 * configurable interval:
 * https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Run `curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"` to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { getLatestRace, initializeRaces } from './races';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return new Response('f1-scheduled working!');
  },

  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(fetchF1Races(env));
    ctx.waitUntil(getLastRace(env));
  },
};

const fetchF1Races = async (env: Env) => {
  const response = await env.F1_SCRAPER.fetch(`${env.RACES_URL}/races`); 
  const races = await response.json();
  return races;
};

export const getLastRace = async (env: Env): Promise<Response> => {
  initializeRaces(env);
  const lastRace = getLatestRace();
  if (lastRace) {
    try {
      await Promise.allSettled(lastRace.urls.map(async (url: string) => {
        const response = await env.F1_SCRAPER.fetch(url);
        console.log('🏎️ response: ', response);
        return response;
      }));
      return new Response('Last race results fetched successfully');
    } catch (error) {
      console.error('Error fetching latest race results:', error);
    }
  }
  throw new Error('We have not found any race yesterday');
};
