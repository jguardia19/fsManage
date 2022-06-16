<template>
   <div id="app">

       <component :is="layout">
             <router-view :layout.sync="layout"/>
        </component>

   </div>
</template>

<script>
const defaultLayout = 'login-layout'
export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
   
  }),
  
  computed:{
         layout(){
                return (this.$route.meta.layout || defaultLayout)
          }
  }
};
</script>
<style lang="scss">

</style>