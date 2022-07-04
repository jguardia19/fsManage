export default {
    namespaced:true,

    state:{
        proveedores:[
            {id:1,name:"Tiendas charo c.a",rif:"j-54785123",adress:"calle boyaca, caracas",phone:"4245871523",status:true,fecha_created:"20-05-2022"},
            {id:2,name:"store marifer s.a",rif:"j-45874123",adress:"av. bolivar , maracay",phone:"4125874156",status:true,fecha_created:"15-08-2022"},
            {id:3,name:"jennmifer store",rif:"j-745869665",adress:"av. caracas con suarez",phone:"416854744115",status:false,fecha_created:"15-02-2021"},
        ],
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