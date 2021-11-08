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
                        <v-row class="mt-5">
                            <v-col cols="12" sm="4" md="4" >
                                <v-text-field label="Name " type="text" outlined append-icon="mdi-account" ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4" >
                                <v-text-field label="Ruc" type="text" outlined  placeholder="v-11111111"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4" >
                                <v-text-field label="Phone" type="text" outlined append-icon="mdi-phone" placeholder="+58424-000 00 00"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4" >
                                <v-text-field label="Email" type="text" outlined  append-icon="mdi-email" placeholder="name@example.com"></v-text-field>
                            </v-col>
                             <v-col cols="12" sm="4" md="4" >
                                <v-text-field label="Address" type="text" outlined ></v-text-field>
                            </v-col>
                             <v-col cols="12" sm="4" md="4" >
                                <v-text-field label="Instagram" type="text" outlined placeholder="@example"></v-text-field>
                            </v-col>
                             <v-col cols="12" sm="4" md="4" >
                                <v-autocomplete
                                 label="Type User"
                                 :items="typeUsers"
                                 item-text="Name"
                                 item-value="id"
                                 outlined
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="4" md="4" >
                                <v-autocomplete
                                 label="Categoria"
                                 :items="Categorys"
                                 item-text="Name"
                                 item-value="id"
                                 outlined
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="4" md="4" >
                                <v-autocomplete
                                 label="Estatus"
                                 :items="Status"
                                 item-text="Name"
                                 item-value="id"
                                 outlined
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" >
                                <span>Delivery:</span>
                                 <v-radio-group row >
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
                </v-card>
            </v-dialog>

                        <!-- table of data -->
             <v-data-table 
                :headers="headers" 
                :items="Users" 
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
                     <template v-slot:item.instagram="{ item }">
                         <span v-if="item.Instagram === ''">N/A</span>
                        <span v-else>{{item.Instagram}} <v-icon color="pink">mdi-instagram</v-icon> </span>  
                    </template>
                    <template v-slot:item.estado="{ item }">
                        <v-chip  :style="{background:item.ColorEstado,color:'#fff'}" label>{{item.Estado}} </v-chip>   
                    </template>
                    <template v-slot:item.actions="{  }">
                            <v-tooltip bottom >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon color="gray" v-bind="attrs" v-on="on"><v-icon>mdi-eye</v-icon> </v-btn>
                                    </template>
                                    <span>View</span>
                            </v-tooltip>
                           <v-tooltip bottom >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon color="gray" v-bind="attrs" v-on="on"><v-icon>mdi-border-color</v-icon> </v-btn>
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
export default {
    data(){
        return{
             options: {
                 itemsPerPage: 10
                },
            headers: [ 
                { text:"Name",value: 'Name',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Ruc",value: 'Ruc',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Categoria",value: 'Categoria',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Phone",value: 'Phone',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Email",value: 'Email',align: 'center', class:'grey white--text px-0 mx-0'},
                { text:"Instagram",value: 'instagram',align: 'center', class:'grey white--text px-0 mx-0'},
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
            action:1,
             typeUsers:[
                {id:1,Name:"Admin",fecha:"2021-05-18",status:true},
                {id:2,Name:"User",fecha:"2021-05-08",status:true},
                {id:3,Name:"Demo",fecha:'2021-05-18',status:false},
            ],
            Categorys:[
                {id:1,Name:"Restaurante",fecha:"2021-05-18",status:true},
                {id:2,Name:"Shop",fecha:"2021-05-08",status:true},
                {id:3,Name:"Ferreteria",fecha:'2021-05-18',status:false},
                {id:4,Name:"Servicios Multiples",fecha:'2021-05-18',status:true},
                {id:5,Name:"Farmacia",fecha:'2021-05-18',status:true},
                {id:6,Name:"Panaderia",fecha:'2021-05-18',status:true},
                {id:7,Name:"Supermarket",fecha:'2021-05-18',status:false},
            ],
             Status:[
                {id:1,Name:"New",fecha:"2021-05-18",color:'#0376A3',status:true},
                {id:2,Name:"Test",fecha:"2021-05-08",color:'#08956A',status:true},
                {id:3,Name:"Activo",fecha:'2021-05-18',color:'#0EE905',status:true},
                {id:4,Name:"Vencio",fecha:'2021-05-18',color:'#626566',status:false},
            ],
        }
    },
    computed:{
         titleForm(){
             return this.action === 1 ? 'Create' : 'Edit'
         }
     },

     methods: {
         closeModal(){
             this.action = 1
            this.modal_user = false
         }
     },
}
</script>

<style>

</style>