export default {
    namespaced:true,

    state:{
        clientes:[
            {id:1,name:"Maria Alonso",cedula :"14785458",adress:"av, san francisco , caracas",phone:"424584563",fecha_created:"2021-05-18",status:true},
            {id:2,name:"Eva Hernandez",cedula:"147854856",adress:"av, san francisco , caracas",phone:"424584563",fecha_created:"2021-05-08",status:true},
            {id:3,name:"Luisa Marcano",cedula:"21458963",adress:"av, san francisco , caracas",phone:"424584563",fecha_created:'2021-05-18',status:false},
            {id:4,name:"Jose G. Guardia",cedula:"19792523",adress:"av, san francisco , caracas",phone:"424584563",fecha_created:'2021-05-18',status:false},
        ],
        searchCliente:[],
        encontrado:false,
    },

    mutations:{

        // create new cliente
        addNewCliente(state,data){
            state.clientes.push(
                {
                    "id":data.id,
                    "name":data.name,
                    "cedula":data.cedula,
                    "adress":data.adress,
                    "phone":data.phone,
                    "status":data.status,
                    "fecha_created":data.fecha_created
                }
            )
        },

        //edit cliente
        setEditCliente(state,data){
            state.clientes[data.indice].name = data.name,
            state.clientes[data.indice].cedula = data.cedula,
            state.clientes[data.indice].adress = data.adress,
            state.clientes[data.indice].phone = data.phone,
            state.clientes[data.indice].status = data.status
        },

        // delete cliente
        setDeleteCliente(state,index){
            state.clientes.splice(index, 1)
        },

        //search cliente
        setSearchCliente(state,filter){

            console.log(filter)

            let busqueda = state.clientes.filter( element => element.cedula === filter) 

            if(busqueda.length === 0){
                state.encontrado = true
            }

            state.searchCliente = busqueda
        }

    },

    actions:{
     
    },
    getters:{

    }
}