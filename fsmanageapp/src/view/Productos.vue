<template>
   <v-row class="mt-8 px-5"> 
        <v-col cols="12">
                    <!-- modal for productos -->
            <v-dialog v-model="modal_producto" max-width="80%">
                <v-card>
                    <v-card-title class="grey white--text">
                        <v-row>
                            <v-col cols="9">
                                <h3> {{titleForm}} Producto</h3>
                            </v-col>
                            <v-col cols="3" class="text-right">
                                <v-btn icon color="white" @click="closeModal"><v-icon>mdi-close-circle</v-icon> </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-row class="mt-5">
                            <v-col cols="12" sm="7" md="7"> 
                                <v-row class="celda">
                                    <v-col cols="6" class="mb-0 celda" >
                                        <v-text-field label="Nombre:" type="text" outlined v-model="producto.name"></v-text-field>
                                    </v-col>
                                    <v-col cols="6" class="celda" >
                                         <v-autocomplete 
                                            label="Categoria"
                                            outlined
                                            :items="categorys"
                                            item-text="name"
                                            item-value="name"
                                            v-model="producto.category"
                                        ></v-autocomplete>
                                    </v-col>
                                </v-row>
                                 <v-row class="celda">
                                    <v-col cols="6" >
                                           <v-text-field label="Marca:" type="text" outlined v-model="producto.marca" ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                           <v-text-field label="Modelo:" type="text" outlined v-model="producto.modelo" ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row class="celda">
                                    <v-col cols="6" >
                                        <v-autocomplete 
                                            label="Proveedor"
                                            outlined
                                            :items="proveedores"
                                            item-text="name"
                                            item-value="name"
                                            v-model="producto.proveedor"
                                            @change="verificarProveedor(producto.Proveedor)"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="6" >
                                        <v-text-field label="Stock:" type="number" outlined v-model="producto.stock"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row class="celda">
                                    <v-col cols="6" >
                                        <v-text-field label="Precio compra:" type="number" outlined v-model="producto.precioCompra" @keyup="calcularPrecioVenta($event)"></v-text-field>
                                    </v-col>
                                    <v-col cols="6" >
                                        <v-text-field label="Precio venta (30%):" type="number" outlined v-model="producto.precioVenta"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row class="celda">
                                      <v-col cols="12">
                                        <v-row>
                                            <v-col cols="8" > 
                                                <span>Agregar Caracteristicas:</span>  
                                                <v-text-field label="Nombre Caracteristica:" class="mt-3" type="text" outlined v-model="caracteristica"></v-text-field>        
                                            </v-col>
                                            <v-col cols="4" class="pt-12" > 
                                            <v-btn class="primary" @click="addCaracteristicas()"> Agregar</v-btn>           
                                            </v-col>
                                            <v-col cols="12" >
                                                <v-row v-for="(item,index) of producto.caracteristicas" :key="index" class="celda">
                                                    <v-col cols="4" class="text-center mt-2">
                                                        <v-chip color="primary">{{item.name}}</v-chip>
                                                    </v-col>
                                                    <v-col cols="4">
                                                        <v-text-field label="Valor"  type="text" outlined v-model="producto.caracteristicas[index].valor "></v-text-field> 
                                                    </v-col>
                                                    <v-col cols="3">
                                                        <v-btn icon color="error" @click="removeCaracteristica(index)"><v-icon>mdi-close-circle</v-icon> </v-btn>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" sm="5" md="5" class="text-center"> 
                                      <v-row>
                                          <v-col cols="6" class="mx-auto">
                                                 <v-img :src="img_temp" max-height="300" max-width="250" v-if="img_temp!= ''"></v-img>
                                          </v-col>
                                      </v-row>
                                        <span>Selecciona una imagen para el producto:</span> 
                                        <input type="file" accept="image/*,.png,.jpg" class="input-file" @change="onFileChange($event)"  ref="myFileImagen" />
                                        <span >Status:</span>
                                        <v-radio-group row v-model="producto.status">
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
                                        <v-textarea label="Descripcion del producto" outlined></v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="text-right">
                                <v-btn class="gray" v-if="this.action != 1">EDIT</v-btn>
                                <v-btn class="gray" @click="addNewProveedor" v-else>ADD</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-dialog>

              <v-dialog v-model="modal_proveedor" max-width="600">
                <v-card>
                    <v-card-title class="grey white--text">
                        <v-row>
                            <v-col cols="9">
                                <h3> Crear Proveedor</h3>
                            </v-col>
                            <v-col cols="3" class="text-right">
                                <v-btn icon color="white" @click="modal_proveedor = false"><v-icon>mdi-close-circle</v-icon> </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-row class="mt-5">
                            <v-col cols="12" sm="6" md="6" class="pt-3">
                                <v-text-field label="Nombre del proveedor:" type="text" outlined ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6" class="pt-3">
                                <v-text-field label="Rif:" type="text" outlined ></v-text-field>
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

        
            <!-- table of data -->
             <v-data-table 
                :headers="headers" 
                :items="productos" 
                :footer-props="{'items-per-page-options':[5,10, 15, 30, 50, -1]}"
                :options="options"
                class="elevation-6" 
                :search="search">
        
                <template v-slot:top>
                        <v-toolbar flat class="py-5 mb-5">
                            <v-toolbar-title>Productos</v-toolbar-title>
                                <v-divider  class="mx-4" inset vertical ></v-divider>
                                <v-spacer></v-spacer>
                                <v-row class="mt-2">
                                     <v-col>
                                        <v-text-field  label="Buscar" outlined v-model="search" append-icon="mdi-search"></v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-autocomplete 
                                        label="Categoria"
                                        outlined
                                        :items="categorys"
                                        item-text="name"
                                        item-value="name"
                                        v-model="category"
                                        @change="filtrarCategoria(category)"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col>
                                        <v-autocomplete 
                                        label="Proveedores"
                                        outlined
                                        :items="proveedores"
                                        item-text="name"
                                        item-value="name"
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col class="text-right pt-5">
                                          <v-btn class="grey" @click="$router.push('/producto/create')" >ADD New +</v-btn> 
                                          <!-- <v-btn class="grey" @click="modal_producto = true" >ADD New +</v-btn> -->
                                    </v-col>
                                </v-row>
                                
                            </v-toolbar>
                    </template>
                     <template v-slot:[`item.img`] = {item} class="text-center">
                         <div style="width:100%" class="text-center">
                            <v-img :src="item.url_img" max-height="50" max-width="50" class="mt-1 mb-1"></v-img>
                         </div>
                    </template>
                     <template v-slot:[`item.pcosto`] = {item} class="text-center">
                        <span class="info--text">{{item.precioCompra}}$</span>
                    </template>
                      <template v-slot:[`item.pventa`] = {item} class="text-center">
                        <span class="success--text">{{item.precioVenta}}$</span>
                    </template>
                    <template v-slot:[`item.estado`] = {item}>
                        <v-chip color="success" v-if="item.status === true" label>Active</v-chip> 
                        <v-chip color="error" v-else label>Inactive</v-chip>     
                    </template>
                    <template v-slot:[`item.actions`] = {item}>
                           <v-tooltip bottom class="mx-0 px-0">
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
import {mapMutations, mapState} from 'vuex'
export default {
     data(){
         return{
                options: {
                 itemsPerPage: 10
                },
            headers: [ 
                { text:"Name",value: 'name',align:'center', class:'grey white--text px-0 mx-0'},
                { text:"Image",value: 'img',align:'center', class:'grey white--text text-center px-0 mx-0'},
                { text:"stock",value: 'stock',align:'center', class:'grey white--text px-0 mx-0'},
                { text:"Categoria",value: 'category',align:'center', class:'grey white--text px-0 mx-0'},
                { text:"Proveedor",value: 'proveedor',align:'center', class:'grey white--text px-0 mx-0'},
                { text:"P. Costo",value: 'pcosto',align:'center', class:'grey white--text px-0 mx-0'},
                { text:"P. Venta",value: 'pventa',align:'center', class:'grey white--text px-0 mx-0'},
                { text:"Oferta",value: 'oferta',align:'center', class:'grey white--text px-0 mx-0'},
                { text:"status",value: 'estado',align:'center', class:'grey white--text px-0 mx-0'},
                { text: 'Actions', value: 'actions', align:'center', class:'grey white--text px-0 mx-0'}
            ],
            search:'',


            modal_producto:false,
            modal_proveedor:false,
            category:'',
            action:1,
            img_temp:'',
            fileImg:{},

            caracteristica:'',

            producto:{
                name:'',
                category:'',
                proveedor:'',
                stock:0,
                precioCompra:0,
                precioVenta:0,
                fecha_created:'',
                url_img:'',
                caracteristicas:[],
                status:false
            }

         }
     },

     computed:{
         titleForm(){
             return this.action === 1 ? 'Create' : 'Edit'
         },

         ...mapState('productos',['productos']),
         ...mapState('categorys',['categorys']),
         ...mapState('proveedores',['proveedores']),
     },
     

     methods: {
        ...mapMutations('productos',['setFilterProductsCategory']),
         calcularPrecioVenta(e){
            let monto = e.target.value
            let precioProducto = parseInt(monto)
            this.producto.precioVenta = precioProducto + (precioProducto*30/100)
         },

         filtrarCategoria(categoria){
            this.setFilterProductsCategory(categoria)
         },

        onFileChange(e) {
            console.log('ejecutando')
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.fileImg = files[0];
            console.log(this.fileImg);
            this.createImage(files[0]);
        },
      createImage(file) {
            var reader = new FileReader();
            reader.onload = e => {
            this.img_temp = e.target.result;
            };
             reader.readAsDataURL(file);
      },

         addNewProveedor(){
             let dateActual = new Date()
             let day = dateActual.getDay()
             let month = dateActual.getMonth()
             let year  = dateActual.getFullYear()
             day  = ('0' + day).slice(-2);
             month   = ('0' + month).slice(-2);
             let Fecha  = `${year}-${month}-${day}`; 

             this.Proveedores.push({
                 id:this.Cproveedor.length+1,
                 Name:this.proveedor.Name,
                 fecha:Fecha,
                 status:this.proveedor.status
             })
             this.closeModal()
         },

         verificarProveedor(proveedor){
             this.modal_proveedor =  proveedor === 'Otro' ? true : false
         },

         editedItem(item){
             this.img_temp = item.url
             this.producto = Object.assign({},item)
             this.action = 0
             this.modal_producto = true
         },

         closeModal(){
             this.action = 1
             this.$refs.myFileImagen.value = null;
            this.producto.Name = '', this.producto.status = false,this.producto.stock = 0, this.producto.Category = '',
            this.producto.Proveedor = '', this.producto.precioCompra = 0, this.producto.precioVenta = 0, this.img_temp = '',this.producto.caracteristicas = [],
            this.caracteristica = ''
            this.modal_producto = false
         },

         addCaracteristicas(){
             this.producto.caracteristicas.push({name:this.caracteristica,valor:''})
             this.caracteristica = ''
         },

         removeCaracteristica(index){
             this.producto.caracteristicas.splice(index,1)
         }
     },
}
</script>

<style lang="scss">
    .new-tooltip{
        background: none !important;
    }

    .input-file{
        width: 100%;
        height: 49px;
        padding-top: 11px;
        padding-left: 8px;
        border: 1px solid #8d8c8c;
        border-radius: 5px;
        box-shadow: 2px 3px 8px 4px #d3d3d3;
        margin-top: 22px;
        margin-bottom: 10px;
    }
    .celda{
        margin-bottom: -48px !important;
    }
</style>