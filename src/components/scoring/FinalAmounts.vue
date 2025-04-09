<template>
  <div class="table-wrapper">
    <table>
      <tbody>
        <tr>
          <th scope="col">
            <h5 class="mt-1">{{t('endOfGameAmounts.amounts')}}</h5>
          </th>
          <th v-for="player in playerCount" :key="player" scope="col">
            <PlayerColorDisplay :playerColor="playerColors[player-1]" class="playerIcon"/>
            <span>{{t('player.player', {player:player}, playerCount)}}</span>
          </th>
          <th v-for="bot in botCount" :key="bot" scope="col">
            <PlayerColorDisplay :playerColor="playerColors[playerCount+bot-1]" class="playerIcon"/>
            <span>{{t('player.bot', {bot:bot}, botCount)}}</span>
          </th>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="glory" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount" :key="index">
            <ScoringTextInput v-model="amount.glory[index-1]"/>
          </td>
          <td v-for="index in botCount" :key="index"></td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="good-standard" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount" :key="index">
            <ScoringTextInput v-model="amount.goodStandard[index-1]"/>
          </td>
          <td v-for="index in botCount" :key="index"></td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="good-processed" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount" :key="index">
            <ScoringTextInput v-model="amount.goodProcessed[index-1]"/>
          </td>
          <td v-for="index in botCount" :key="index"></td>
        </tr>
        <tr>
          <th scope="row">
            <MoneyIcon/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            <ScoringTextInput v-model="amount.money[index-1]"/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="hops" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            <ScoringTextInput v-model="amount.hops[index-1]"/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="cotton" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            <ScoringTextInput v-model="amount.cotton[index-1]"/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="tobacco" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            <ScoringTextInput v-model="amount.tobacco[index-1]"/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="sugar-cane" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            <ScoringTextInput v-model="amount.sugarCane[index-1]"/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="export-contract" class="icon"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            <ScoringTextInput v-model="amount.exportContract[index-1]"/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="settlement" class="icon"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            <ScoringTextInput v-model="amount.settlement[index-1]"/>
          </td>
        </tr>
        <tr v-if="hasAwards || hasTrainModule">
          <th scope="col">
            <h5 class="mt-1">{{t('endOfGameAmounts.victoryPoints')}}</h5>
          </th>
          <td :colspan="playerCount+botCount"></td>
        </tr>
        <tr v-if="hasAwards">
          <th scope="row">
            <AppIcon type="final-scoring" name="award" class="icon"/>
          </th>
          <td v-for="index in playerCount" :key="index">
            <ScoringTextInput v-model="amount.awardVP[index-1]"/>
          </td>
          <td v-for="index in botCount" :key="index"></td>
        </tr>
        <tr v-if="hasTrainModule">
          <th scope="row">
            <AppIcon type="final-scoring" name="milestone" class="icon"/>
          </th>
          <td v-for="index in playerCount" :key="index">
            <ScoringTextInput v-model="amount.milestoneVP[index-1]"/>
          </td>
          <td v-for="index in botCount" :key="index"></td>
        </tr>
        <tr v-if="hasTrainModule">
          <th scope="row">
            <AppIcon type="final-scoring" name="train-delivery" class="icon"/>
          </th>
          <td v-for="index in playerCount" :key="index">
            <ScoringTextInput v-model="amount.trainDeliveryVP[index-1]"/>
          </td>
          <td v-for="index in botCount" :key="index"></td>
        </tr>
      </tbody>
    </table>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

</template>

<script lang="ts">
import { useStateStore, FinalScoringAmount } from '@/store/state'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import PlayerColorDisplay from '../structure/PlayerColorDisplay.vue'
import Expansion from '@/services/enum/Expansion'
import MoneyIcon from '../structure/MoneyIcon.vue'
import { useRouter } from 'vue-router'
import ScoringTextInput from '@brdgm/brdgm-commons/src/components/form/ScoringTextInput.vue'

export default defineComponent({
  name: 'FinalAmounts',
  components: {
    PlayerColorDisplay,
    AppIcon,
    MoneyIcon,
    ScoringTextInput
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const router = useRouter()

    const { playerCount, botCount, playerColors } = state.setup.playerSetup

    const amount = state.finalScoringAmount ?? 
      {
        glory: [],
        cotton: [],
        tobacco: [],
        sugarCane: [],
        goodStandard: [],
        goodProcessed: [],
        money: [],
        hops: [],
        exportContract: [],
        settlement: [],
        awardVP: [],
        milestoneVP: [],
        trainDeliveryVP: []
      } as FinalScoringAmount

    return { t, state, router, playerCount, botCount, playerColors, amount }
  },
  computed: {
    hasAwards() : boolean {
      return this.state.setup.expansions.includes(Expansion.INDUSTRIA_AWARD)
    },
    hasTrainModule() : boolean {
      return this.state.setup.expansions.includes(Expansion.INDUSTRIA_TRAIN)
    },
  },
  methods: {
    next() : void {
      this.state.finalScoringAmount = this.amount
      this.router.push('/endOfGame')
    }
  }
})
</script>

<style lang="scss" scoped>
.playerIcon {
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 0.25rem;
  margin-top: -0.25rem;
}
.iconSquare {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
  margin-right: 0.25rem;
}
.icon {
  width: 5rem;
  height: 2.5rem;
  object-fit: contain;
  margin-right: 0.25rem;
}
.table-wrapper {
  overflow-x: auto;
}
th, td {
  text-align: center;
  padding: 0.5rem;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
th {
  white-space: nowrap;
  vertical-align: middle;
}
input {
  width: 5rem;
}
</style>
