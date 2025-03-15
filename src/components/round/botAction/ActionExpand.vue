<template>
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
  <hr/>
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
        <template v-if="hasFarmersMarketExpansion">
          <span><b>Max Neighbourhood Bonus / Farmers Market:</b> Space where it would buy/sell the most Goods through the Neighbourhood bonus or a Farmers Market.</span>
        </template>
        <template v-else>
          <span><b>Max Neighbourhood Bonus:</b> Space where it would buy the most Goods through the Neighbourhood bonus.</span>
        </template>
      </template>
      <template v-if="isPortCriteria(expandCriteria)">
        <span><b>Port tile:</b> Space that would get it into reach of a Port tile.</span>
      </template>
    </li>
  </ol>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Action from '@/services/enum/Action'
import Card from '@/services/Card'
import MapModule from '@/services/enum/MapModule'
import MapModules from '@/components/structure/MapModules.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import ExpandCriteria from '@/services/enum/ExpandCriteria'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import { useStateStore } from '@/store/state'
import Expansion from '@/services/enum/Expansion'
import UnitType from '@/services/enum/UnitType'
import getNextUnitType from '@/util/getNextUnitType'

export default defineComponent({
  name: 'ActionExpand',
  inheritAttrs: false,
  components: {
    MapModules,
    AppIcon
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
}
.criteriaList > li {
  margin-bottom: 10px;
}
</style>
