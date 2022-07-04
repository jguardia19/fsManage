<template>
  <v-container>
    
    <v-snackbar
      :timeout="-1"
      :value="snackbar"
      centered
      color="deep-purple accent-4"
      elevation="24"
    >
    <v-col cols="12" class="d-flex justify-space-between">
        <p>snackbar with <strong>elevation: 24</strong> property.</p>
         <v-btn icon color="white" v-bind="attrs" @click="snackbar = false"  class="btn-icon-close"><v-icon>mdi-close-circle</v-icon> </v-btn>
    </v-col>
    </v-snackbar>

    <v-card elevation="2" class="mt-2">
      <v-card-title class="grey white--text">
        <v-row>
          <v-col cols="12">
            <h4>Crear Producto Nuevo</h4>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row class="mt-5">
          <v-col cols="12" sm="7" md="7">
            <v-row class="celda">
              <v-col cols="6" class="mb-0 celda">
                <v-text-field
                  label="Nombre:"
                  type="text"
                  outlined
                  v-model="producto.name"
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="celda">
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
              <v-col cols="6">
                <v-text-field
                  label="Marca:"
                  type="text"
                  outlined
                  v-model="producto.marca"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Modelo:"
                  type="text"
                  outlined
                  v-model="producto.modelo"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="celda">
              <v-col cols="6">
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
              <v-col cols="6">
                <v-text-field
                  label="Stock:"
                  type="number"
                  outlined
                  v-model="producto.stock"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="celda">
              <v-col cols="6">
                <v-text-field
                  label="Precio compra:"
                  type="number"
                  outlined
                  v-model="producto.precioCompra"
                  @keyup="calcularPrecioVenta($event)"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Precio venta (30%):"
                  type="number"
                  outlined
                  v-model="producto.precioVenta"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        <v-col cols="12" sm="5" md="5" class="text-center">
            <v-row>
              <v-col cols="6" class="mx-auto">
                <v-img
                  :src="img_temp"
                  max-height="300"
                  max-width="250"
                  v-if="img_temp != ''"
                ></v-img>
              </v-col>
            </v-row>
            <span>Selecciona una imagen para el producto:</span>
            <input
              type="file"
              accept="image/*,.png,.jpg"
              class="input-file"
              @change="onFileChange($event)"
              ref="myFileImagen"
            />
            <span>Status:</span>
            <v-radio-group row v-model="producto.status">
              <v-radio color="success" label="Active" :value="true"></v-radio>
              <v-radio color="error" label="Inactive" :value="false"></v-radio>
            </v-radio-group>
            <v-textarea label="Descripcion del producto" outlined v-model="producto.descripcion"></v-textarea>
          </v-col>
        </v-row>
        <v-row>
              <v-col cols="12">
                <v-alert type="info" outlined>
                    <p>Agrega caracteristicas extras a tu producto, agregando tipo de caracteristica y su valor, ejemplo : color = Azul</p>
                </v-alert>
                <v-row>
                  <v-col cols="5">
                    <v-text-field
                      label="Caracteristica:"
                      class="mt-3"
                      type="text"
                      outlined
                      v-model="caracteristica"
                      @keypress.enter="addCaracteristicas()" 
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="pt-8">
                    <v-btn class="primary"  @click="addCaracteristicas()">
                      Agregar</v-btn
                    >
                  </v-col>
                  <v-col cols="12" sm="4" md="4" v-for="(item, index) of producto.caracteristicas"
                      :key="index"
                      class="celda d-flex mt-2">
                        <v-text-field
                          :label="item.name"
                          type="text"
                          outlined
                          v-model="producto.caracteristicas[index].valor"
                        ></v-text-field>
                        <v-btn
                          icon
                          color="error"
                          @click="removeCaracteristica(index)"
                          ><v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                      </v-col>
                </v-row>
              </v-col>
            </v-row>
      </v-card-text>
      <v-card-actions>
          <v-col cols="12" class="text-right">
            <v-btn class="gray" v-if="this.action != 1">EDIT</v-btn>
            <v-btn class="gray" @click="createProducto" v-else>ADD</v-btn>
          </v-col>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return{
            action:1,
            img_temp:'',
            fileImg:{},
            snackbar:false,
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
                descripcion:'',
                status:false
            },
             defaultProducto:{
                name:'',
                category:'',
                proveedor:'',
                stock:0,
                precioCompra:0,
                precioVenta:0,
                fecha_created:'',
                url_img:'',
                caracteristicas:[],
                descripcion:'',
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

    methods:{

        ...mapMutations('productos',['addNewProducto']),

        NumerRandom(min, max) {
            return Math.floor((Math.random() * (max - min + 1)) + min);
        },

        calcularPrecioVenta(e){
            let monto = e.target.value
            let precioProducto = parseInt(monto)
            this.producto.precioVenta = precioProducto + (precioProducto*30/100)
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

        async createProducto(){
            this.producto.id = await this.NumerRandom(10,100)
            let date = new Date();
            let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
            this.producto.fecha_created = output
            this.addNewProducto(this.producto)
             this.producto = Object.assign({},this.defaultProducto)

         },



         addCaracteristicas(){
             this.producto.caracteristicas.push({name:this.caracteristica,valor:''})
             this.caracteristica = ''
         },

         removeCaracteristica(index){
             this.producto.caracteristicas.splice(index,1)
         }
    }
};
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

    .btn-icon-close{
        position: absolute;
        top: 1px;
        right: 1px;
    }
</style>