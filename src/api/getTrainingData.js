import axios from './index';

function getFighterData(offset, count) {
  return axios({
    method: 'get',
    url: '/getFighterRNNData',
    params: {
      offset,
      count,
    }
  });
}


function getWarningData(offset, count) {
  return axios({
    method: 'get',
    url: '/getWarningRNNData',
    params: {
      offset,
      count,
    }
  });
}

export default function getTraningData(offset, count, planeType){
  if(planeType === '战斗机'){
    return getFighterData(offset, count);
  }else if(planeType === '预警机'){
    return getWarningData(offset, count);
  }else{
    console.log('Waring: 不存在的战机类型！');
  }
}
