import appCategories from './components/appCategories.vue'
import appSelectedCategory from './components/appSelectedCategory.vue'

export const routes = [
  {
    path: '/', 
    name: 'home',
    component: appCategories,
    props: true
  },
  {
    path: '/categories',
    component: appSelectedCategory,
    props: true
  }
]