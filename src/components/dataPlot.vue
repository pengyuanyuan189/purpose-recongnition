<template>
  <div id="dataShowing">
    <data-table planeType="战斗机"></data-table>
    <data-table planeType="预警机"></data-table>
    <track-fig :fighterNum="fighterNum" :warningNum="warningNum"></track-fig>
  </div>
</template>

<script>
import dataTable from './basicUnits/dataTable';
import trackFig from './basicUnits/trackFig';

export default {
  name: 'dataPlot',
  components: {
    'data-table': dataTable,
    'track-fig': trackFig,
  },
  data() {
    return {
      warningNum: localStorage.getItem('warningNum'),
      fighterNum: localStorage.getItem('fighterNum'),
    }
  },
  methods: {
    
  },
};
</script>

