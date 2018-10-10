<template>
  <div>
    <appHeader></appHeader>
    <transition name='fadeSlide' mode='out-in'>
      <router-view 
        :leng='leng'
        :categories='categories'
        :allcards='allcards'
        :selectedCats='selectedCategories'
        @categoriesSelected='categoriesSelected'
        @thumbsUpCatChange='thumbsUpCatChange'
        @thumbsDownCatChange='thumbsDownCatChange'>
      </router-view>
    </transition>
  </div>
</template>

<script>
import appHeader from './components/appHeader.vue';
import Vue from 'vue';
import VuePersist from 'vue-persist'

Vue.use(VuePersist)

export default {
  data () {
    return {
      selectedCategories: [],
      categories: [],
      allcards: [],
      url: 'http://localhost:8000/api/flashcards',
      i: 0,
      leng: 0
    }
  },
  mounted(){
    this.getCards();
  },
  methods:{
    categoriesSelected(category){
      if(this.selectedCategories.indexOf(category) === -1){
        this.selectedCategories.push(category);
      }else{
        this.selectedCategories.splice(this.selectedCategories.indexOf(category), 1);
      }
    },
    thumbsUpCatChange(id){
      for(let index in this.allcards){
        if(this.allcards[index]._id == id){
          this.allcards[index].difficulty = 'good';
        }
      }
    },
    thumbsDownCatChange(id){
      for(let index in this.allcards){
        if(this.allcards[index]._id == id){
          this.allcards[index].difficulty = 'bad';
        }
      }
    },
    getCards(){
      axios.get(this.url)
      .then((cards) => {
        cards.data.forEach(card => {
          this.$set(this.allcards, this.i, {...card})
          if(this.categories.indexOf(card.category) == -1){
            this.categories.push(card.category); 
          }
          this.i++
        });
        this.leng = this.i; 
        this.i = 0;
      })
      .catch(function(err){
        console.log(err);
      })
    }
  },
  components:{
    appHeader: appHeader
  }
}
</script>

<style lang="scss">
body{
  color: #36454f;
}

.fadeSlide-leave-active {
  transition: opacity .5s;
  transition: all 300ms;
  transform:translateX(-100px);
}
.fadeSlide-enter{
  transform: translatey(0px);
} 
.fadeSlide-leave-to {
  opacity: 0;
  transform: translateX(50px);
  transition: all 300ms;
}
</style>
