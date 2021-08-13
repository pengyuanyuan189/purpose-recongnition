import Vue from 'vue';
import Router from 'vue-router';
import dataConfig from '../components/dataConfig';
import dataPlot from '../components/dataPlot';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/config',
      name: 'config',
      component: dataConfig,
    },
    {
      path: '/data-plot',
      name: 'dataPlot',
      component: dataPlot,
    },
    {
      path: '/modeltraining',
      name: 'modeltraining',
      component: dataConfig,
    },
    {
      path: '/recongnition',
      name: 'recongnition',
      component: dataConfig,
    },
    {
      path: '*',
      name: '404',
      component: dataConfig,
    },
  ],
});
