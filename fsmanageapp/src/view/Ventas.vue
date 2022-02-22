<template>
   <v-row class="mt-8 px-5"> 
        <v-col cols="12">
            <!-- modal for clients -->
            <v-dialog v-model="modal_cliente" max-width="600">
                <v-card>
                    <v-card-title class="grey white--text">
                        <v-row>
                            <v-col cols="9">
                                <h3> Create cliente</h3>
                            </v-col>
                            <v-col cols="3" class="text-right">
                                <v-btn icon color="white" @click="modal_cliente = false"><v-icon>mdi-close-circle</v-icon> </v-btn>
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

            <!-- modal for ventas -->
            <v-dialog v-model="modal_venta" max-width="800">
                <v-card>
                    <v-card-title class="grey white--text">
                        <v-row>
                            <v-col cols="9">
                                <h3> {{titleForm}} Venta</h3>
                            </v-col>
                            <v-col cols="3" class="text-right">
                                <v-btn icon color="white" @click="closeModal"><v-icon>mdi-close-circle</v-icon> </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-row class="mt-5 mb-5 contenedor"> 
                            <v-col cols="4">
                                <v-text-field label="Número de Cedula:" outlined type="text" v-model="num_cedula"></v-text-field>
                            </v-col>
                             <v-col cols="4" class="pt-5">
                                <v-btn class="primary" @click="searchCliente">Buscar</v-btn>
                            </v-col>
                           <v-col cols="12" v-if="cliente.length > 0">
                               <v-row class="primary white--text mb-3" style="border-radius:10px">
                                    <v-col cols="12" class="text-center">
                                        <h3>DATOS DEL CLIENTE</h3>
                                    </v-col>
                                    <v-col cols="4">
                                        NOMBRE: {{cliente[0].Name}}
                                    </v-col>
                                    <v-col cols="4">
                                        CEDULA: {{cliente[0].cedula}}
                                    </v-col>
                                    <v-col cols="4">
                                        TÉLEFONO: {{cliente[0].phone}}
                                    </v-col>
                                     <v-col cols="4">
                                        DIRECCIÓN: {{cliente[0].direccion}}
                                    </v-col>
                               </v-row>
                           </v-col>
                           <v-col cols="12" v-if="!encontrado">
                               <v-alert type="info" outlined>Usuario no esta registrado!!!  <v-btn text color="success" @click="modal_cliente = true">Registrar</v-btn> </v-alert>
                           </v-col>
                        </v-row>
                        
                        <v-row class="mt-5 contenedor" v-if="cliente.length > 0">
                          <v-col cols="4">
                              <v-autocomplete
                               :items="Productos"
                               item-text="Name"
                               label="Elige un producto"
                               outlined
                               return-object
                               v-model="producto"
                              ></v-autocomplete>
                          </v-col>
                          <v-col cols="4" class="text-left">
                             <v-text-field type="number" label="Cantidad" v-model="cantidad" outlined></v-text-field>
                          </v-col>
                          <v-col cols="4" class="text-left">
                              <v-btn @click="addProducto">Agregar</v-btn>
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
                                                <input type="number" style="text-align:center;" v-model="detailVenta[index].cantidad" @keyup="aumentarCantidad(index)" @change="aumentarCantidad(index)" >
                                            </td>
                                            <td class="text-center">{{item.precioUnitario}} </td>
                                            <td class="text-center">{{item.total}} </td>
                                            <td class="text-center">
                                               <v-btn icon color="error" @click="removeItem(index)"><v-icon>mdi-close-circle</v-icon> </v-btn>
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
                                <v-text-field outlined label="Monto a Cancelar:" type="text" v-model="monto_total"></v-text-field>
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
                                    <v-col cols="4"><v-text-field outlined label="Monto de Abono" type="number" v-model="monto_total"></v-text-field></v-col>
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
            </v-dialog>

            <!-- table of data -->
             <v-data-table 
                :headers="headers" 
                :items="ventas" 
                :footer-props="{'items-per-page-options':[5,10, 15, 30, 50, -1]}"
                :options="options"
                class="elevation-6" 
                :search="search">
        
                <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>Ventas</v-toolbar-title>
                                <v-divider  class="mx-4" inset vertical ></v-divider>
                                <v-spacer></v-spacer>
                                <v-btn class="grey" @click="modal_venta = true" >ADD New +</v-btn>
                            </v-toolbar>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <v-tooltip bottom >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon color="gray"  v-bind="attrs" v-on="on"><v-icon>mdi-eye</v-icon> </v-btn>
                                    </template>
                                    <span>View</span>
                            </v-tooltip>
                           <v-tooltip bottom >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon color="gray" @click="editedItem(item)" v-bind="attrs" v-on="on"><v-icon>mdi-border-color</v-icon> </v-btn>
                                    </template>
                                    <span>Edit</span>
                            </v-tooltip>
                             <v-tooltip bottom >
                                    <template v-slot:activator="{ on, attrs }">
                                         <v-btn icon color="gray" v-bind="attrs" v-on="on"><v-icon>mdi-delete-forever</v-icon> </v-btn>
                                    </template>
                                    <span>Delete</span>
                            </v-tooltip>
                    </template>
            </v-data-table>
        </v-col>
   </v-row>
</template>

<script>
import {mapState} from 'vuex'
export default {
     data(){
         return{
                options: {
                 itemsPerPage: 10
                },
            headers: [ 
                {text:'#Venta',value: 'id',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Name",value: 'Name',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Cedula",value: 'rif',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Método Pago",value: 'metodo',align: 'center', class:'grey white--text px-0 mx-0'},
                 { text:"Total a pagar",value: 'rif',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Telefono",value: 'phone',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"status",value: 'estado',align: 'center', class:'grey white--text px-0 mx-0'},
                { text: 'Actions', value: 'actions',  align: 'center', class:'grey white--text px-0 mx-0'}
            ],
            search:'',


            modal_venta:false,
            modal_cliente:false,
            action:1,
            num_cedula:'',
            cliente:[],
            encontrado:true,

            ventas:[],

            producto:{},
            cantidad:1,
            detailVenta:[],

            tipo_venta:'',
            monto_abono:0,
            monto_resto:0,
            showAlert:false,



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

         ...mapState(['Productos','Clientes'])
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
         }
     },

     methods: {

         editedItem(item){
             this.venta = Object.assign({},item)
             this.action = 0
             this.modal_venta = true
         },

         closeModal(){
             this.action = 1
            this.modal_venta = false
            this.num_cedula = ''
            this.cliente = []
            this.detailVenta = []
         },

         addProducto(){
             if(this.producto === {}){
                 alert('Debes seleccionar un producto')
             }else{
                this.detailVenta.push({
                    name:this.producto.Name,
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

         searchCliente(){
             this.monto_abono = 0
             this.monto_resto = 0
            this.cliente =  this.Clientes.filter(item => item.cedula === this.num_cedula)
            this.encontrado =  this.cliente.length > 0 ? true : false
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
</style>