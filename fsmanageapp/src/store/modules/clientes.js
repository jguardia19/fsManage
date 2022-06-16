export default {
    namespaced:true,

    state:{
        clientes:[
            {id:1,name:"Maria Alonso",cedula :"14785458",adress:"av, san francisco , caracas",phone:"424584563",fecha_created:"2021-05-18",status:true},
            {id:2,name:"Eva Hernandez",cedula:"147854856",adress:"av, san francisco , caracas",phone:"424584563",fecha_created:"2021-05-08",status:true},
            {id:3,name:"Luisa Marcano",cedula:"21458963",adress:"av, san francisco , caracas",phone:"424584563",fecha_created:'2021-05-18',status:false},
        ],
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


    },

    actions:{
     
    },
    getters:{

    }
}