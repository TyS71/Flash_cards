<template>
  <nav class="navbar navbar-dark bg-primary">
    <div class="container">
      <div id='logo-container'>
        <h1>FlashCards</h1>
      </div>
      <div id='link-container'>
        <router-link v-if='$route.name != "home"'
          class='home'
          tag='h5'
          to='/'>Categories
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  h1{
    color: white;
    text-shadow: 1px 1px 3px black;
  }
  p{
    color: white;
    text-decoration: none;
  }
  #link-container{
    display: flex; 
    flex-direction: row;
    color: white;
    height: 100%;
  }
  .home{
    cursor: pointer;
    color: white;
    text-decoration: none;
    text-shadow: 1px 1px 3px black;
    border-bottom: solid rgba(0, 0, 0, 0);
    padding: 5px;
  }
  .home:hover{
    border-bottom: white ridge;
  }
</style>

