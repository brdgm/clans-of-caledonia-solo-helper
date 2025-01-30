<template>
  <h1>{{t('setupBot.title')}}</h1>

  <h3 class="mt-3 mb-3">{{t('setupBot.setup.title')}}</h3>
  <div class="instructions">
    <ol>
      <li v-html="t('setupBot.setup.setupGame', {playerCount:state.getTotalPlayerCount()})"></li>
      <li v-html="t('setupBot.setup.clansSelection', {clanCount:state.setup.playerSetup.playerCount + 1})"></li>
      <li v-if="hasFarmerMarketExpansion">
        <span v-if="state.getTotalPlayerCount() == 2" v-html="t('setupBot.setup.farmersMarket2Players')"></span>
        <span v-else v-html="t('setupBot.setup.farmersMarket', {playerCount:state.getTotalPlayerCount()})"></span>
        <ul>
          <li v-html="t('setupBot.setup.farmersMarketWorkerPlacement')"></li>
          <li v-html="t('setupBot.setup.farmersMarketWorkerPlacementBot')"></li>
        </ul>
      </li>
      <li>
        <span v-html="t('setupBot.setup.botStartingWorkers.title')"></span><br/>
        <BotStartingWorkers v-for="bot in botCount" :key="bot" :bot="bot" :botCount="botCount"/>
        <ul>
          <li v-html="t('setupBot.setup.botStartingWorkers.tieBreaker.title')"></li>
          <ul>
            <li v-html="t('setupBot.setup.botStartingWorkers.tieBreaker.price')"></li>
            <li v-html="t('setupBot.setup.botStartingWorkers.tieBreaker.port')"></li>
            <li v-html="t('setupBot.setup.botStartingWorkers.tieBreaker.cheapest')"></li>
            <li v-html="t('setupBot.setup.botStartingWorkers.tieBreaker.random')"></li>
          </ul>
        </ul>
      </li>
      <li v-html="t('setupBot.setup.turnOrder')"></li>
    </ol>
  </div>

  <template v-if="hasAwardExpansion">
    <h3 class="mb-3">{{t('setupBot.award.title')}}</h3>
    <div class="instructions">
      <ol>
        <li v-html="t('setupBot.award.setup')"></li>
      </ol>
    </div>
  </template>

  <template v-if="hasTrainExpansion">
    <h3 class="mb-3">{{t('setupBot.train.title')}}</h3>
    <div class="instructions">
      <ol>
        <li v-html="t('setupBot.train.setup')"></li>
      </ol>
    </div>
  </template>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setupGame" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import Expansion from '@/services/enum/Expansion'
import BotStartingWorkers from '@/components/setup/BotStartingWorkers.vue'

export default defineComponent({
  name: 'SetupBot',
  components: {
    FooterButtons,
    BotStartingWorkers
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  data() {
    return {
      showStartingSpace: false
    }
  },
  computed: {
    expansions() : Expansion[] {
      return this.state.setup.expansions
    },
    hasFarmerMarketExpansion() : boolean {
      return this.expansions.includes(Expansion.INDUSTRIA_FARMERS_MARKET)
    },
    hasAwardExpansion() : boolean {
      return this.expansions.includes(Expansion.INDUSTRIA_AWARD)
    },
    hasTrainExpansion() : boolean {
      return this.expansions.includes(Expansion.INDUSTRIA_TRAIN)
    },
    playerCount() : number {
      return this.state.setup.playerSetup.playerCount
    },
    botCount() : number {
      return this.state.setup.playerSetup.botCount
    }
  },
  methods: {
    startGame() : void {
      this.state.resetGame()
      // start first round
      this.$router.push('/round/1/start')
    }
  }
})
</script>

<style lang="scss" scoped>
.instructions {
  max-width: 1000px;
  ol > li {
    margin-top: 0.5rem;
  }
}
</style>
