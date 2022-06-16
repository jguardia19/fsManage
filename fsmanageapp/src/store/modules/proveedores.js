export default {
    namespaced:true,

    state:{
        proveedores:[],
    },

    mutations:{

        // create new proveedor
        addNewProveedor(state,data){
            state.proveedores.push(
                {
                    "id":data.id,
                    "name":data.name,
                    "rif":data.rif,
                    "adress":data.adress,
                    "phone":data.phone,
                    "status":data.status,
                    "fecha_created":data.fecha_created
                }
            )
        },

        // edit proveedor
        setEditProveedor(state,data){
            state.proveedores[data.indice].name = data.name,
            state.proveedores[data.indice].rif = data.rif,
            state.proveedores[data.indice].adress = data.adress,
            state.proveedores[data.indice].phone = data.phone,
            state.proveedores[data.indice].status = data.status
        },

        //delete proveedor
        setDeleteProveedor(state,index){
            state.proveedores.splice(index, 1)
        }

    },

    actions:{
     
    },
    getters:{

    }
}