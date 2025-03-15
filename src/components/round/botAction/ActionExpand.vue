<template>
  <ActionBox>
    <template #summary>
      <div class="expandSelection">
        <MapModules :mapModules="mapModules"/>
        <div>
          <template v-for="(expandCriteria,index) of expandCriteria" :key="expandCriteria">
            <span v-if="index > 0">＞</span>
            <AppIcon type="expand-criteria" :name="expandCriteria" class="expandCriteriaIcon"/>
          </template>
        </div>
        <div>
          <template v-for="(unitType,index) of unitTypes" :key="unitType">
            <span v-if="index > 0">＞</span>
            <AppIcon type="unit-type" :name="unitType" extension="svg" class="unitTypeIcon"/>
          </template>
        </div>
      </div>
    </template>
    <template #fullRules>
      <p>Automa will try to expand in the highlighted map modules. It chooses a space that best fits this criteria:</p>
      <ol class="criteriaList">
        <li v-for="expandCriteria of expandCriteria" :key="expandCriteria">
          <AppIcon type="expand-criteria" :name="expandCriteria" class="expandCriteriaIcon"/>
          <template v-if="isSettlementsCriteria(expandCriteria)">
            <span><b>Max Settlements:</b> A space to maximize its number of Settlements:</span>
            <ol type="a">
              <li>It tries to connect two groups of Settlements that were disconnected.</li>
              <li>It tries to add a new Settlement to a group of Settlements.</li>
            </ol>
          </template>
          <template v-if="isCostsCriteria(expandCriteria)">
            <span><b>Min Costs:</b> The cheapest space.</span>
          </template>
          <template v-if="isNeighborhoodCriteria(expandCriteria)">
            <template v-if="true"> <!-- v-if="hasFarmersMarketExpansion" -->
              <span><b>Max Neighbourhood Bonus / Farmers Market:</b> Space where it would buy/sell the most Goods through the Neighbourhood bonus or Farmers Markets.</span>
            </template>
            <hr/>
            <template v-if="true"> <!-- v-else -->
              <span><b>Max Neighbourhood Bonus:</b> Space where it would buy the most Goods through the Neighbourhood bonus.</span>
            </template>
          </template>
          <template v-if="isPortCriteria(expandCriteria)">
            <span><b>Port tile:</b> Space that would get it into reach of a Port tile.</span>
          </template>
        </li>
      </ol>
      <p>Pick a unit:</p>
      <ol>
        <li>If multiple unit types are possible, pick in the order of preference as shown above.</li>
        <li>If multiple types of workers are possible, pick in this order:</li>
        <ol type="a">
          <li>Upgraded workers</li>
          <li v-for="workerType of workerTypes" :key="workerType">{{workerType}}</li>
        </ol>
      </ol>
      <p>The Automa pays the unit + space cost and places the chosen unit on the chosen space.</p>
      <hr/>
      <h5>Neighbourhood Bonus</h5>
      <p>As normal, the Automa cannot place Merchants on both “buy” and “sell” for the same Good. Thus, it will ignore the Neighbourhood bonus for Goods it cannot resolve. Unlike in the Trade action, the Automa can sell a Good of a type it has already sold this round.</p>
      <p>When the Automa expands on a space where it would be able to use the Neighbourhood bonus to buy Goods, it buys a number of Goods based on the price brackets the Goods are in:</p>
      <ul>
        <li>Lower price bracket: the Automa buys up to 4 units of that Good (depending on the number of available Merchants.)</li>
        <li>Medium price bracket: the Automa buys up to 2 units of that Good (depending on the number of available Merchants.)</li>
        <li>Upper price bracket: the Automa doesn’t buy.</li>
      </ul>
      <p>The Automa earns <b>£3 per merchant</b> it places on the market via Neighbourhood bonus.</p>
      <hr/>
      <h5>Farmers Market</h5>
      <p>As normal, the Automa cannot place Merchants on both “buy” and “sell” for the same Good. Thus, it will ignore the Farmers market for Goods it cannot resolve. Unlike in the Trade action, the Automa can buy a Good of a type it has already bought this round.</p>
      <p>When the Automa expands on a space where it would be able to use the Farmers market to sell Goods, it sells Goods based on the price brackets the Goods are in:</p>
      <ul>
        <li>Lower price bracket: the Automa doesn’t sell.</li>
        <li>Medium price bracket: the Automa sells up to 2 units of that Good (depending on the number of available Merchants.)</li>
        <li>Upper price bracket: the Automa sells up to 4 units of that Good (depending on the number of available Merchants.)</li>
      </ul>
      <p>It chooses the Good whose Price marker is highest. If several Goods qualify, use the Price die to choose randomly.</p>
      <p>The Automa earns <b>£3 per merchant</b> it places on the market via Farmers market.</p>
      <hr/>
      <h5>Claim a Port Bonus</h5>
      <p>The Automa always claims a Port bonus as soon as it becomes available in its reach. When it does, it places its marker on the Port and receives <b>£10</b> instead of the depicted Port bonus.</p>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import Action from '@/services/enum/Action'
import Card from '@/services/Card'
import MapModule from '@/services/enum/MapModule'
import MapModules from '@/components/structure/MapModules.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import ExpandCriteria from '@/services/enum/ExpandCriteria'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import Expansion from '@/services/enum/Expansion'
import UnitType from '@/services/enum/UnitType'
import getNextUnitType from '@/util/getNextUnitType'
import randomEnum from '@brdgm/brdgm-commons/src/util/random/randomEnum'
import WorkerType from '@/services/enum/WorkerType'
import ActionBox from '../ActionBox.vue'

export default defineComponent({
  name: 'ActionExpand',
  inheritAttrs: false,
  components: {
    MapModules,
    AppIcon,
    ActionBox
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    action: {
      type: Object as PropType<Action>,
      required: true
    },
    currentCard: {
      type: Object as PropType<Card>,
      required: true
    },
    currentSupportCard: {
      type: Object as PropType<Card>,
      required: true
    },
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    isLastRound() : boolean {
      return this.navigationState.round == 5
    },
    mapModules() : MapModule[] {
      if (this.isLastRound) {
        // in round 5 always check all map modules
        return getAllEnumValues(MapModule)
      }
      return this.currentSupportCard?.mapModules ?? []
    },
    expandCriteria() : ExpandCriteria[] {
      if (this.isLastRound) {
        // in round 5 always check for settlements first
        return [ExpandCriteria.SETTLEMENTS, ...(this.currentSupportCard?.expandCriteria ?? []).filter(item => item != ExpandCriteria.SETTLEMENTS)]
      }
      return this.currentSupportCard?.expandCriteria ?? []
    },
    hasFarmersMarketExpansion() : boolean {
      return this.state.setup.expansions.includes(Expansion.INDUSTRIA_FARMERS_MARKET)
    },
    unitTypes() : UnitType[] {
      const allTypes = getAllEnumValues(UnitType)	
      const preferredType = getNextUnitType(this.navigationState.preferredUnitType ?? UnitType.SHEEP, this.currentSupportCard?.chooseUnitSteps ?? 0)
      const preferredIndex = allTypes.indexOf(preferredType)
      return [...allTypes.slice(preferredIndex), ...allTypes.slice(0, preferredIndex)]
    },
    workerTypes() : WorkerType[] {
      const preferredWorkerType = randomEnum(WorkerType)
      if (preferredWorkerType == WorkerType.WOODCUTTER) {
        return [WorkerType.WOODCUTTER, WorkerType.MINER]
      }
      else {
        return [WorkerType.MINER, WorkerType.WOODCUTTER]
      }
    }
  },
  methods: {
    isSettlementsCriteria(criteria: ExpandCriteria) : boolean {
      return criteria == ExpandCriteria.SETTLEMENTS
    },
    isCostsCriteria(criteria: ExpandCriteria) : boolean {
      return criteria == ExpandCriteria.COSTS
    },
    isNeighborhoodCriteria(criteria: ExpandCriteria) : boolean {
      return criteria == ExpandCriteria.NEIGHBORHOOD
    },
    isPortCriteria(criteria: ExpandCriteria) : boolean {
      return criteria == ExpandCriteria.PORT
    }
  }
})
</script>

<style lang="scss" scoped>
.expandSelection {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
}
.expandCriteriaIcon {
  height: 2rem;
  margin-left: 4px;
  margin-right: 4px;
}
.unitTypeIcon {
  width: 1.75rem;
  height: 1.3rem;
  object-fit: contain;
}
.criteriaList .expandCriteriaIcon {
  height: 1.5rem;
  width: 2.5rem;
  object-fit: contain;
  margin-right: 5px;
  border: 1px solid #aaa;
  border-radius: 5px;
}
.criteriaList > li {
  margin-bottom: 10px;
}
</style>
