<template>
    <v-container>
        <v-row class="mt-0 primary py-5">
            <v-col cols="3">
                <v-card  class="elevation-0">
                    <v-card-text>
                       <v-row>
                           <v-col cols="8" class="text-center">
                               <h3>Total Deudas</h3>
                               <h2>{{Deudas}}$</h2>
                           </v-col>
                           <v-col cols="4" class="d-flex justify-center">
                               <div class="icon-card d-flex justify-center py-4">
                                   X
                               </div>
                           </v-col>
                           <v-col cols="12" class="text-center">
                               <h5><span>3,48%</span> Since last month</h5>
                           </v-col>
                       </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="3">
                <v-card  class="elevation-0">
                    <v-card-text>
                       <v-row>
                           <v-col cols="8" class="text-center">
                               <h3>VENTAS ABONO</h3>
                               <h2>{{ventasAbonos.length}} </h2>
                           </v-col>
                           <v-col cols="4" class="d-flex justify-center">
                               <div class="icon-card d-flex justify-center py-4">
                                   X
                               </div>
                           </v-col>
                           <v-col cols="12" class="text-center">
                               <h5><span>{{porcAbonos}}%</span>de las ventas diarias</h5>
                           </v-col>
                       </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="3">
                <v-card  class="elevation-0">
                    <v-card-text>
                       <v-row>
                           <v-col cols="8" class="text-center">
                               <h3>SALES</h3>
                               <h2>{{clientes.length}} </h2>
                           </v-col>
                           <v-col cols="4" class="d-flex justify-center">
                               <div class="icon-card d-flex justify-center py-4">
                                   X
                               </div>
                           </v-col>
                           <v-col cols="12" class="text-center">
                               <h5><span>11,98%</span> Since last month</h5>
                           </v-col>
                       </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="3">
                <v-card  class="elevation-0">
                    <v-card-text>
                       <v-row>
                           <v-col cols="8" class="text-center">
                               <h3>PERFORMANCE</h3>
                               <h3><span style="color:green;">{{porcAlto}}%</span> - <span style="color:red;">{{porcBajo}}% </span></h3>
                           </v-col>
                           <v-col cols="4" class="d-flex justify-center">
                               <div class="icon-card d-flex justify-center py-4">
                                   X
                               </div>
                           </v-col>
                           <v-col cols="12" class="text-center">
                               <h5><span>8,78%</span> Since last month</h5>
                           </v-col>
                       </v-row>
                    </v-card-text>
                </v-card>
            </v-col>


        </v-row>
        <v-row class="mt-5">
            <v-col cols="8">
                   <!-- <column-chart :data="[['Sun', 32], ['Mon', 46], ['Tue', 28]]"></column-chart> -->
                   <v-card  class="elevation-8">
                    <v-card-title class="grey white--text">Ventas de Inicio de semana</v-card-title>
                    <v-card-text>
                            <line-chart :data="ChartData" class="mt-5"></line-chart>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card class="elevation-8">
                    <v-card-text>
                        <pie-chart :data="[['Franelas', 5], ['Pantalones', 5] , ['Chorts',2], ['Otros', 2]]"></pie-chart>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data(){
        return{
            ChartData:{
                '2020-11-01':5300,
                '2020-11-02':3000,
                '2020-11-03':1000,
                '2020-11-04':6000,
            },
            clientes:[
                {name:"Jose",tipoVenta:'Completa',deuda:45},
                {name:"Luis",tipoVenta:'Abono',deuda:92},
                {name:"Maria",tipoVenta:'Completa',deuda:14.50},
                {name:"Carolina",tipoVenta:'Completa',deuda:21.80},
                {name:"Manuel",tipoVenta:'Abono',deuda:45},
                {name:"Gonzalo",tipoVenta:'Abono',deuda:12},
                {name:"Carlos",tipoVenta:'Completa',deuda:32},
                {name:"Mariana",tipoVenta:'Completa',deuda:4},
                {name:"Kathe",tipoVenta:'Completa',deuda:8},
                {name:"Eva",tipoVenta:'Abono',deuda:25},
            ],
            Deudas:null,
            ventasAbonos:[],
            porcBajo:0,
            porcAlto:0,
            porcAbonos:0,
        }
    },
    mounted() {
        this.calculo()
    },
    methods: {
        calculo(){

            const acumular = (acumulador,cliente) => acumulador + cliente.deuda
            this.Deudas = this.clientes.reduce(acumular,0)
            
            this.ventasAbonos  = this.clientes.filter(({tipoVenta}) => tipoVenta === 'Abono')

            const resto = this.clientes.length-this.ventasAbonos.length
            this.porcAbonos = 100 - (resto*100/this.clientes.length).toFixed(2)



            const acum = (acumulando,cliente) => acumulando + cliente.deuda
            const totalMontoAbonados = this.clientes.filter(({tipoVenta}) => tipoVenta === 'Abono').reduce(acum,0)
            const totalMontoCompleta = this.clientes.filter(({tipoVenta}) => tipoVenta === 'Completa').reduce(acum,0)

            const restoBajo = this.Deudas-totalMontoAbonados
            this.porcBajo = 100 - (restoBajo*100/this.Deudas).toFixed(2)
            
            const restoAlto = this.Deudas-totalMontoCompleta
            this.porcAlto = 100 - (restoAlto*100/this.Deudas).toFixed(2)

         } 
        
    },
}
</script>
<style lang="scss">
    .icon-card{
        background: chocolate;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    
</style>