<template>
  <div class='container'>
    <h1>Category(s): {{ selectedCats.join(', ') }}</h1>
    <button 
      id='deleteBtn'
      class='btn btn-danger'
      @click='deleteCard(categoryCards[i]._id)'
      v-if='showingSelected'>
        Delete Card
      </button>
    <hr>
    <div id='wrong-right-container'>
      <div id='toggle-switch-container'>
        <div id='all' :class="showingSelected ? 'all-active' : 'unactive' " 
        @click='showingSelected = true 
        i = 0
        showingFront = true'>
          <h5>All</h5>
        </div>
        <div :class="!showingSelected ? 'wrong-active' : 'unactive' " id='wrong' 
        v-show='wrongCards.length > 0'
        @click='showingSelected = false
        i = 0
        showingFront = true'>
          <h5>Wrong</h5>
        </div>
      </div>
      <div>
        <h2>Correct: {{ categoryCards.length - wrongCards.length }} / {{ categoryCards.length }}</h2>
      </div>
    </div>
    <div id='icon-container'>
      <h2 id='thumb-down'><i class='far fa-thumbs-up' @click='thumbsDown(showingSelected ? categoryCards[i]._id : wrongCards[i]._id)' :class='(showingSelected ? categoryCards[i].difficulty : wrongCards[i].difficulty) === "bad" ? "active-thumb-down" : ""'></i></h2>
      <h2 id='thumb-up'><i class='far fa-thumbs-down' @click='thumbsUp(showingSelected ? categoryCards[i]._id : wrongCards[i]._id)' :class='(showingSelected ? categoryCards[i].difficulty : wrongCards[i].difficulty) === "good" ? "active-thumb-up" : ""'></i></h2>
    </div>
    <div class='card' :class="showingFront ? 'front' : 'card'" v-if='showingFront' @click='showingFront = false'>
      <h3>{{ showingSelected ? categoryCards[i].front : wrongCards[i].front}}</h3>
    </div>
    <div class='card' id='card' v-else-if='!showingFront' @click='showingFront = true'>
      <p id='small-length' v-if='(showingSelected && categoryCards[i].back.length < 20) || (!showingSelected && wrongCards[i].back.length < 20)'>{{ showingSelected ? categoryCards[i].back : wrongCards[i].back }}</p>
      <p v-else id='big-length' style='white-space: pre-wrap'>{{ showingSelected ? categoryCards[i].back : wrongCards[i].back }}</p>
    </div>
    <div id='button-div'>
        <button id='backward' class='btn btn-primary' v-show='i > 0' @click='backward'><i class='fas fa-arrow-left'></i></button>
        <button id='forward' class='btn btn-primary' v-show='(showingSelected && i < categoryCards.length - 1 || !showingSelected && i < wrongCards.length - 1)' @click='forward'><i class='fas fa-arrow-right'></i></button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['selectedCategories', 'selectedCats', 'allcards'],
  data(){
    return {
      showingFront: true,
      categoryCards: [],
      wrongCards: [],
      i: 0,
      showingSelected: true
    }
  },
  created(){
    this.addCatCards();
    this.getWrongCards();
  },
  methods:{
    addCatCards(){
        for(let index in this.allcards){
          if(this.selectedCats.indexOf(this.allcards[index].category) !== -1){
            this.$set(this.categoryCards, this.i, {...this.allcards[index]})
            this.i++
          }
        }
        this.i = 0;
      
    },
    getWrongCards(){
      for(let index in this.categoryCards){
          if(this.categoryCards[index].difficulty == 'bad'){
            this.$set(this.wrongCards, this.i, {...this.categoryCards[index]});
            this.i++;
          }
        };
      this.i = 0;
    },
    forward(){
      if(this.i < this.categoryCards.length - 1){
        this.i ++;
      }
      this.showingFront = true;
    },
    backward(){
      if(this.i > 0){
        this.i --;
      }
      this.showingFront = true;
    },
    adjustAllRight(id){
      for(let index in this.categoryCards){
        if(this.categoryCards[index]._id == id){
          this.categoryCards[index].difficulty = 'good';
        }
      }
      for(let index in this.wrongCards){
        if(this.wrongCards[index]._id == id){
          this.wrongCards.splice(index, 1);
        }
      }
    },
    adjustAllWrong(id){
      for(let index in this.wrongCards){
        if(this.wrongCards[index]._id == id){
          return;
        }
      }
      for(let index in this.categoryCards){
        if(this.categoryCards[index]._id == id){
          this.categoryCards[index].difficulty = 'bad';
          this.$set(this.wrongCards, this.wrongCards.length , {...this.categoryCards[index]});
        }
      }
    },
    deleteCard(id){
      axios.delete('http://localhost:8000/api/flashcards/' + id, {
      })
      .then((card) => {
      })
      .catch(function(err){
        console.log(err);
      })
    },
    thumbsDown(id){
      this.adjustAllWrong(id);
      this.$emit('thumbsDownCatChange', id); 
      axios.put('http://localhost:8000/api/flashcards/' + id, {
        difficulty: 'bad'
      })
      .then((card) => {
      })
      .catch(function(err){
        console.log(err);
      })
    },
    thumbsUp(id){
      this.adjustAllRight(id);
      if(this.wrongCards.length == 0){
        this.showingSelected = true;
        this.i = 0;
      }else if(this.i == this.wrongCards.length){
        this.i --;
      }
      this.$emit('thumbsUpCatChange', id)
      axios.put('http://localhost:8000/api/flashcards/' + id, {
        difficulty: 'good'
      })
      .then((card) => {
        console.log('good');
      })
      .catch(function(err){
        console.log(err);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #deleteBtn{
    min-width: 150px;
  }
  #wrong-right-container{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .front{
    background-image: url('https://upload.wikimedia.org/wikipedia/commons/2/2e/Notecard.jpg');
  }
  .card {
    cursor: pointer;
    margin: 50px auto;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 270px;
    width: 50%;
    background-size: cover;
    box-shadow: 1px 1px 4px black;
  }
  .container{
    margin-top: 20px;
  }
  button{
    width: 60px;
  }
  #button-div{
    margin: auto;
    width: 50%;
  }
  #forward{
    float: right;
  }
  #small-length{
    font-size: 30px;
  }
  #big-length{
    font-size: 15px;
    text-align: center;
    padding: 10px;
  }
  #icon-container{
    display: flex;
    margin: auto;
    justify-content: space-between;
    width: 30%;
    margin-bottom: -30px;
  }
  #thumb-up{
    cursor: pointer;
    transform: rotateX(180deg);
  }
  #thumb-down{
    cursor: pointer;
    transform: rotate(180deg);
  }
  .active-thumb-up{
    color: lightgreen
  }
  .active-thumb-down{
    color: lightcoral;
  }
  #thumb-up:hover{
    color: lightgreen;
  }
  #thumb-down:hover{ 
    color: lightcoral;
  }
  #toggle-switch-container{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    align-self: flex-end
  }
  #all{
    display: flex;
    justify-content: center;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    height: 30px;
    width: 100px;
    box-shadow: 1px 1px 5px black; 
    cursor: pointer;
    transition: all 300ms;
  }
  .unactive{
    background-color: rgba(0,0,0, 0.15);
  }
  #wrong{
    display: flex;
    justify-content: center;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    height: 30px;
    width: 100px;
    box-shadow: 1px 1px 5px black; 
    cursor: pointer;
    transition: all 300ms;
  }
  #all:hover{
    background-color: lightgreen;
  }
  #wrong:hover{
    background-color: lightcoral;
  }
  .all-active{
    background-color: lightgreen;
  }
  .wrong-active{
    background-color: lightcoral; 
  }

  @media screen and(max-width: 800px){
    .card{
      flex-grow: 1;
      width: 100%;
    }
    #button-div{
      width: 100%;
    }
    #icon-container{
      display: flex;
      margin: auto;
      justify-content: space-between;
      width: 100%;
      margin-bottom: -30px;
    }
  }
</style>
