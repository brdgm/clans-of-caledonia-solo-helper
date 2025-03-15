import { RouteRecordRaw } from 'vue-router'
import createRouterMatomoTracking from '@brdgm/brdgm-commons/src/util/router/createRouterMatomoTracking'
import { name, version, appDeployName } from '@/../package.json'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupGame from '@/views/SetupGame.vue'
import SetupBot from '@/views/SetupBot.vue'
import RoundPreparation from '@/views/RoundPreparation.vue'
import RoundTurnPlayer from '@/views/RoundTurnPlayer.vue'
import RoundTurnBot from '@/views/RoundTurnBot.vue'
import RoundProduction from '@/views/RoundProduction.vue'
import RoundScoring from '@/views/RoundScoring.vue'

const LOCALSTORAGE_KEY = `${name}.route`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  {
    path: '/setupGame',
    name: 'SetupGame',
    component: SetupGame
  },
  {
    path: '/setupBot',
    name: 'SetupBot',
    component: SetupBot
  },
  {
    path: '/round/:round/preparation',
    name: 'RoundPreparation',
    component: RoundPreparation
  },
  {
    path: '/round/:round/turn/:turn/:turnOrderIndex/player/:player',
    name: 'RoundTurnPlayer',
    component: RoundTurnPlayer
  },
  {
    path: '/round/:round/turn/:turn/:turnOrderIndex/bot/:bot',
    name: 'RoundTurnBot',
    component: RoundTurnBot
  },
  {
    path: '/round/:round/turn/:turn/:turnOrderIndex/bot/:bot/action/:action',
    name: 'RoundTurnBotAction',
    component: RoundTurnBot
  },
  {
    path: '/round/:round/production',
    name: 'RoundProduction',
    component: RoundProduction
  },
  {
    path: '/round/:round/scoring',
    name: 'RoundScoring',
    component: RoundScoring
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouterMatomoTracking(routes, LOCALSTORAGE_KEY, appDeployName, version, 'AppHome')