<template>
   <v-row class="mt-8 px-5"> 
        <v-col cols="12">
            <!-- modal for clients -->
            <v-dialog v-model="modal_cliente" max-width="600">
                <v-card>
                    <v-card-title class="grey white--text">
                        <v-row>
                            <v-col cols="12">
                                <h3> Create cliente</h3>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-row class="mt-5">
                            <v-col cols="12" sm="6" md="6" class="pt-3">
                                <v-text-field label="Nombre del cliente:" type="text" outlined ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pt-3">
                                <v-text-field label="Cedula:" type="text" outlined ></v-text-field>
                            </v-col>
                             <v-col cols="12" sm="6" md="6" class="pt-3">
                                <v-text-field label="Telefono:" type="text" outlined ></v-text-field>
                            </v-col>
                             <v-col cols="12" sm="6" md="6" class="pt-3">
                                <v-text-field label="Dirección:" type="text" outlined ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <span>Status:</span>
                                 <v-radio-group row >
                                <v-radio
                                    color="success"
                                    label="Active"
                                    :value="true"
                                ></v-radio>
                                <v-radio
                                   color="error"
                                    label="Inactive"
                                    :value="false"
                                ></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="text-right">
                                <v-btn class="gray" >ADD</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <v-col cols="12">
                <template>
                    <v-sheet elevation="6" class="mb-3">
                        <v-tabs
                        background-color="primary"
                        dark
                        next-icon="mdi-arrow-right-bold-box-outline"
                        prev-icon="mdi-arrow-left-bold-box-outline"
                        show-arrows
                        >
                        <v-tabs-slider color="yellow"></v-tabs-slider>
                        <v-tab
                            v-for="(item,index,) of ventas"
                            :key="index"
                            :href="'#tab-' + index+1"
                            @click="eventoPrueba(item)"
                        >
                            Venta {{ index +1 }}
                        </v-tab>
                        </v-tabs>
                    </v-sheet>
                    </template>
            </v-col>

            <v-card>
                    <v-card-title class="grey white--text">
                        <v-row>
                            <v-col cols="12">
                                <h3> {{titleForm}} Venta</h3>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-row class="mt-5 mb-5 contenedor"> 
                            <v-col cols="4">
                                <v-text-field label="Número de Cedula:" outlined type="text" v-model="num_cedula"></v-text-field>
                            </v-col>
                             <v-col cols="4" class="pt-5">
                                <v-btn class="primary" @click="buscarCliente">Buscar</v-btn>
                            </v-col>
                           <v-col cols="12" v-if="searchCliente.length > 0">
                               <v-row class="primary white--text mb-3" style="border-radius:10px">
                                    <v-col cols="12" class="text-center">
                                        <h3>DATOS DEL CLIENTE</h3>
                                    </v-col>
                                    <v-col cols="4">
                                        NOMBRE: {{searchCliente[0].name}}
                                    </v-col>
                                    <v-col cols="4">
                                        CEDULA: {{searchCliente[0].cedula}}
                                    </v-col>
                                    <v-col cols="4">
                                        TÉLEFONO: {{searchCliente[0].phone}}
                                    </v-col>
                                     <v-col cols="4">
                                        DIRECCIÓN: {{searchCliente[0].adress}}
                                    </v-col>
                               </v-row>
                           </v-col>
                           <v-col cols="12" v-if="encontrado">
                               <v-alert type="info" outlined>Usuario no esta registrado!!!  <v-btn text color="success" @click="modal_cliente = true">Registrar</v-btn> </v-alert>
                           </v-col>
                        </v-row>
                        
                        <v-row class="mt-5 contenedor" v-if="searchCliente.length > 0">
                           <v-col cols="3">
                              <v-autocomplete
                               :items="categorys"
                               item-text="name"
                               label="Elige una categoria"
                               outlined
                               return-object
                              ></v-autocomplete>
                          </v-col>
                           <v-col cols="3">
                              <v-autocomplete
                               :items="marcas"
                               item-text="name"
                               label="Elige por marca"
                               outlined
                               return-object
                              ></v-autocomplete>
                          </v-col>
                          <v-col cols="3">
                              <v-autocomplete
                               :items="productos"
                               item-text="name"
                               label="Elige un producto"
                               outlined
                               return-object
                               v-model="producto"
                              ></v-autocomplete>
                          </v-col>
                          <v-col cols="2" class="text-left">
                             <v-text-field type="number" label="Cantidad" v-model="cantidad" outlined></v-text-field>
                          </v-col>
                          <v-col cols="1" class="text-left">
                              <v-btn @click="addProducto" class="primary mt-2">ADD + </v-btn>
                          </v-col>
                          <v-col cols="12">
                               <v-simple-table dense v-if="detailVenta.length > 0" >
                                    <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-center">
                                                <h3>Item</h3>
                                            </th>
                                            <th class="text-center">
                                                <h3>Name Producto</h3> 
                                            </th>
                                            <th class="text-center">
                                                <h3>Cantidad</h3> 
                                            </th>
                                             <th class="text-center">
                                                <h3>Precio Unitario</h3> 
                                            </th>
                                             <th class="text-center">
                                                <h3>Total</h3> 
                                            </th>
                                            <th class="text-center">
                                                <h3> Actions</h3>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                        v-for="(item,index) in detailVenta"
                                        :key="index"
                                        >
                                            <td class="text-center"> {{index+1}} </td>
                                            <td class="text-center">{{item.name}} </td>
                                            <td class="text-center">
                                                <input type="number" style="text-align:center;outlined:none;" v-model="detailVenta[index].cantidad" @keyup="aumentarCantidad(index)" @change="aumentarCantidad(index)" >
                                            </td>
                                            <td class="text-center">{{item.precioUnitario}} </td>
                                            <td class="text-center">{{item.total}} </td>
                                            <td class="text-center">
                                               <v-btn icon color="error" @click="removeItem(index)"><v-icon>mdi-close-circle</v-icon> </v-btn>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="6" class="text-right">
                                                <b>Monto total: {{monto_total}} {{simbolo}}  </b>  <br>
                                                 <b>Monto iva 12%: {{iva.toFixed(2)}}  {{simbolo}} </b>  <br>
                                                 <p style="font-size:18px;color:green;">Monto total a cancelar : {{monto_completo.toFixed(2)}} {{simbolo}}  </p>  <br>
                                            </td>
                                        </tr>
                                    </tbody>
                                    </template>
                                </v-simple-table>
                          </v-col>
                        </v-row>

                        <v-row class="mt-5 mb-5 contenedor" v-if="detailVenta.length > 0"> 
                             <v-col cols="12">
                                <span>Tipo de venta:</span>
                                 <v-radio-group row  v-model="tipo_venta">
                                    <v-radio
                                        color="success"
                                        label="Al contado"
                                        value="Contado"
                                    ></v-radio>
                                    <v-radio
                                    color="warning"
                                        label="Por Abono"
                                        value="Abono"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col cols="4" v-if="tipo_venta === 'Contado'">
                                <v-text-field outlined label="Monto a Cancelar:" type="text" disabled v-model="monto_completo"></v-text-field>
                            </v-col>
                            <v-col cols="12" v-if="tipo_venta === 'Abono'">
                                <v-row>
                                    <v-col cols="4" >
                                        <v-text-field outlined label="Monto de Abono" type="number" v-model="monto_abono"></v-text-field>
                                        <span class="red--text" v-if="showAlert">Monto excede al monto total</span>
                                    </v-col>
                                    <v-col cols="4">
                                         <v-text-field outlined label="Monto de resto" type="number" v-model="monto_resto"></v-text-field>
                                    </v-col>
                                    <v-col cols="4"><v-text-field outlined label="Monto a cancelar" disabled type="number" v-model="monto_completo"></v-text-field></v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="text-right">
                                <v-btn class="gray" v-if="this.action != 1">EDIT</v-btn>
                                <v-btn class="gray"  v-else>ADD</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

        </v-col>
   </v-row>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
export default {
     data(){
         return{

            modal_cliente:false,
            action:1,
            num_cedula:'',
            cliente:[],

            marcas:[],

            producto:{},
            cantidad:1,
            detailVenta:[],

            tipo_venta:'',
            monto_abono:0,
            monto_resto:0,
            showAlert:false,

            simbolo:'$'



         }
     },

     computed:{
         titleForm(){
             return this.action === 1 ? 'Create' : 'Edit'
         },
         
         monto_total(){
            const acumular = (acumulador,productos) => acumulador + productos.total
            const data =  this.detailVenta.reduce(acumular,0)
            return data
         },

         iva(){
            let iva = this.monto_total*12/100
            return iva
         },

         monto_completo(){
            let total = this.monto_total + this.iva
            return total
         },


         ...mapState('productos',['productos']),

         ...mapState('clientes',['searchCliente','encontrado']),

         ...mapState('categorys',['categorys']),

         ...mapState('ventas',['ventas'])
     },

     watch:{
         monto_abono(value){
             if(value>this.monto_total){
                 this.monto_resto = 0
                 this.showAlert = true
             }else{
                this.monto_resto = this.monto_total  - value 
                this.showAlert = false
             }
             if(value === 0){
                 this.monto_resto = this.monto_total
             }
         },
     },

     methods: {

        ...mapMutations('clientes',['setSearchCliente']),

        ...mapMutations('ventas',['setAddNewVenta']),

         editedItem(item){
             this.venta = Object.assign({},item)
             this.action = 0
             this.modal_venta = true
         },

         eventoPrueba(i){
            console.log(i)
         },

         closeModal(){
             this.action = 1
            this.modal_venta = false
            this.num_cedula = ''
            this.cliente = []
            this.detailVenta = []
         },

         addProducto(){
             if(Object.keys(this.producto).length === 0){
                 alert('Debes seleccionar un producto')
             }else{
                this.detailVenta.push({
                    name:this.producto.name,
                    cantidad:this.cantidad,
                    precioUnitario:this.producto.precioVenta,
                    total:this.producto.precioVenta*this.cantidad
                }) 
             }
             
             this.producto = {}
             this.cantidad = 1
         },

         removeItem(index){
             this.detailVenta.splice(index,1)
         },

        aumentarCantidad(index){
             this.detailVenta[index].total = this.detailVenta[index].precioUnitario * this.detailVenta[index].cantidad
         },

         buscarCliente(){
             this.monto_abono = 0
             this.monto_resto = 0

            this.setSearchCliente(this.num_cedula)

            if(this.searchCliente.length > 0){
                let data = {
                    "numeroVenta":this.ventas.length+1,
                    "cedulaComprador":this.num_cedula,
                     "detalles":[]
                }
                this.setAddNewVenta(data)
            }

            // this.cliente =  this.Clientes.filter(item => item.cedula === this.num_cedula)
            // this.encontrado =  this.cliente.length > 0 ? true : false
         }
     },
}
</script>

<style lang="scss">
    .contenedor{
        border: 1px solid #d3d3d3;
        border-radius: 6px;
        padding: 8px;
    }
     .v-application .pt-3 {
      padding-top: 4px !important;
      padding-bottom: 0px !important;
    }
</style>