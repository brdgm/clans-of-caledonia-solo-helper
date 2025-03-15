<template>
  <h1>{{t('setupBot.title')}}</h1>

  <h3 class="mt-3 mb-3">{{t('setupBot.setup.title')}}</h3>
  <div class="instructions">
    <ol>
      <li v-html="t('setupBot.setup.setupGame', {playerCount:state.getTotalPlayerCount()})"></li>
      <li v-html="t('setupBot.setup.playerBoard')"></li>
      <ul>
        <li v-html="t('setupBot.setup.shipLevel', {level:difficultySettings.shipLevel})"></li>
        <li v-html="t('setupBot.setup.money', {startingMoney:difficultySettings.startingMoney})"></li>
      </ul>
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
        <span v-html="t('setupBot.setup.botStartingWorkers.title')"></span>
        <BotStartingWorkers v-for="bot in botCount" :key="bot" :bot="bot" :botCount="botCount"/>
        <div v-html="t('setupBot.setup.botStartingWorkers.tieBreaker.title')"></div>
        <ul>
          <li v-html="t('setupBot.setup.botStartingWorkers.tieBreaker.price')"></li>
          <li v-html="t('setupBot.setup.botStartingWorkers.tieBreaker.port')"></li>
          <li v-html="t('setupBot.setup.botStartingWorkers.tieBreaker.cheapest')"></li>
          <li v-html="t('setupBot.setup.botStartingWorkers.tieBreaker.random')"></li>
        </ul>
        <div class="mt-2" v-html="t('setupBot.setup.botStartingWorkers.payCosts')"></div>
      </li>
      <li v-html="t('setupBot.setup.turnOrder')"></li>
    </ol>
  </div>

  <template v-if="hasAwardExpansion">
    <h3 class="mb-3">{{t('setupBot.award.title')}}</h3>
    <div class="instructions">
      <ul>
        <template v-if="playerCount == 1">
          <li v-html="t('setupBot.award.drawCard')"></li>
          <ul>
            <li v-html="t('setupBot.award.scoringDifferent')"></li>
            <li v-html="t('setupBot.award.conditions')"></li>
            <li v-html="t('setupBot.award.scoring')"></li>
          </ul>
        </template>
        <template v-else>
          <li v-html="t('setupBot.award.multipleHumanPlayers.awardTiles')"></li>
          <ul>
            <li v-html="t('setupBot.award.multipleHumanPlayers.playerCount')"></li>
            <li v-html="t('setupBot.award.multipleHumanPlayers.botDoesNotParticipate')"></li>
          </ul>
        </template>
    </ul>
    </div>
  </template>

  <template v-if="hasTrainExpansion">
    <h3 class="mb-3">{{t('setupBot.train.title')}}</h3>
    <div class="instructions">
      <ul>
        <template v-if="playerCount == 1">
          <li v-html="t('setupBot.train.setup')"></li>
          <ul>
            <li v-html="t('setupBot.train.noActions')"></li>
            <li v-html="t('setupBot.train.playerDeliver')"></li>
          </ul>
        </template>
        <template v-else-if="playerCount == 2">
          <li v-html="t('setupBot.train.twoHumanPlayersSetup')"></li>
        </template>
        <template v-else-if="playerCount > 2">
          <li v-html="t('setupBot.train.threeHumanPlayersSetup')"></li>
        </template>
      </ul>
    </div>
  </template>

  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col alert alert-info">
        <h3>{{t('setupBot.ruleChanges.title')}}</h3>
        <ul>
          <li v-html="t('setupBot.ruleChanges.moneyNoGoods')"></li>
          <li v-html="t('setupBot.ruleChanges.contracts')"></li>
          <li v-html="t('setupBot.ruleChanges.merchants')"></li>
          <li v-html="t('setupBot.ruleChanges.production')"></li>
          <li v-html="t('setupBot.ruleChanges.noScoringPhase')"></li>
        </ul>
      </div>
    </div>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setupGame" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { PlayerOrder, useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import Expansion from '@/services/enum/Expansion'
import BotStartingWorkers from '@/components/setup/BotStartingWorkers.vue'
import getDifficultyLevelSettings, { DifficultyLevelSettings } from '@/util/getDifficultyLevelSettings'
import { useRouter } from 'vue-router'
import RouteCalculator from '@/services/RouteCalculator'
import CardDeck from '@/services/CardDeck'

export default defineComponent({
  name: 'SetupBot',
  components: {
    FooterButtons,
    BotStartingWorkers
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const state = useStateStore()
    return { t, router, state }
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
    },
    difficultySettings() : DifficultyLevelSettings {
      return getDifficultyLevelSettings(this.state.setup.difficultyLevel)
    }
  },
  methods: {
    startGame() : void {
      this.state.resetGame()
      const { playerCount, botCount } = this.state.setup.playerSetup
      const round = 1
      // prepare first round with initial player order
      const playerOrder : PlayerOrder[] = []
      const initialCardDeck : CardDeck[] = []
      for (let player = 1; player<=playerCount; player++) {
        playerOrder.push({ player })
      }
      for (let bot = 1; bot<=botCount; bot++) {
        playerOrder.push({ bot })
        initialCardDeck.push(CardDeck.new(round))
      }
      this.state.storeRound({
        round,
        playerOrder,
        turns: [],
        initialCardDeck: initialCardDeck.map(cardDeck => cardDeck.toPersistence())
      })
      // start first round
      const routeCalculator = new RouteCalculator({round})
      this.router.push(routeCalculator.getFirstTurnRouteTo(this.state))
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
