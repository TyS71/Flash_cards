<template>
  <div class='container'>
    <div class="categoryitems-selected">
      <div class='unselected-header' v-show='selectedCats.length != leng'>
        <br>
        <h2>Unselected Categories:</h2>
        <hr>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Search</span>
          </div>
          <input type="text" class="form-control" v-model='userInput'>
        </div>
      </div>
      <div class='category-container'>
        <div 
          class= "category-div-multi" 
          v-for='category in categories' 
          :key='category'
          v-if='selectedCats.indexOf(category) === -1 && category.toLowerCase().includes(userInput.toLowerCase())'
          @click.stop='categoriesSelected(category)'
          >
          {{ category }}
          </div>
      </div>
    </div>
    <div class="selected-categories">
      <div class='selected-header' v-if='selectedCats.length > 0'>
        <br>
        <h2>Selected Categories:</h2>
        <hr>
      </div>
      <div class='selected-container'>
          <div 
            class="category-div-multi"
            v-for='category in categories' 
            :key='category'
            v-if='selectedCats.indexOf(category) !== -1'
            @click.stop='categoriesSelected(category)'
            >
            {{ category }}
          </div>
      </div>
      <router-link
          v-if='selectedCats.length > 0'
          to='categories'
          tag='button'
          class='btn btn-primary'
        >Get Cards</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['categories', 'leng', 'selectedCats'],
  data(){
    return{
      userInput: ''
    }
  },
  methods: {
      categoriesSelected(category){
        this.$emit('categoriesSelected', category);
      }
    }
  }
</script>

<style lang="scss" scoped>
  button{
    display: flex;
    justify-content:center;
    margin: 20px auto;
    width: 40%;
  }
  hr{
    width: 100%;
  }
  .categoryitems-selected{
    padding: 10px;
    width: 50%;
    border-right: solid rgba(0,0,0,0.1);
    word-wrap: normal;
  }
  
  .category-div-multi{
    cursor: pointer;
    display: flex;
    flex-shrink: 1; 
    flex-basis: 40%;
    height: 140px; 
    width: 100vw;
    background-image: url('https://upload.wikimedia.org/wikipedia/commons/2/2e/Notecard.jpg'); 
    margin: 15px;
    justify-content: center;
    align-items: center;
    background-size: cover;
    box-shadow: 1px 1px 5px black;
    transition: transform 300ms;
  }
  .container{
    display: flex;
    margin: auto;
  }
  .selected-categories{
    padding: 10px;
    width: 50%;
    word-wrap: normal;
  }
  .category-container{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .category-div-multi:hover {
    transform: scale(1.08)
  }
  .selected-container{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .unselected-header{
    width: 80%;
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-items: center;
    margin: auto;
    margin-bottom: 15px;
  }
  .selected-header{
    width: 80%;
    display: flex;
    flex-direction: column; 
    align-items: center;
    margin:auto;
    margin-bottom: 15px;
  }

  @media screen and(max-width: 1000px){
    .category-div-solo{
      width: 100vw;
      flex-basis: 100%;
    }
    .category-div-multi{
      width: 100vw;
      flex-basis: 100%;
    }
    .unselected-header input{
      width: 60%;
    }
    .btn{
      width: 85%;
    }
    h2{
      font-size: 1.5em;
    }
  }
  @media screen and(max-width: 800px){
    .category-div-solo{
      flex-grow: 1;
    }
    .category-div-multi{
      flex-grow: 1;
    }
    #inputGroup-sizing-default{
      font-size: 1.5px;
    }
  }
</style>

