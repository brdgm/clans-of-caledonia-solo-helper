<template>
  <div class="table-wrapper">
    <table>
      <tbody>
        <tr>
          <th scope="col">
            <h5 class="mt-1">{{t('endOfGame.importGoodAmount')}}</h5>
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
            <AppIcon type="final-scoring" name="cotton" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            <input type="number" min="0" max="20" step="1" v-model="cottonAmount[index-1]" @focus="inputSelectAll"/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="tobacco" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            <input type="number" min="0" max="20" step="1" v-model="tobaccoAmount[index-1]" @focus="inputSelectAll"/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="sugar-cane" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            <input type="number" min="0" max="20" step="1" v-model="sugarCaneAmount[index-1]" @focus="inputSelectAll"/>
          </td>
        </tr>
        <tr>
          <th scope="col">
            <h5 class="mt-1">{{t('endOfGame.victoryPoints')}}</h5>
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
            <input type="number" min="0" max="20" step="1" v-model="glory[index-1]" @focus="inputSelectAll"/>
          </td>
          <td v-for="index in botCount" :key="index">
            {{toNumber(glory[index-1+playerCount])}}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="good-standard" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount" :key="index">
            <input type="number" min="0" max="20" step="1" v-model="goodStandard[index-1]" @focus="inputSelectAll"/>
          </td>
          <td v-for="index in botCount" :key="index"></td>
        </tr>
        <tr>
          <th scope="row">
            2 x <AppIcon type="final-scoring" name="good-processed" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount" :key="index">
            <input type="number" min="0" max="20" step="1" v-model="goodProcessed[index-1]" @focus="inputSelectAll"/>
          </td>
          <td v-for="index in botCount" :key="index"></td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="money" class="icon"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            <input type="number" min="0" max="20" step="1" v-model="money[index-1]" @focus="inputSelectAll"/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="hops" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            <input type="number" min="0" max="20" step="1" v-model="hops[index-1]" @focus="inputSelectAll"/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            {{cottonValue}} x <AppIcon type="final-scoring" name="cotton" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            {{ toNumber(cottonAmount[index-1]) * cottonValue }}
          </td>
        </tr>
        <tr>
          <th scope="row">
            {{tobaccoValue}} x <AppIcon type="final-scoring" name="tobacco" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            {{ toNumber(tobaccoAmount[index-1]) * tobaccoValue }}
          </td>
        </tr>
        <tr>
          <th scope="row">
            {{sugarCaneValue}} x <AppIcon type="final-scoring" name="sugar-cane" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            {{ toNumber(sugarCaneAmount[index-1]) * sugarCaneValue }}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="export" class="icon"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            <input type="number" min="0" max="20" step="1" v-model="exportScore[index-1]" @focus="inputSelectAll"/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="settlement" class="icon"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            <input type="number" min="0" max="20" step="1" v-model="settlements[index-1]" @focus="inputSelectAll"/>
          </td>
        </tr>
        <tr v-if="hasAwards">
          <th scope="row">
            <AppIcon type="final-scoring" name="award" class="icon"/>
          </th>
          <td v-for="index in playerCount" :key="index">
            <input type="number" min="0" max="20" step="1" v-model="award[index-1]" @focus="inputSelectAll"/>
          </td>
          <td v-for="index in botCount" :key="index"></td>
        </tr>
        <tr v-if="hasTrainModule">
          <th scope="row">
            <AppIcon type="final-scoring" name="milestone" class="icon"/>
          </th>
          <td v-for="index in playerCount" :key="index">
            <input type="number" min="0" max="20" step="1" v-model="milestone[index-1]" @focus="inputSelectAll"/>
          </td>
          <td v-for="index in botCount" :key="index"></td>
        </tr>
        <tr v-if="hasTrainModule">
          <th scope="row">
            <AppIcon type="final-scoring" name="train-delivery" class="icon"/>
          </th>
          <td v-for="index in playerCount" :key="index">
            <input type="number" min="0" max="20" step="1" v-model="trainDelivery[index-1]" @focus="inputSelectAll"/>
          </td>
          <td v-for="index in botCount" :key="index">
            {{toNumber(trainDelivery[index-1+playerCount])}}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="total" class="icon"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            <b>{{totalVP[index-1]}}</b>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { useStateStore } from '@/store/state'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import PlayerColorDisplay from '../structure/PlayerColorDisplay.vue'
import ImportGood from '@/services/enum/ImportGood'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import Expansion from '@/services/enum/Expansion'
import { ref } from 'vue'
import getDifficultyLevelSettings from '@/util/getDifficultyLevelSettings'

export default defineComponent({
  name: 'FinalScoring',
  components: {
    PlayerColorDisplay,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const { playerCount, botCount, playerColors } = state.setup.playerSetup

    const glory = ref([] as number[])
    const goodStandard = ref([] as number[])
    const goodProcessed = ref([] as number[])
    const money = ref([] as number[])
    const hops = ref([] as number[])
    const cottonAmount = ref([] as number[])
    const tobaccoAmount = ref([] as number[])
    const sugarCaneAmount = ref([] as number[])
    const exportScore = ref([] as number[])
    const settlements = ref([] as number[])
    const award = ref([] as number[])
    const milestone = ref([] as number[])
    const trainDelivery = ref([] as number[])

    const difficultySettings = getDifficultyLevelSettings(state.setup.difficultyLevel)
    for (let i=playerCount; i<playerCount+botCount; i++) {
      glory.value[i] = difficultySettings.round5VP
      if (state.setup.expansions.includes(Expansion.INDUSTRIA_TRAIN)) {
        trainDelivery.value[i] = difficultySettings.round5VPTrain
      }
    }

    return { t, state, playerCount, botCount, playerColors,
      glory, goodStandard, goodProcessed, money,
      hops,  cottonAmount, tobaccoAmount, sugarCaneAmount,
      exportScore, settlements, award, milestone, trainDelivery
    }
  },
  computed: {
    hasAwards() : boolean {
      return this.state.setup.expansions.includes(Expansion.INDUSTRIA_AWARD)
    },
    hasTrainModule() : boolean {
      return this.state.setup.expansions.includes(Expansion.INDUSTRIA_TRAIN)
    },
    importGoodOrder() : ImportGood[] {
      return getAllEnumValues(ImportGood)
          .toSorted((g1, g2) => {
            const amount1 = this.getAmount(g1)
            const amount2 = this.getAmount(g2)
            if (amount1 == amount2) {
              return this.getImportGoodTiebreaker(g1) - this.getImportGoodTiebreaker(g2)
            }
            else {
              return amount2 - amount1
            }
          })
    },
    cottonValue() : number {
      return 3 + this.importGoodOrder.indexOf(ImportGood.COTTON)
    },
    tobaccoValue() : number {
      return 3 + this.importGoodOrder.indexOf(ImportGood.TOBACCO)
    },
    sugarCaneValue() : number {
      return 3 + this.importGoodOrder.indexOf(ImportGood.SUGAR_CANE)
    },
    totalVP() : number[] {
      const result = []
      for (let i=0; i<this.playerCount+this.botCount; i++) {
        result[i] = this.toNumber(this.glory[i])
            + this.toNumber(this.goodStandard[i])
            + this.toNumber(this.goodProcessed[i])
            + this.toNumber(this.money[i])
            + this.toNumber(this.hops[i])
            + (this.toNumber(this.cottonAmount[i]) * this.toNumber(this.cottonValue))
            + (this.toNumber(this.tobaccoAmount[i]) * this.toNumber(this.tobaccoValue))
            + (this.toNumber(this.sugarCaneAmount[i]) * this.toNumber(this.sugarCaneValue))
            + this.toNumber(this.exportScore[i])
            + this.toNumber(this.settlements[i])
            + this.toNumber(this.award[i])
            + this.toNumber(this.milestone[i])
            + this.toNumber(this.trainDelivery[i])
      }
      return result
    }
  },
  methods: {
    inputSelectAll(event: Event) : void {
      const input = event.target as HTMLInputElement
      input.select()
    },
    toNumber(value? : number) {
      if (typeof value == 'string') {
        return 0
      }
      else {
        return value ?? 0
      }
    },
    sumAmounts(amounts : number[]) {
      return amounts.reduce((sum, amount) => sum + this.toNumber(amount), 0)
    },
    getAmount(importGood : ImportGood) {
      switch (importGood) {
        case ImportGood.COTTON: return this.sumAmounts(this.cottonAmount)
        case ImportGood.TOBACCO: return this.sumAmounts(this.tobaccoAmount)
        case ImportGood.SUGAR_CANE: return this.sumAmounts(this.sugarCaneAmount)
        default: return 0
      }
    },
    getImportGoodTiebreaker(importGood : ImportGood) {
      switch (importGood) {
        case ImportGood.COTTON: return 3
        case ImportGood.TOBACCO: return 2
        case ImportGood.SUGAR_CANE: return 1
        default: return 0
      }
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
