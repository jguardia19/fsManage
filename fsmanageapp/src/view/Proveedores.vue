<template>
   <v-row class="mt-8 px-5"> 
        <v-col cols="12">
            <!-- modal for categories -->
            <v-dialog v-model="modal_proveedor" max-width="600">
                <v-card>
                    <v-card-title class="grey white--text">
                        <v-row>
                            <v-col cols="9">
                                <h3> {{titleForm}} Proveedor</h3>
                            </v-col>
                            <v-col cols="3" class="text-right">
                                <v-btn icon color="white" @click="closeModal"><v-icon>mdi-close-circle</v-icon> </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-row class="mt-5">
                            <v-col cols="12" sm="6" md="6" class="pt-3">
                                <v-text-field label="Nombre del proveedor:" type="text" outlined v-model="proveedor.name"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pt-3">
                                <v-text-field label="Rif:" type="text" outlined v-model="proveedor.rif"></v-text-field>
                            </v-col>
                             <v-col cols="12" sm="6" md="6" class="pt-3">
                                <v-text-field label="Telefono:" type="text" outlined v-model="proveedor.phone"></v-text-field>
                            </v-col>
                             <v-col cols="12" sm="6" md="6" class="pt-3">
                                <v-text-field label="Dirección:" type="text" outlined v-model="proveedor.adress"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <span>Status:</span>
                                 <v-radio-group row v-model="proveedor.status">
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
                                <v-btn class="gray" v-if="this.action != 1" @click="updateProveedor">EDIT</v-btn>
                                <v-btn class="gray" @click="createProveedor" v-else>ADD</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <!-- modal delete -->
            <modal-delete
            :modal="modal_delete"
            :name_registro="registro_delete"
            @close="closeModalDelete"
            @delete="deleteProveedor"
            ></modal-delete>

            <!-- table of data -->
             <v-data-table 
                :headers="headers" 
                :items="proveedores" 
                :footer-props="{'items-per-page-options':[5,10, 15, 30, 50, -1]}"
                :options="options"
                class="elevation-6" 
                :search="search">
        
                <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>Proveedores</v-toolbar-title>
                                <v-divider  class="mx-4" inset vertical ></v-divider>
                                <v-spacer></v-spacer>
                                <v-btn class="grey" @click="modal_proveedor = true" >ADD New +</v-btn>
                            </v-toolbar>
                    </template>
                    <template v-slot:[`item.estado`] = {item}>
                        <v-chip color="success" v-if="item.status === true" label>Active</v-chip> 
                        <v-chip color="error" v-else label>Inactive</v-chip>     
                    </template>
                    <template v-slot:[`item.actions`] = {item,index}>
                           <v-tooltip bottom >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon color="gray" @click="editedItem(item,index)" v-bind="attrs" v-on="on"><v-icon>mdi-border-color</v-icon> </v-btn>
                                    </template>
                                    <span>Edit</span>
                            </v-tooltip>
                             <v-tooltip bottom >
                                    <template v-slot:activator="{ on, attrs }">
                                         <v-btn icon color="gray" v-bind="attrs" v-on="on" @click="deleteConfirm(item,index)"><v-icon>mdi-delete-forever</v-icon> </v-btn>
                                    </template>
                                    <span>Delete</span>
                            </v-tooltip>
                    </template>
            </v-data-table>
        </v-col>
   </v-row>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import ModalDelete from '../components/ModalDelete.vue'
export default {
  components: { ModalDelete },
     data(){
         return{
                options: {
                 itemsPerPage: 10
                },
            headers: [ 
                {text:'#',value: 'id',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Name",value: 'name',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Rif",value: 'rif',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Direccion",value: 'adress',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Telefono",value: 'phone',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"status",value: 'estado',align: 'center', class:'grey white--text px-0 mx-0'},
                { text: 'Actions', value: 'actions',  align: 'center', class:'grey white--text px-0 mx-0'}
            ],
            search:'',
            modal_proveedor:false,
            modal_delete:false,
            registro_delete:'',
            indice:null,
            action:1,

            proveedor:{
                id:null,
                name:'',
                rif:'',
                phone:'',
                adress:'',
                fecha_created:'',
                status:false
            }
         }
     },

     computed:{
         titleForm(){
             return this.action === 1 ? 'Create' : 'Edit'
         },

         ...mapState('proveedores',['proveedores'])
     },

     methods: {

        ...mapMutations('proveedores',['addNewProveedor','setEditProveedor','setDeleteProveedor']),

         NumerRandom(min, max) {
            return Math.floor((Math.random() * (max - min + 1)) + min);
        },

         async createProveedor(){
            this.proveedor.id = await this.NumerRandom(10,100)
            let date = new Date();
            let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
            this.proveedor.fecha_created = output
            this.addNewProveedor(this.proveedor)
            this.closeModal()
         },

         editedItem(item,index){
             this.proveedor = Object.assign({},item)
             this.action = 0
             this.indice = index
             this.modal_proveedor = true
         },

         updateProveedor(){
            this.proveedor.indice = this.indice
            this.setEditProveedor(this.proveedor)
            this.closeModal()
         },

        deleteConfirm(item,index){
            this.indice = index
            this.registro_delete = item.name
            this.modal_delete = true
         },

         deleteProveedor(){
            this.setDeleteProveedor(this.proveedor)
            this.modal_delete = false
         },

         closeModal(){
            this.action = 1
            this.proveedor.name = '', this.proveedor.rif = '' , this.proveedor.phone = '', this.proveedor.adress = '', this.proveedor.status = false
            this.indice = null
            this.modal_proveedor = false
         },

         closeModalDelete(){
            this.modal_delete = false
            this.registro_delete = ''
         }
     },
}
</script>

<style lang="scss">
    .v-application .pt-3 {
      padding-top: 4px !important;
      padding-bottom: 0px !important;
    }
</style>