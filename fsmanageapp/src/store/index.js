import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//modules
import admin from './modules/admin'
import categorys from './modules/categorys'
import proveedores from './modules/proveedores'
import clientes from './modules/clientes'
import productos from './modules/productos'
import ventas from './modules/ventas'

export default new Vuex.Store({

    modules:{
        admin,
        categorys,
        proveedores,
        clientes,
        productos,
        ventas
    },

    state:{

        Clientes:[
            {id:1,Name:"Maria Alonso",cedula :"14785458",direccion:"av, san francisco , caracas",phone:"424584563",fecha:"2021-05-18",status:true},
            {id:2,Name:"Eva Hernandez",cedula:"147854856",direccion:"av, san francisco , caracas",phone:"424584563",fecha:"2021-05-08",status:true},
            {id:3,Name:"Luisa Marcano",cedula:"21458963",direccion:"av, san francisco , caracas",phone:"424584563",fecha:'2021-05-18',status:false},
            {id:4,Name:"Fernando Aular",cedula:"19792523",direccion:"av, san francisco , caracas",phone:"424584563",fecha:'2021-05-18',status:true},
            {id:5,Name:"Carlos Martinez",cedula:"11119227",direccion:"av, san francisco , caracas",phone:"424584563",fecha:'2021-05-18',status:true}
        ],

    },

    mutations:{

    },

    actions:{

    }

});