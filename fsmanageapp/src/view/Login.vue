<template>
  <v-container class="container-login">

     <div class="login text-center">
        <v-form>
           <v-row>
              <v-col cols="12" class="text-center">
                  <h3 class="indigo--text">fsManage</h3>
              </v-col>
              <v-col cols="12">
                 <v-text-field outlined label="Username"  type="text" v-model="dataUser.user"></v-text-field>
                 <v-text-field outlined label="Password" type="password" v-model="dataUser.pass"></v-text-field>
              </v-col>
              <v-col cols="12">
                 <v-btn tile class="mr-2" color="warning">Olvide la contarseña</v-btn>
                 <v-btn tile color="indigo" dark >Enter</v-btn>
              </v-col>
           </v-row>
        </v-form>
         
     </div>
      
  </v-container>
  

</template>

<script>
// import axios from 'axios'
export default {
    data(){
       return{

          dataUser:{
            user:'',
            pass:''
          }
          
       }
    },
    methods: {
    //   async accessLogin(){
    //        try{
    //           const response = await axios.post('http://localhost/api_data/login_api',this.dataUser)
    //           console.log(response.data)
    //           if(response.data.name_user){
    //              sessionStorage.setItem('autenticado',true)
    //              this.$router.push('/Home')
    //           }else{
    //              console.log('usuario incorrecto')
    //           }
    //        }catch(e){
    //           console.log(e)
    //        }
    //     }
    },
}
</script>

<style lang="scss">

//    @import '../sass/variables.scss';


   .btn-prueba{
    //   background: $background-trainHealthy !important;
   }

   .container-login{
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      width: 100%;
      height: 100vh;
   
      .login{
         width: 350px;
         height: 350px;
         background: #fff;
         border-radius: 10px;
         padding: 15px;
         box-shadow: 0px 9px 28px 6px #d3d3d3;
          
       }
   }
   

</style>
