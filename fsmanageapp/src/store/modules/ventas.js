export default {
    namespaced:true,

    state:{
        ventas:[]
    },

    mutations:{

        //add ventas al store
        setAddNewVenta(state,data){
            state.ventas.push({
                "numeroVenta":data.numero,
                "cedulaComprador":data.cedulaComprador,
                "detalles":data.detalles
            })
        }


    },

    actions:{
     
    },
    getters:{

    }
}