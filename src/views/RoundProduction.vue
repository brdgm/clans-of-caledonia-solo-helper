<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('roundProduction.title')}}</h1>

  <p class="mt-4" v-html="t('roundProduction.execute')"></p>

  <ul>
    <li v-html="t('roundProduction.bot.workers')"></li>
    <li v-html="t('roundProduction.bot.goodsIncome')"></li>
    <li v-html="t('roundProduction.bot.noProductionChain')"></li>
  </ul>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import RouteCalculator from '@/services/RouteCalculator'
import { useStateStore } from '@/store/state'
import SideBar from '@/components/round/SideBar.vue'

export default defineComponent({
  name: 'RoundProduction',
  components: {
    FooterButtons,
    SideBar
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round } = navigationState

    const routeCalculator = new RouteCalculator({round})

    return { t, router, state, navigationState, round, routeCalculator }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getLastTurnRouteTo(this.state)
    }
  },
  methods: {
    next() : void {
      this.router.push(`/round/${this.round}/scoring`)
    }
  }
})
</script>
