<template>
     <v-row class="mt-8 px-5"> 
         <v-col cols="12">

             
                   <!-- modal for type users-->
            <v-dialog v-model="modal_type_user" max-width="600">
                <v-card>
                    <v-card-title class="grey white--text">
                        <v-row>
                            <v-col cols="9">
                                <h3> {{titleForm}} type user</h3>
                            </v-col>
                            <v-col cols="3" class="text-right">
                                <v-btn icon color="white" @click="closeModal"><v-icon>mdi-close-circle</v-icon> </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-row class="mt-5">
                            <v-col cols="12" sm="6" md="6" class="pt-3">
                                <v-text-field label="Name TypeUser" type="text" outlined v-model="TypeUser.name"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <span>Status:</span>
                                 <v-radio-group row v-model="TypeUser.status">
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
                                <v-btn class="gray" v-if="this.action != 1" @click="editTypeUser()">EDIT</v-btn>
                                <v-btn class="gray" @click="createTypeUser" v-else>ADD</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <!-- modal confirm delete-->
            <modal-delete
            :modal="modal_delete"
            :name_registro="registro_delete"
            @close="closeModalDelete"
            @delete="deleteTypeUser"
            ></modal-delete>
            
            
            <!-- table of data -->
             <v-data-table 
                :headers="headers" 
                :items="typeUsers" 
                :footer-props="{'items-per-page-options':[5,10, 15, 30, 50, -1]}"
                :options="options"
                class="elevation-6" 
                :search="search">
        
                <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>Type Users</v-toolbar-title>
                                <v-divider  class="mx-4" inset vertical ></v-divider>
                                <v-spacer></v-spacer>
                                <v-btn class="grey" @click="modal_type_user = true" >ADD New +</v-btn>
                            </v-toolbar>
                    </template>
                    <template v-slot:[`item.estado`] = {item} >
                        <v-chip color="success" v-if="item.status === true" label>Active</v-chip> 
                        <v-chip color="error" v-else label>Inactive</v-chip>     
                    </template>
                    <template v-slot:[`item.actions`] = {item,index} >
                           <v-tooltip bottom >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon color="gray" @click="editedItem(item,index)" v-bind="attrs" v-on="on"><v-icon>mdi-border-color</v-icon> </v-btn>
                                    </template>
                                    <span>Edit</span>
                            </v-tooltip>
                             <v-tooltip bottom >
                                    <template v-slot:activator="{ on, attrs }">
                                         <v-btn icon color="gray"  @click="deleteConfirm(item,index)"  v-bind="attrs" v-on="on" ><v-icon>mdi-delete-forever</v-icon> </v-btn>
                                    </template>
                                    <span>Delete</span>
                            </v-tooltip>
                    </template>
            </v-data-table>
         </v-col>
      
     </v-row>
</template>

<script>
import axios from 'axios'
import {mapState,mapMutations} from 'vuex'
import ModalDelete from '../../components/ModalDelete.vue'
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
                { text:"Date Created",value: 'fecha_created',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"status",value: 'estado',align: 'center', class:'grey white--text px-0 mx-0'},
                { text: 'Actions', value: 'actions',  align: 'center', class:'grey white--text px-0 mx-0'}
            ],
            search:'',

            modal_type_user:false,
            modal_delete:false,
            registro_delete:'',
            action:1,
            indice:null,

            TypeUser:{
                id:null,
                name:'',
                fecha_created:'',
                status:false
            }
         }
     },

     computed:{
         titleForm(){
             return this.action === 1 ? 'Create' : 'Edit'
         },

         ...mapState('admin',['typeUsers'])
     },

     mounted() {
         //this.getAllTypeUsers()
     },

     methods: {

        ...mapMutations('admin',['addNewTypeUser','setEditTypeUser','setDeleteTypeUser']),

        NumerRandom(min, max) {
            return Math.floor((Math.random() * (max - min + 1)) + min);
        },

         async getAllTypeUsers(){
             try{
                 const response = await axios.get('http://localhost:5000/api/typeUser')
                 this.typeUsers = response.data
             }catch(error){
                 console.error(error)
             }
         },

         async createTypeUser(){

            this.TypeUser.id = await this.NumerRandom(10,100)
            let date = new Date();
            let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
            this.TypeUser.fecha_created = output

            this.addNewTypeUser(this.TypeUser)
            this.closeModal()
            //  const fecha = await this.createDate()
            //  this.TypeUser.fecha_created = fecha
            //  try{
            //      const response = await axios.post('http://localhost:5000/api/typeUser',this.TypeUser)
            //      console.log(response.data)
            //      await this.getAllTypeUsers()
            //      this.closeModal()
            //  }catch(error){
            //      console.log(error)
            //  }
         },

         async updateTypeUser(id){
             try{
                 const response = await axios.put(`http://localhost:5000/api/typeUser/${id}`,this.TypeUser)
                 console.log(response.data)
                 await this.getAllTypeUsers()
                 this.closeModal()
             }catch(e){
                 console.log(e)
             }
         },


        //  addNewTypeUser(){
        //      let dateActual = new Date()
        //      let day = dateActual.getDay()
        //      let month = dateActual.getMonth()
        //      let year  = dateActual.getFullYear()
        //      day  = ('0' + day).slice(-2);
        //      month   = ('0' + month).slice(-2);
        //      let Fecha  = `${year}-${month}-${day}`; 

        //      this.typeUsers.push({
        //          id:this.typeUsers.length+1,
        //          Name:this.TypeUser.Name,
        //          fecha:Fecha,
        //          status:this.TypeUser.status
        //      })
        //      this.closeModal()
        //  },

         editedItem(item,index){
             this.TypeUser = Object.assign({},item)
             this.action = 0
             this.indice = index
             this.modal_type_user = true
         },

         editTypeUser(){
            this.TypeUser.indice = this.indice
            this.setEditTypeUser(this.TypeUser)
            this.closeModal()
         },

         deleteConfirm(item,index){
            this.indice = index
            this.registro_delete = item.name
            this.modal_delete = true
         },

         deleteTypeUser(){
            this.setDeleteTypeUser(this.indice)
            this.modal_delete = false
         },

         closeModal(){
             this.action = 1
            this.TypeUser.name = '', this.TypeUser.status = false
            this.indice = null
            this.modal_type_user = false
         },

         closeModalDelete(){
            this.modal_delete = false
            this.registro_delete = ''
         }
     },
}
</script>

<style>

</style>