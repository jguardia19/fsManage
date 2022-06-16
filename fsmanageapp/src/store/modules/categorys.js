
export default {

    namespaced:true,


    state:{
        categorys:[],
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