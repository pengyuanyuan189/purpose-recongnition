<template>
  <div id="trackFigure"></div>
</template>

<style scoped>
  div[id=trackFigure]{
    height: 550px;
  }

  canvas{
    width: 1000px;
  }
</style>

<script>
import * as echarts from 'echarts';
import 'echarts-gl';
import { getFighterTrack, getWarningTrack } from '../../api/getTrackData';
  
export default {
  name: 'trackFig',
  props: ['fighterNum', 'warningNum'],
  data() {
    return {
      fighterTrack: [],
      warningTrack: [],
    }
  },
  methods: {
    dataTransform(dataList, planeNum) {
      let n = parseInt(planeNum);
      let dataset = new Array(n);
      for(let i = 0; i < n; i++){
        dataset[i] = new Array();
      }
      try{
        for(let item of dataList){
          let {x, y, z} = item.fields;
          dataset[parseInt(item.fields.n)].push([x, y, z]);
        }
      }catch(e) {
        console.log(e);
      }
      return dataset;
    },
    getFigureData() {
      console.log(this.fighterNum, this.war)
      var myChart = echarts.init(document.getElementById("trackFigure"));
      var option = {
        legend: {},
        title:[
          {
            top: '60px',
            left: '470px',
            text: '战斗机轨迹'
          }, 
          {
            top: '60px',
            left: '1280px',
            text: '预警机轨迹'
          }
        ],
        grid3D: [
          {
            viewControl: {
              animation: true,
              animationDurationUpdate: 300,
            },
            axisTick: {
              show: false,
            },
            left: '-400px',
          },
          {
            viewControl: {
              animation: true,
              animationDurationUpdate: 300,
            },
            axisTick: {
              show: false,
            },
            left: '400px',
          },
        ],
        xAxis3D: [
          {
            type: 'value',
            grid3DIndex: 0,
          },
          {
            type: 'value',
            grid3DIndex: 1,
          },
        ],
        yAxis3D: [
          {
            type: 'value',
            grid3DIndex: 0,
          },  
          {
            type: 'value',
            grid3DIndex: 1,
          },
        ],
        zAxis3D: [
          {
            type: 'value',
            grid3DIndex: 0,
          },
          {
            type: 'value',
            grid3DIndex: 1,
          },
        ],
        series: [],
      };
      // 图表初始化
      Promise.all([getFighterTrack(0, 200, this.fighterNum), getWarningTrack(0, 200, this.warningNum)]).then(([fighterRes, warningRes]) => {
        this.fighterTrack = this.dataTransform(fighterRes.list, this.fighterNum);
        this.warningTrack = this.dataTransform(warningRes.list, this.warningNum);
        for(let i = 0; i < parseInt(this.fighterNum); i++){
          option.series.push({
            type: 'line3D',
            name: 'fighter'+i,
            data: this.fighterTrack[i],
            lineStyle: {
              color: 'auto',
              opacity: 1,
              width: 2,
            },
            grid3DIndex: 0,
          });
        }
        for(let i = 0; i < parseInt(this.warningNum); i++){
          option.series.push({
            type: 'line3D',
            name: 'warning'+i,
            data: this.warningTrack[i],
            lineStyle: {
              color: 'auto',
              opacity: 1,
              width: 2,
            },
            grid3DIndex: 1,
          });
        }
        try{
          setTimeout(myChart.setOption(option), 500);
        }catch(e){
          console.log(e);
        }
      }).catch((err) => {
        return false;
      });

      // 动态获取数据并刷新图表
      // let that = this;
      // let timer = setInterval(function (){
      //   Promise.all([getFighterTrack(that.fighterTrack[0].length, 200, that.fighterNum), getWarningTrack(that.warningTrack[0].length, 200, that.warningNum)]).then(([fighterRes, warningRes]) => {
      //     if(fighterRes.list.length && warningRes.list.length){
      //     // if(option.series[0].data.length <= 10000){
      //       let newFighterTrack = that.dataTransform(fighterRes.list, that.fighterNum);
      //       let newWarningTrack = that.dataTransform(warningRes.list, that.warningNum);
      //       for(let i = 0; i < parseInt(that.fighterNum); i++){
      //         that.fighterTrack[i] = [...that.fighterTrack[i], ...newFighterTrack[i]];
      //         option.series[i].data.push(...newFighterTrack[i]);
      //       }
            
      //       for(let i = 0; i < parseInt(that.warningNum); i++){
      //         that.warningTrack[i] = [...that.warningTrack[i], ...newWarningTrack[i]];
      //         option.series[parseInt(that.fighterNum) + i].data.push(...newWarningTrack[i]);
      //       }
            
      //       try{
      //         console.log("Are you ok?");
      //         console.log(option.series);
      //         setTimeout(myChart.setOption(option), 500);
      //       }catch(e){
      //         console.log(e);
      //       }
      //     }else{
      //       clearInterval(timer);
      //     }
      //   }).catch((err) => {
      //     return false;
      //   });
      // }, 1000);
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