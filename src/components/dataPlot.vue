<template>
  <div id="dataShowing">
    <!-- <data-table planeType="战斗机"></data-table>
    <data-table planeType="预警机"></data-table> -->
    <track-fig planeType="fighter" planeNum="6"></track-fig>
    <track-fig planeType="warning" planeNum="5"></track-fig>
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
      tableData: [],
    }
  },
  methods: {
    
  },
};
</script>

