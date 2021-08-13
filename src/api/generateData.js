import axios from './index';

export default async function generateData(form) {
  let dataGenerazation = await axios({
    method: 'post',
    url: '/genCompleteData',
    
    data: {
      fighternum: form.combatCnt,
      warningnum: form.awacsCnt,
      fighterarea: form.combatInitRegion,
      warningarea: form.awacsInitRegion,
      fightermission: form.combatInitTask,
      warningmission: form.awacsInitTask,
      isaddnoise: form.isAddNoise,
    }
  });
  return dataGenerazation;
}
