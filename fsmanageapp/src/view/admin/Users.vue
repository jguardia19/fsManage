<template>
    <v-row class="mt-8 px-5"> 
        <v-col cols="12">

            <!-- modal for user -->
            <v-dialog v-model="modal_user" max-width="800">
                <v-card>
                    <v-card-title class="grey white--text">
                        <v-row>
                            <v-col cols="9">
                                <h3> {{titleForm}} User</h3>
                            </v-col>
                            <v-col cols="3" class="text-right">
                                <v-btn icon color="white" @click="closeModal"><v-icon>mdi-close-circle</v-icon> </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-row class="mt-3">
                            <v-col cols="12" sm="4" md="4" >
                                <v-text-field label="Name " type="text" outlined append-icon="mdi-account"  v-model="User.name"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4" >
                                <v-text-field label="Ruc" type="text" outlined  placeholder="v-11111111" v-model="User.ruc"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4" >
                                <v-text-field label="Phone" type="text" outlined append-icon="mdi-phone" placeholder="+58424-000 00 00" v-model="User.phone"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4" >
                                <v-text-field label="Email" type="text" outlined  append-icon="mdi-email" placeholder="name@example.com" v-model="User.email"></v-text-field>
                            </v-col>
                             <v-col cols="12" sm="4" md="4" >
                                <v-text-field label="Address" type="text" outlined  v-model="User.adress"></v-text-field>
                            </v-col>
                             <v-col cols="12" sm="4" md="4" >
                                <v-text-field label="Instagram" type="text" outlined placeholder="@example" v-model="User.instagram"></v-text-field>
                            </v-col>
                             <v-col cols="12" sm="4" md="4" >
                                <v-autocomplete
                                 label="Type User"
                                 :items="typeUsers"
                                 item-text="name"
                                 item-value="name"
                                 v-model="User.typeUser"
                                 outlined
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="4" md="4" >
                                <v-autocomplete
                                 label="Categoria"
                                 :items="categorys"
                                 item-text="name"
                                 item-value="name"
                                 v-model="User.category"
                                 outlined
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="4" md="4" >
                                <v-autocomplete
                                 label="Estatus"
                                 v-model="estado"
                                 :items="Status"
                                 item-text="Name"
                                 item-value="id"
                                 return-object
                                 outlined
                                 @change="selectStatus(estado)"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" >
                                <span>Delivery:</span>
                                 <v-radio-group row  v-model="User.delivery">
                                    <v-radio
                                        color="success"
                                        label="Si"
                                        value="Si"
                                    ></v-radio>
                                    <v-radio
                                    color="error"
                                        label="No"
                                        value="No"
                                    ></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" >
                               <v-file-input
                                    label="Logotipo o imagen de marca"
                                    outlined
                                    dense
                                ></v-file-input>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-col class="text-right">
                            <v-btn class="gray" v-if="this.action != 1" @click="updateUser" >EDIT</v-btn>
                            <v-btn class="gray" @click="createNewUser" v-else>ADD</v-btn>
                        </v-col>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- //modal confirm delete -->
            <modal-delete
            :modal="modal_delete"
            :name_registro="registro_delete"
            @close="closeModalDelete"
            @delete="deleteUser"
            ></modal-delete>

            <!-- table of data -->
             <v-data-table 
                :headers="headers" 
                :items="users" 
                :footer-props="{'items-per-page-options':[5,10, 15, 30, 50, -1]}"
                :options="options"
                class="elevation-6" 
                :search="search">
        
                <template v-slot:top>
                        <v-toolbar flat>
                            <v-toolbar-title>Users</v-toolbar-title>
                                <v-divider  class="mx-4" inset vertical ></v-divider>
                                <v-spacer></v-spacer>
                                <v-btn class="grey" @click="modal_user = true" >ADD New +</v-btn>
                            </v-toolbar>
                    </template>
                     <template v-slot:[`item.Insta`] = {item}>
                         <span v-if="item.instagram === ''">N/A</span>
                        <span v-else>{{item.instagram}} <v-icon color="pink">mdi-instagram</v-icon> </span>  
                    </template>
                     <template v-slot:[`item.estado`] = {item}>
                        <v-chip  :style="{background:item.colorStatus,color:'#fff'}" label>{{item.status}} </v-chip>   
                    </template>
                    <template v-slot:[`item.actions`] = {item,index}>
                            <v-tooltip bottom >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon color="gray" v-bind="attrs" v-on="on"><v-icon>mdi-eye</v-icon> </v-btn>
                                    </template>
                                    <span>View</span>
                            </v-tooltip>
                           <v-tooltip bottom >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon color="gray" v-bind="attrs" v-on="on"   @click="editedItem(item,index)"><v-icon>mdi-border-color</v-icon> </v-btn>
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
                { text:"Name",value: 'name',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Ruc",value: 'ruc',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Categoria",value: 'category',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Phone",value: 'phone',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Email",value: 'email',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Instagram",value: 'Insta',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"status",value: 'estado',align: 'center', class:'grey white--text px-0 mx-0'},
                { text: 'Actions', value: 'actions',  align: 'center', class:'grey white--text px-0 mx-0'}
            ],
            Users:[
                {Name:'Aiin Boutique', Ruc:'14785412',Categoria:'Shop',Phone:'424875956',Email:'ainboutique@gmail.com',Instagram:'@ainboutique',Estado:'Test',ColorEstado:'#08956A'},
                {Name:'Q Cachapa Rest.', Ruc:'147845229',Categoria:'Restaurante',Phone:'+5847458569',Email:'qcachapa@gmail.com',Instagram:'@quecachapasRestaurant',Estado:'Test',ColorEstado:'#08956A'},
                {Name:'Farmacia los Reyes', Ruc:'5874596',Categoria:'Farmacia',Phone:'+584127458596',Email:'farmalosreyes@gmail.com',Instagram:'',Estado:'New',ColorEstado:'#0376A3'},
                {Name:'Multitodo c.a', Ruc:'6585996',Categoria:'Ferreteria',Phone:'584268596589',Email:'multitodo@gmail.com',Instagram:'',Estado:'New',ColorEstado:'#0376A3'},
                {Name:'Panaderia la Orquidea', Ruc:'821665654',Categoria:'Panaderia',Phone:'246857465',Email:'laorquidea@gmail.com',Instagram:'@panLaOrquidea',Estado:'Activo',ColorEstado:'#0EE905'},
            ],
            search:'',
            modal_user:false,
            modal_delete:false,
            registro_delete:'',
            action:1,
             Status:[
                {id:1,Name:"New",fecha:"2021-05-18",color:'#0376A3',status:true},
                {id:2,Name:"Test",fecha:"2021-05-08",color:'#08956A',status:true},
                {id:3,Name:"Activo",fecha:'2021-05-18',color:'#0EE905',status:true},
                {id:4,Name:"Vencio",fecha:'2021-05-18',color:'#626566',status:false},
            ],
            estado:{},
            indice:null,
            User:{
                id:null,
                name:'',
                ruc:'',
                category:'',
                typeUser:'',
                adress:'',
                phone:'',
                email:'',
                instagram:'',
                status:'',
                colorStatus:'',
                delivery:false,
                fecha_created:''
            }
        }
    },
    computed:{
         titleForm(){
             return this.action === 1 ? 'Create' : 'Edit'
         },

         ...mapState('admin',['users','typeUsers','categorys'])
     },

     methods: {

        ...mapMutations('admin',['addNewUser','setEditUser','setDeleteUser']),

        NumerRandom(min, max) {
            return Math.floor((Math.random() * (max - min + 1)) + min);
        },


        selectStatus(estado){
            this.User.status = estado.Name
            this.User.colorStatus = estado.color
        },

        async createNewUser(){
            this.User.id = await this.NumerRandom(10,100)
            let date = new Date();
            let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
            this.User.fecha_created = output

            this.addNewUser(this.User)
            this.closeModal()
        },

        editedItem(item,index){
             this.User = Object.assign({},item)
             this.action = 0
             this.indice = index
             this.estado = item.status
             this.modal_user= true
         },

         updateUser(){
            this.User.indice = this.indice
            this.setEditUser(this.User)
            this.closeModal()
         },

         
         deleteConfirm(item,index){
            this.indice = index
            this.registro_delete = item.name
            this.modal_delete = true
         },

          deleteUser(){
            this.setDeleteUser(this.indice)
            this.modal_delete = false
         },

         closeModal(){
             this.action = 1
             this.User.id = null
             this.User.name = ''
             this.User.ruc  = ''
             this.User.category = '' 
             this.User.typeUser = '' 
             this.User.adress = ''
             this.User.phone  = '' 
             this.User.email  = ''
             this.User.instagram = '' 
             this.User.status = '' 
             this.User.colorStatus = '' 
             this.User.delivery = false
             this.modal_user = false
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