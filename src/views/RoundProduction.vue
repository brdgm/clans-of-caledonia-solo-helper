<template>
  <h1>{{t('roundProduction.title')}}</h1>

  <p>...</p>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.nextRound')}}
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
import getPlayerOrder from '@/util/getPlayerOrder'

export default defineComponent({
  name: 'RoundProduction',
  components: {
    FooterButtons
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
      // prepare next round with new player order
      const playerOrder = getPlayerOrder(this.state, this.round)
      this.state.storeRound({
        round: this.round+1,
        playerOrder,
        turns: []
      })
      this.router.push(`/round/${this.round+1}/income`)
    }
  }
})
</script>
