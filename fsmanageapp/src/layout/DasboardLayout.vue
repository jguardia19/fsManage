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
                    <v-list-item to="/Categorias" color="white" >
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
                     <v-list-item to="/Ventas" color="white" >
                        <v-list-item-icon>
                          <v-icon>mdi-shopping</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title >Productos</v-list-item-title>
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
                    <v-list-item to="/productos" color="white" >
                        <v-list-item-icon>
                          <v-icon>mdi-cart</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title >Ventas</v-list-item-title>
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
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>fsManage</v-toolbar-title>
    </v-app-bar>

    <v-main>
        <slot />
    </v-main>
  </v-app>
</template>

<script>
export default {
    data(){
        return{
             drawer: null
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

</style>