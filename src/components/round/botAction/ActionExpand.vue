<template>
  <ActionBox>
    <template #summary>
      <div class="expandSelection">
        <MapModules :mapModules="mapModules" data-bs-toggle="tooltip" data-bs-custom-class="action-help-tooltip" :data-bs-title="t('botAction.expand.tooltip.mapModules')"/>
        <div data-bs-toggle="tooltip" data-bs-custom-class="action-help-tooltip" :data-bs-title="t('botAction.expand.tooltip.criteria')">
          <template v-for="(expandCriteria,index) of expandCriteria" :key="expandCriteria">
            <span v-if="index > 0">＞</span>
            <AppIcon type="expand-criteria" :name="expandCriteria" class="expandCriteriaIcon"/>
          </template>
        </div>
        <div data-bs-toggle="tooltip" data-bs-custom-class="action-help-tooltip" :data-bs-title="t('botAction.expand.tooltip.unitPreference')">
          <template v-for="(unitType,index) of unitTypes" :key="unitType">
            <span v-if="index > 0">＞</span>
            <AppIcon type="unit-type" :name="unitType" extension="svg" class="unitTypeIcon"/>
          </template>
        </div>
        <div data-bs-toggle="tooltip" data-bs-custom-class="action-help-tooltip" :data-bs-title="t(`botAction.expand.tooltip.neighborhood${hasFarmersMarketExpansion ? 'FarmersMarket' : ''}`)">
          <img src="@/assets/player-aid/expand-check-neighborhood.webp" alt="" class="player-aid-check-neighborhood"/>
        </div>
      </div>
    </template>
    <template #rules>
      <p v-html="t('botAction.expand.rulesSpace.expand')"></p>
      <ol class="criteriaList">
        <li v-for="expandCriteria of expandCriteria" :key="expandCriteria">
          <AppIcon type="expand-criteria" :name="expandCriteria" class="expandCriteriaIcon"/>
          <template v-if="isSettlementsCriteria(expandCriteria)">
            <span v-html="t('botAction.expand.rulesSpace.settlements')"></span>
            <ol type="a">
              <li v-html="t('botAction.expand.rulesSpace.settlementsConnect')"></li>
              <li v-html="t('botAction.expand.rulesSpace.settlementsNew')"></li>
            </ol>
          </template>
          <template v-if="isCostsCriteria(expandCriteria)">
            <span v-html="t('botAction.expand.rulesSpace.costs')"></span>
          </template>
          <template v-if="isNeighborhoodCriteria(expandCriteria)">
            <template v-if="hasFarmersMarketExpansion">
              <span v-html="t('botAction.expand.rulesSpace.neighborhoodFarmersMarket')"></span>
            </template>
            <template v-else>
              <span v-html="t('botAction.expand.rulesSpace.neighborhood')"></span>
            </template>
          </template>
          <template v-if="isPortCriteria(expandCriteria)">
            <span v-html="t('botAction.expand.rulesSpace.port')"></span>
          </template>
        </li>
      </ol>
      <p v-html="t('botAction.expand.rulesUnit.title')"></p>
      <ol>
        <li v-html="t('botAction.expand.rulesUnit.unitPreference')"></li>
        <li><span v-html="t('botAction.expand.rulesUnit.workerPreference')"></span><RandomizedIcon/></li>
        <ol type="a">
          <li v-html="t('botAction.expand.rulesUnit.upgradedWorkers')"></li>
          <li v-for="workerType of workerTypes" :key="workerType">{{t(`workerType.${workerType}`)}}</li>
        </ol>
      </ol>
      <p v-html="t('botAction.expand.rulesUnit.payUnitHex')"></p>
      <hr/>
      <h5>{{t('botAction.expand.rulesNeighborhood.title')}}</h5>
      <p v-html="t('botAction.expand.rulesNeighborhood.restrictions')"></p>
      <img src="@/assets/player-aid/expand-check-neighborhood.webp" alt="" class="player-aid-check-neighborhood rules"/>
      <p v-html="t('botAction.expand.rulesNeighborhood.buyGoods')"></p>
      <img src="@/assets/player-aid/expand-neighborhood-bonus.webp" alt="" class="player-aid-trade"/>
      <ul>
        <li v-html="t('botAction.expand.rulesNeighborhood.buyGoodsUpper')"></li>
        <li v-html="t('botAction.expand.rulesNeighborhood.buyGoodsMedium')"></li>
        <li v-html="t('botAction.expand.rulesNeighborhood.buyGoodsLower')"></li>
      </ul>
      <p>
        <span v-html="t('botAction.expand.rulesNeighborhood.earnMoney')"/><br/>
        <AppIcon name="merchant" class="merchantIcon me-1"/>: <MoneyIcon :value="3"/>
      </p>
      <hr/>
      <template v-if="hasFarmersMarketExpansion">
        <h5>{{t('botAction.expand.rulesFarmersMarket.title')}}</h5>
        <p v-html="t('botAction.expand.rulesFarmersMarket.restrictions')"></p>
        <img src="@/assets/player-aid/expand-check-neighborhood.webp" alt="" class="player-aid-check-neighborhood rules"/>
        <p v-html="t('botAction.expand.rulesFarmersMarket.sellGoods')"></p>
        <img src="@/assets/player-aid/expand-farmers-market.webp" alt="" class="player-aid-trade"/>
        <ul>
          <li v-html="t('botAction.expand.rulesFarmersMarket.sellGoodsUpper')"></li>
          <li v-html="t('botAction.expand.rulesFarmersMarket.sellGoodsMedium')"></li>
          <li v-html="t('botAction.expand.rulesFarmersMarket.sellGoodsLower')"></li>
        </ul>
        <p v-html="t('botAction.expand.rulesFarmersMarket.tiebreaker')"></p>
        <p>
          <span v-html="t('botAction.expand.rulesFarmersMarket.earnMoney')"/><br/>
          <AppIcon name="merchant" class="merchantIcon me-1"/>: <MoneyIcon :value="3"/>
        </p>
        <hr/>
      </template>
      <h5>{{t('botAction.port-bonus.title')}}</h5>
      <p>
        <span v-html="t('botAction.port-bonus.rules')"/><br/>
        <AppIcon name="port-claim" class="portClaimIcon"/>: <MoneyIcon :value="10"/>
      </p>
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
import MoneyIcon from '@/components/structure/MoneyIcon.vue'
import RandomizedIcon from '@/components/structure/RandomizedIcon.vue'

export default defineComponent({
  name: 'ActionExpand',
  inheritAttrs: false,
  components: {
    MapModules,
    AppIcon,
    ActionBox,
    MoneyIcon,
    RandomizedIcon
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
.merchantIcon {
  width: 1.75rem;
}
.portClaimIcon {
  width: 2.5rem;
}
.player-aid-trade {
  height: 150px;
  float: right;
  margin-left: 10px;
  @media (max-width: 500px) {
    float: none;
    margin-left: 0;
    width: 100%;
    object-fit: contain;
  }
}
.player-aid-check-neighborhood {
  height: 2.5rem;
  &.rules {
    float: left;
    margin-right: 10px;
  }
}
</style>
