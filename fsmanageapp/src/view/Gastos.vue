<template>
   <v-row class="mt-8 px-5"> 
        <v-col cols="12">

            <!-- modal for gastos -->
            <v-dialog v-model="modal_gastos" max-width="600">
                <v-card>
                    <v-card-title class="grey white--text">
                        <v-row>
                            <v-col cols="9">
                                <h3> {{titleForm}} gasto</h3>
                            </v-col>
                            <v-col cols="3" class="text-right">
                                <v-btn icon color="white" @click="closeModal"><v-icon>mdi-close-circle</v-icon> </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-row class="mt-5">
                            {{gasto}}
                             <v-col cols="12" sm="6" md="6" class="pt-1">
                               <v-autocomplete
                               label="Tipo de Gasto"
                               :items="tipoGastos"
                               v-model="tipoGasto"
                                outlined
                               ></v-autocomplete>
                            </v-col>
                             <v-col cols="12" sm="6" md="6" class="pt-1" v-show="showProveedor">
                                <v-autocomplete
                                    label="Proveedores"
                                    :items="Proveedores"
                                    item-text="Name"
                                    outlined
                                    return-object
                                    v-model="proveedor"
                                    @change="changeProveedor(proveedor)"
                               ></v-autocomplete>
                             </v-col>
                            <v-col cols="12" sm="6" md="6" class="pt-1">
                                <v-text-field label="Nombre de Referencia :"  v-model="gasto.Name" type="text" outlined ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pt-1">
                                <v-text-field label="Fecha:" type="date" outlined v-model="gasto.fecha" ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pt-1">
                                <v-text-field label="Monto del Gasto:" type="number" outlined v-model="gasto.monto"></v-text-field>
                            </v-col>
                             <v-col cols="12" sm="6" md="6" class="pt-1">
                                <v-textarea
                                    label="Descripcion del gasto"
                                    outlined
                                    rows="3"
                                    v-model="gasto.descripcion"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="text-right">
                                <v-btn class="gray" v-if="this.action != 1">EDIT</v-btn>
                                <v-btn class="gray" @click="addNewGasto" v-else>ADD</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <!-- table of data -->
             <v-data-table 
                :headers="headers" 
                :items="Gastos" 
                :footer-props="{'items-per-page-options':[5,10, 15, 30, 50, -1]}"
                :options="options"
                class="elevation-6" 
                :search="search">
        
                <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>Gastos</v-toolbar-title>
                                <v-divider  class="mx-4" inset vertical ></v-divider>
                                <v-spacer></v-spacer>
                                <v-btn class="grey" @click="modal_gastos = true" >ADD New +</v-btn>
                            </v-toolbar>
                    </template>

                    <template v-slot:item.actions="{ item }">
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
                {text:'#',value: 'id',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Nombre o Referencia",value: 'Name',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Monto($)",value: 'monto',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Fecha",value: 'fecha',align: 'center', class:'grey white--text px-0 mx-0'},
                { text: 'Actions', value: 'actions',  align: 'center', class:'grey white--text px-0 mx-0'}
            ],
            search:'',


            modal_gastos:false,
            action:1,

            gasto:{
                Name:"",
                tipoGasto:"",
                idProveedor:null,
                monto:0,
                fecha:"",
                descripcion:""
            },
            tipoGastos:['Proveedor','Otro'],
            tipoGasto:'',
            showProveedor:false,
            proveedor:{},
            Gastos:[
                {id:1,Name:"Compra cafe",tipoGasto:"Otro",idProveedor:null,monto:50,fecha:"2021-08-19",descripcion:"Nuevo gasto realizado"},
                {id:2,Name:"Compra Bolsas",tipoGasto:"Otro",idProveedor:null,monto:10,fecha:"2021-08-19",descripcion:"Nuevo gasto realizado"},
                {id:3,Name:"Shop millenium c.a",tipoGasto:"Proveedor",idProveedor:null,monto:12.5,fecha:"2021-08-19",descripcion:"Nuevo gasto realizado"},
                {id:4,Name:"Shop millenium c.a",tipoGasto:"Proveedor",idProveedor:null,monto:8,fecha:"2021-08-19",descripcion:"Nuevo gasto realizado"},
                {id:5,Name:"Pago pendiente a taxi",tipoGasto:"Otro",idProveedor:null,monto:23.8,fecha:"2021-08-19",descripcion:"Nuevo gasto realizado"},
                {id:6,Name:"Comida",tipoGasto:"Otro",idProveedor:null,monto:12.9,fecha:"2021-08-19",descripcion:"Nuevo gasto realizado"},
                {id:7,Name:"Servicio Internet",tipoGasto:"Otro",idProveedor:null,monto:20,fecha:"2021-08-19",descripcion:"Nuevo gasto realizado"},
                {id:8,Name:"Lisys shop c.a",tipoGasto:"Proveedor",idProveedor:null,monto:85,fecha:"2021-08-19",descripcion:"Nuevo gasto realizado"},
            ]
         }
     },

     computed:{
         titleForm(){
             return this.action === 1 ? 'Create' : 'Edit'
         },

         ...mapState(['Proveedores'])
     },
     watch:{
         tipoGasto(value){
             if(value === 'Proveedor'){
                 this.proveedor = {}
                 this.showProveedor = true
                 this.gasto.tipoGasto = value
             }else{
                 this.proveedor = {}
                 this.gasto.tipoGasto = value
                 this.showProveedor = false
                 if(this.action === 1){
                     this.gasto.Name = ''
                 }
                this.gasto.idProveedor = null
             }
         }
     },

     methods: {

         changeProveedor(proveedor){
             this.gasto.Name = proveedor.Name
             this.gasto.idProveedor = proveedor.id
         },


         addNewGasto(){


             this.closeModal()
         },

         editedItem(item){
             this.gasto = Object.assign({},item)
             this.tipoGasto = item.tipoGasto
             this.action = 0
             this.modal_gastos = true
         },

         closeModal(){
             this.action = 1
             this.gasto.Name = '',this.gasto.tipoGasto = '',this.gasto.idProveedor = null, this.gasto.monto = 0, this.gasto.fecha = '',
             this.gasto.descripcion = '',this.tipoGasto = '', this.showProveedor = false
             delete this.gasto.id
            this.modal_gastos = false
         }
     },
}
</script>

<style>

</style>