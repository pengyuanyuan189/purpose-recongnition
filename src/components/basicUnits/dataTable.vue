<template>
  <el-table 
    :data="tableData" 
    style="width: 100%" 
    max-height="400"
    v-el-table-infinite-scroll="getTableData">
    <el-table-column :label="overallTitle" align="center">
      <el-table-column
        prop="fields.x"
        label="X坐标"
        width="100">
      </el-table-column>
      <el-table-column
        prop="fields.y"
        label="Y坐标"
        width="100">
      </el-table-column>
      <el-table-column
        prop="fields.z"
        label="Z坐标"
        width="100">
      </el-table-column>
      <el-table-column
        prop="fields.headangle"
        label="航向角"
        width="100">
      </el-table-column>
      <el-table-column
        prop="fields.elevation"
        label="仰角"
        width="100">
      </el-table-column>
      <el-table-column
        prop="fields.speed"
        label="速度"
        width="100">
      </el-table-column>
      <el-table-column
        prop="fields.tangentacceleration"
        label="切向加速度"
        width="100">
      </el-table-column>
      <el-table-column
        prop="fields.hnormalacceleration"
        label="水平法向加速度"
        width="150">
      </el-table-column>
      <el-table-column
        prop="fields.vnormalacceleration"
        label="竖直法向加速度"
        width="150">
      </el-table-column>
      <el-table-column
        prop="fields.rador"
        label="雷达状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="fields.communication"
        label="通信状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="fields.selfmission"
        label="飞机当前意图"
        width="150">
      </el-table-column>
      <el-table-column
        prop="fields.friendmission"
        label="协同机当前意图"
        width="150">
      </el-table-column>
      <el-table-column
        prop="fields.area"
        label="飞机所在区域"
        width="150">
      </el-table-column>
      <el-table-column
        prop="fields.rank"
        label="队形"
        width="100">
      </el-table-column>
      <el-table-column
        fixed="right"
        prop="fields.nextMission"
        label="下一时刻意图标签"
        width="150">
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
import elTableInfiniteScroll from 'el-table-infinite-scroll';
import { radar, communication, area, rank, purpose } from '../../utils/mapList';
import getTrainingData from '../../api/getTrainingData';

export default {
  name: 'dataTable',
  directives: {
    'el-table-infinite-scroll': elTableInfiniteScroll
  },
  props: ['planeType'],
  data() {
    return {
      tableData: [],
      overallTitle: '',
    }
  },
  methods: {
    getTableData() {
      getTrainingData(this.tableData.length, 20, this.planeType).then((res) => {
        // 数字转文字，增强可读性
        let newData = res.list.map(function(item) {
          // 航向角弧度转角度
          item.fields.headangle = `${parseInt((parseFloat(item.fields.headangle) * 180 / Math.PI ))}°`;
          // 俯仰角弧度转角度
          item.fields.elevation = `${parseInt((parseFloat(item.fields.elevation) * 180 / Math.PI ))}°`;
          // 雷达状态
          item.fields.rador = radar[item.fields.rador];
          // 通信频率
          item.fields.communication = communication[item.fields.communication];
          // 本作战平台的当前意图
          item.fields.selfmission = purpose[item.fields.selfmission];
          // 协作机的当前意图
          item.fields.friendmission = purpose[item.fields.friendmission];
          // 作战区域
          item.fields.area = area[item.fields.area];
          // 队形
          item.fields.rank = rank[item.fields.rank];
          // 下一时刻的意图
          item.fields.nextMission = purpose[item.fields.nextMission];

          return item;
        });
        this.tableData = [...this.tableData, ...newData];
      }).catch((err) => {
        return false;
      });
    },
  },
  mounted: function () {
    this.getTableData();
    this.overallTitle = `${this.planeType}信息展示`;
  },
};
</script>

<style scoped>
div.el-table{
  margin: 8px 0;
}
</style>