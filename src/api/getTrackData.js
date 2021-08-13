import axios from './index';

function getFighterTrack(offset, count, planeNum) {
  return axios({
    method: 'get',
    url: '/getFighterTrackData',
    params: {
      offset,
      count,
      planenum: planeNum,
    }
  });
}

function getWarningTrack(offset, count, planeNum) {
  return axios({
    method: 'get',
    url: '/getWarningTrackData',
    params: {
      offset,
      count,
      planenum: planeNum,
    }
  });
}

export default function getTrackData(offset, count, planeNum, planeType){
  if(planeType === 'fighter'){
    return getFighterTrack(offset, count, planeNum);
  }else if(planeType === 'warning'){
    return getWarningTrack(offset, count, planeNum);
  }else{
    console.log('Waring: 不存在的战机类型！');
  }
}
