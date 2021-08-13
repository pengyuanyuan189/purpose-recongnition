<template>
  <div :id="planeType" class="trackFigure"></div>
</template>

<style>
  div[class=trackFigure]{
    /* width: 250px; */
    height: 550px;
    /* border: 1px solid red; */
  }
</style>

<script>
import * as echarts from 'echarts';
import 'echarts-gl';
import getTrackData from '../../api/getTrackData';
  
export default {
  name: 'trackFig',
  props: ['planeType', 'planeNum'],
  data() {
    return {
      dataSrc: [],
    }
  },
  methods: {
    dataTransform(dataList, planeNum) {
      let n = parseInt(planeNum);
      let dataset = new Array(n);
      for(let i = 0; i < n; i++){
        dataset[i] = new Array();
      }
      for(let item of dataList){
        let {x, y, z} = item.fields;
        dataset[parseInt(item.fields.n)].push([x, y, z]);
      }
      return dataset;
    },
    getFigureData() {
      var myChart = echarts.init(document.getElementById(this.planeType));
      var option = {
          grid3D: {
            axisLine: {
              // show: false,
              interval: 'auto',
            },
            viewControl: {
              animation: true,
              animationDurationUpdate: 300,
            },
            axisTick: {
              show: false,
            },
          },
          xAxis3D: {
            type: 'value',
            scale: true,
          },
          yAxis3D: {
            type: 'value',
          },
          zAxis3D: {
            type: 'value',
          },
          series: [],
      };
      getTrackData(0, 200, this.planeNum, this.planeType).then((res) => {
        this.dataSrc = this.dataTransform(res.list, this.planeNum);
        for(let i = 0; i < parseInt(this.planeNum); i++){
          option.series.push({
            type: 'line3D',
            name: 'plane'+i,
            data: this.dataSrc[i],
            lineStyle: {
              color: 'auto',
              opacity: 1,
              width: 2,
            },
          });
        }
        myChart.setOption(option);
      }).catch((err) => {
        return false;
      });
      
      let that = this;
      let timer = setInterval(function (){
        getTrackData(that.dataSrc[0].length, 200, that.planeNum, that.planeType).then((res) => {
          // if(res.list.length){
          if(option.series[0].data.length <= 10000){
            let newData = that.dataTransform(res.list, that.planeNum);
            for(let i = 0; i < parseInt(that.planeNum); i++){
              that.dataSrc[i] = [...that.dataSrc[i], ...newData[i]];
              option.series[i].data.push(...newData[i]);
            }
            console.log(option.series);
            myChart.setOption(option);
            console.log("绘图完毕");
          }else{
            clearInterval(timer);
          }
        }).catch((err) => {
          return false;
        });
      }, 1000);
    },
  },
  mounted: function () {
    // mounted是在根元素挂载完就执行，子元素不一定此时也挂载成功；
    // 所以在此时渲染图表会出错，加上nextTick确保全部元素加载完毕，遂无误
    this.$nextTick(function() {
      this.getFigureData();
    });
  },
  watch: {

  },
};  
</script>
