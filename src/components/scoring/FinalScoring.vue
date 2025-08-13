<template>
  <div class="table-wrapper">
    <table>
      <tbody>
        <tr>
          <th scope="col">
            <h5 class="mt-1">{{t('endOfGame.finalScoring')}}</h5>
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
          <td v-for="index in playerCount+botCount" :key="index">
            {{toNumber(gloryVP[index-1])}}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="good-standard" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount" :key="index">
            {{toNumber(goodStandardVP[index-1])}}
          </td>
          <td v-for="index in botCount" :key="index"></td>
        </tr>
        <tr>
          <th scope="row">
            2 x <AppIcon type="final-scoring" name="good-processed" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount" :key="index">
            {{toNumber(goodProcessedVP[index-1])}}
          </td>
          <td v-for="index in botCount" :key="index"></td>
        </tr>
        <tr>
          <th scope="row">
            <MoneyIcon :value="10"/>=1 / <MoneyIcon :value="5"/>=1
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            {{toNumber(moneyVP[index-1])}}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="hops" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            {{toNumber(hopsVP[index-1])}}
          </td>
        </tr>
        <tr>
          <th scope="row">
            {{cottonValue}} x <AppIcon type="final-scoring" name="cotton" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            {{ toNumber(amount.cotton[index-1]) * cottonValue }}
          </td>
        </tr>
        <tr>
          <th scope="row">
            {{tobaccoValue}} x <AppIcon type="final-scoring" name="tobacco" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            {{ toNumber(amount.tobacco[index-1]) * tobaccoValue }}
          </td>
        </tr>
        <tr>
          <th scope="row">
            {{sugarCaneValue}} x <AppIcon type="final-scoring" name="sugar-cane" class="iconSquare"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            {{ toNumber(amount.sugarCane[index-1]) * sugarCaneValue }}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="export-contract-max" class="icon"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            {{toNumber(exportContractVP[index-1])}}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <AppIcon type="final-scoring" name="settlement-max" class="icon"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            {{toNumber(settlementVP[index-1])}}
          </td>
        </tr>
        <tr v-if="hasAwards">
          <th scope="row">
            <AppIcon type="final-scoring" name="award" class="icon"/>
          </th>
          <td v-for="index in playerCount" :key="index">
            {{toNumber(awardVP[index-1])}}
          </td>
          <td v-for="index in botCount" :key="index"></td>
        </tr>
        <tr v-if="hasTrainModule">
          <th scope="row">
            <AppIcon type="final-scoring" name="milestone" class="icon"/>
          </th>
          <td v-for="index in playerCount" :key="index">
            {{toNumber(milestoneVP[index-1])}}
          </td>
          <td v-for="index in botCount" :key="index"></td>
        </tr>
        <tr v-if="hasTrainModule">
          <th scope="row">
            <AppIcon type="final-scoring" name="train-delivery" class="icon"/>
          </th>
          <td v-for="index in playerCount+botCount" :key="index">
            {{toNumber(trainDeliveryVP[index-1])}}
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
import { useStateStore, FinalScoringAmount } from '@/store/state'
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import PlayerColorDisplay from '../structure/PlayerColorDisplay.vue'
import ImportGood from '@/services/enum/ImportGood'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import Expansion from '@/services/enum/Expansion'
import getDifficultyLevelSettings from '@/util/getDifficultyLevelSettings'
import MoneyIcon from '../structure/MoneyIcon.vue'
import toNumber from '@brdgm/brdgm-commons/src/util/form/toNumber'
import postGameStats from '@brdgm/brdgm-commons/src/util/stats/postGameStats'
import { version } from '@/../package.json'

export default defineComponent({
  name: 'FinalScoring',
  components: {
    PlayerColorDisplay,
    AppIcon,
    MoneyIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const { playerCount, botCount, playerColors } = state.setup.playerSetup
    const difficultySettings = getDifficultyLevelSettings(state.setup.difficultyLevel)

    return { t, state, playerCount, botCount, playerColors, difficultySettings }
  },
  props: {
    amount: {
      type: Object as PropType<FinalScoringAmount>,
      required: true
    }
  },
  computed: {
    gloryVP() : number[] {
      const result = [...this.amount.glory]
      for (let i=this.playerCount; i<this.playerCount+this.botCount; i++) {
        result[i] = this.difficultySettings.round5VP
      }
      return result
    },
    goodStandardVP() : number[] {
      return this.amount.goodStandard
    },
    goodProcessedVP() : number[] {
      return this.amount.goodProcessed.map(amount => toNumber(amount) * 2)
    },
    moneyVP() : number [] {
      const result = []
      for (let i=0; i<this.playerCount; i++) {
        result[i] = Math.floor(toNumber(this.amount.money[i]) / 10)
      }
      for (let i=this.playerCount; i<this.playerCount+this.botCount; i++) {
        result[i] = Math.floor(toNumber(this.amount.money[i]) / 5)
      }
      return result
    },
    hopsVP() : number[] {
      return this.amount.hops
    },
    exportContractVP() : number[] {
      const amounts = this.amount.exportContract
      const firstPlaceAmount = Math.max(...amounts)
      const secondPlaceAmount = Math.max(...amounts.filter(amount => amount < firstPlaceAmount))
      const firstPlaceCount = amounts.filter(amount => amount == firstPlaceAmount).length
      const secondPlaceCount = amounts.filter(amount => amount == secondPlaceAmount).length
      const result : number[] = []
      if (this.playerCount + this.botCount == 2) {
        // player vs automa scoring
        for (let i=0; i<this.playerCount+this.botCount; i++) {
          if (amounts[i] == firstPlaceAmount) {
            result[i] = Math.floor(8 / firstPlaceCount)
          }
          else if (amounts[i] == firstPlaceAmount - 1) {
            result[i] = 4
          }
          else {
            result[i] = 0
          }
        }
      }
      else {
        // 3-4 player scoring
        for (let i=0; i<this.playerCount+this.botCount; i++) {
          if (amounts[i] == firstPlaceAmount) {
            result[i] = Math.floor(12 / firstPlaceCount)
          }
          else if (amounts[i] == secondPlaceAmount) {
            result[i] = Math.floor(6 / secondPlaceCount)
          }
          else {
            result[i] = 0
          }
        }
      }
      return result
    },
    settlementVP() : number[] {
      const amounts = this.amount.settlement
      const firstPlaceAmount = Math.max(...amounts)
      const secondPlaceAmount = Math.max(...amounts.filter(amount => amount < firstPlaceAmount))
      const thirdPlaceAmount = Math.max(...amounts.filter(amount => amount < secondPlaceAmount))
      const firstPlaceCount = amounts.filter(amount => amount == firstPlaceAmount).length
      const secondPlaceCount = amounts.filter(amount => amount == secondPlaceAmount).length
      const thirdPlaceCount = amounts.filter(amount => amount == thirdPlaceAmount).length
      const result : number[] = []
      if (this.playerCount + this.botCount == 2) {
        // player vs automa scoring
        for (let i=0; i<this.playerCount+this.botCount; i++) {
          if (amounts[i] == firstPlaceAmount) {
            result[i] = Math.floor(12 / firstPlaceCount)
          }
          else if (amounts[i] == firstPlaceAmount - 1 || amounts[i] == firstPlaceAmount - 2) {
            result[i] = 6
          }
          else {
            result[i] = 0
          }
        }
      }
      else {
        // 3-4 player scoring
        for (let i=0; i<this.playerCount+this.botCount; i++) {
          if (amounts[i] == firstPlaceAmount) {
            result[i] = Math.floor(18 / firstPlaceCount)
          }
          else if (amounts[i] == secondPlaceAmount) {
            result[i] = Math.floor(12 / secondPlaceCount)
          }
          else if (amounts[i] == thirdPlaceAmount) {
            result[i] = Math.floor(6 / thirdPlaceCount)
          }
          else {
            result[i] = 0
          }
        }
      }
      return result
    },
    awardVP() : number[] {
      return this.amount.awardVP
    },
    milestoneVP() : number[] {
      return this.amount.milestoneVP
    },
    trainDeliveryVP() : number[] {
      const result = [...this.amount.trainDeliveryVP]
      for (let i=this.playerCount; i<this.playerCount+this.botCount; i++) {
        result[i] = this.difficultySettings.round5VPTrain
      }
      return result
    },
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
        result[i] = toNumber(this.gloryVP[i])
            + toNumber(this.goodStandardVP[i])
            + toNumber(this.goodProcessedVP[i])
            + toNumber(this.moneyVP[i])
            + toNumber(this.hopsVP[i])
            + (toNumber(this.amount.cotton[i]) * toNumber(this.cottonValue))
            + (toNumber(this.amount.tobacco[i]) * toNumber(this.tobaccoValue))
            + (toNumber(this.amount.sugarCane[i]) * toNumber(this.sugarCaneValue))
            + toNumber(this.exportContractVP[i])
            + toNumber(this.settlementVP[i])
            + toNumber(this.awardVP[i])
            + toNumber(this.milestoneVP[i])
            + toNumber(this.trainDeliveryVP[i])
      }
      return result
    }
  },
  methods: {
    toNumber,
    sumAmounts(amounts : number[]) {
      return amounts.reduce((sum, amount) => sum + toNumber(amount), 0)
    },
    getAmount(importGood : ImportGood) {
      switch (importGood) {
        case ImportGood.COTTON: return this.sumAmounts(this.amount.cotton)
        case ImportGood.TOBACCO: return this.sumAmounts(this.amount.tobacco)
        case ImportGood.SUGAR_CANE: return this.sumAmounts(this.amount.sugarCane)
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
    },
    countPlayerTurnsPerRound(round: number, player: number) : number|undefined {
      return this.state.rounds.find(r => r.round == round)?.turns.find(t => t.player == player && t.pass)?.turn
    },
    countBotTurnsPerRound(round: number, bot: number) : number|undefined {
      return this.state.rounds.find(r => r.round == round)?.turns.find(t => t.bot == bot && t.pass)?.turn
    }
  },
  mounted() {
    // send anonymous game stats - max. once per game
    if (!this.state.gameStatsSend) {
      const stats : any = {  // eslint-disable-line @typescript-eslint/no-explicit-any
        version,
        expansions: this.state.setup.expansions.join(','),
        difficultyLevel: this.state.setup.difficultyLevel
      }
      for (let index=0; index<this.playerCount+this.botCount; index++) {
        const isPlayer = index < this.playerCount
        const suffix = isPlayer ? `_Player${index+1}` : `_Automa${index+1-this.playerCount}`
        stats[`totalVP${suffix}`] = this.totalVP[index]
        stats[`gloryVP${suffix}`] = this.gloryVP[index]
        stats[`cotton${suffix}`] = this.amount.cotton[index]
        stats[`tobacco${suffix}`] = this.amount.tobacco[index]
        stats[`sugarCane${suffix}`] = this.amount.sugarCane[index]
        stats[`goodStandard${suffix}`] = this.amount.goodStandard[index]
        stats[`goodProcessed${suffix}`] = this.amount.goodProcessed[index]
        stats[`money${suffix}`] = this.amount.money[index]
        stats[`hops${suffix}`] = this.amount.hops[index]
        stats[`exportContract${suffix}`] = this.amount.exportContract[index]
        stats[`settlement${suffix}`] = this.amount.settlement[index]
        stats[`awardVP${suffix}`] = this.amount.awardVP[index]
        stats[`milestoneVP${suffix}`] = this.amount.milestoneVP[index]
        stats[`trainDeliveryVP${suffix}`] = this.trainDeliveryVP[index]
        for (let round=1; round<=5; round++) {
          const turns = isPlayer
            ? this.countPlayerTurnsPerRound(round, index + 1)
            : this.countBotTurnsPerRound(round, index - this.playerCount + 1)
          stats[`turnsRound${round}${suffix}`] = turns
        }
      }
      postGameStats(stats,
        import.meta.env.VITE_STATS_FORM_URL,
        import.meta.env.VITE_STATS_FIELD_MAPPING)
      this.state.gameStatsSend = true
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
</style>
