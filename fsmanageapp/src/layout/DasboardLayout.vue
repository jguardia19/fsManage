<template>
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        color="gray" dark
        app
      >
        <div class="contenedor-avatar">
           <img src="@/assets/logo_prueba.png" alt="">
        </div>

        <v-divider ></v-divider>  

                 <v-list dense>
                   <v-list-item to="/Home" color="white" >
                        <v-list-item-icon>
                          <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title >Home </v-list-item-title>
                    </v-list-item>

                     <!-- accesos para el administrador -->
                     <v-list-group color="white" >
                        <template v-slot:activator>
                            <v-list-item-icon class="">
                                                    
                            </v-list-item-icon>
                            <v-list-item-content  >Admin</v-list-item-content>
                        </template>
                        <span>
                            <v-list-item to="/admin/typeUsers" color="white" >
                                <v-list-item-icon>
                                </v-list-item-icon>
                                <v-list-item-title >Type Users</v-list-item-title>
                            </v-list-item>
                        </span>
                        <span>
                            <v-list-item to="/admin/categorys" color="white" >
                                <v-list-item-icon>
                                </v-list-item-icon>
                                <v-list-item-title >Categorys</v-list-item-title>
                            </v-list-item>
                        </span>
                        <span>
                          <v-list-item to="/admin/status" color="white" >
                              <v-list-item-icon>
                              </v-list-item-icon>
                              <v-list-item-title >Status</v-list-item-title>
                          </v-list-item>
                        </span>
                        <span>
                          <v-list-item to="/admin/users" color="white" >
                              <v-list-item-icon>
                              </v-list-item-icon>
                              <v-list-item-title >Users</v-list-item-title>
                          </v-list-item>
                        </span>
                     </v-list-group>
                    
                    <!-- accesos para el user -->
                    <v-list-item to="/Categorys" color="white" >
                        <v-list-item-icon>
                          <v-icon>mdi-shape-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title >Category </v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/Proveedores" color="white" >
                        <v-list-item-icon>
                            <v-icon>mdi-truck</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title >Proveedores</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/clientes" color="white" >
                        <v-list-item-icon>
                          <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title >Clientes</v-list-item-title>
                    </v-list-item>
                     <v-list-item to="/Productos" color="white" >
                        <v-list-item-icon>
                          <v-icon>mdi-shopping</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title >Productos</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/ventas" color="white" >
                        <v-list-item-icon>
                          <v-icon>mdi-cart</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title >Ventas</v-list-item-title>
                    </v-list-item>
                     <v-list-item to="/gastos" color="white" >
                        <v-list-item-icon>
                          <v-icon>mdi-cash-fast</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title >Gastos</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/CuentasPagar" color="white" >
                        <v-list-item-icon>
                          <v-icon>mdi-cash-fast</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title >Cuentas por pagar</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/cuentasCobrar" color="white" >
                        <v-list-item-icon>
                          <v-icon>mdi-cash-register</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title >Cuentas por cobrar</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/settings" color="white" >
                        <v-list-item-icon>
                            <v-icon>mdi-cogs</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title >Settings</v-list-item-title>
                    </v-list-item>
                 </v-list>
        
        <!--  -->
      </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" ></v-app-bar-nav-icon>

      <v-toolbar-title>fsManage</v-toolbar-title>
         <v-badge
            v-if="ventas.length > 0"
            color="indigo"
            :content="ventas.length.toString()"
            class="icon-sales"
          > 
          <v-btn icon color="indigo"  @click="eventonuevo">
            <v-icon color="indigo" >mdi-point-of-sale</v-icon> 
          </v-btn>
        </v-badge>
        <v-btn icon color="indigo"  @click="eventonuevo" v-else class="icon-sales">
            <v-icon color="indigo" >mdi-point-of-sale</v-icon> 
        </v-btn>
<!-- 
        <v-card class="ventas px-5 py-5" elevation="4" width="250">
           <p>Lista</p>
        </v-card> -->
    </v-app-bar>

    <v-main>
        <slot />
    </v-main>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
             drawer: null
        }
    },

    computed:{
      ...mapState('ventas',['ventas']),
    },

    methods:{
       eventonuevo(){
         console.log('accediendo al badge');
       }
    }
}
</script>

<style lang="scss">
  .contenedor-avatar{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
      img{
       width: 100px;
       height: 100px;
       border-radius: 50%;
     }
  }
  .icon-sales{
    position: absolute !important;
    right: 30px;
    z-index: 10 !important;
    cursor: pointer;
  }

  .v-badge__wrapper {
      left: -10px !important;
      top: 12px !important;
  }

  .ventas{
    position: absolute !important;
    right: 5px !important;
    top: 60px !important;
  }

</style>