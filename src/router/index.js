import { createRouter, createWebHistory } from 'vue-router'

import Homepage from '@/components/BoxShadow.vue'



const routes = [
  {
    path: '/' ,
    name: 'HomePage',
    component: Homepage,
    meta: {
      title: 'box shadow'
    }
  },
  
 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});





export default router