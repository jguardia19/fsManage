
export default {

    namespaced:true,


    state:{
        categorys:[
                {id:1,name:"Franelas",fecha_created:"2021-05-18",status:true},
                {id:2,name:"Camisas",fecha_created:"2021-05-08",status:true},
                {id:3,name:"Pantalones",fecha_created:'2021-05-18',status:false},
                {id:4,name:"Perfumes",fecha_created:'2021-05-18',status:true},
                {id:5,name:"Cinturones",fecha_created:'2021-05-18',status:true},
                {id:6,name:"Zapatos",fecha_created:'2021-05-18',status:true}

        ],
    },

    mutations:{

        // create new category
        addNewCategory(state,data){
            state.categorys.push(
                {
                    "id":data.id,
                    "name":data.name,
                    "status":data.status,
                    "fecha_created":data.fecha_created
                }
            )
        },

        setEditCategory(state,data){
             state.categorys[data.indice].name = data.name
             state.categorys[data.indice].status = data.status
        },

        setDeleteCategory(state,index){
            state.categorys.splice(index, 1)
        }



    },

    actions:{
     
    },
    getters:{

    }
}