
export default {

    namespaced:true,


    state:{
        typeUsers:[],
        categorys:[],
        users:[]
    },

    mutations:{

        // create new type of user
        addNewTypeUser(state,data){
            state.typeUsers.push(
                {
                    "id":data.id,
                    "name":data.name,
                    "status":data.status,
                    "fecha_created":data.fecha_created
                }
            )
        },

        // edit type of  user
        setEditTypeUser(state,data){
            state.typeUsers[data.indice].name = data.name
            state.typeUsers[data.indice].status = data.status
        },

        //delete type of user
        setDeleteTypeUser(state,i){
            state.typeUsers.splice(i, 1);
        },

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

        // edit category
        setEditCategory(state,data){
            state.categorys[data.indice].name = data.name
            state.categorys[data.indice].status = data.status
        },

        //delete category
        setDeleteCategory(state,i){
            state.categorys.splice(i, 1);
        },

        // create new user
        addNewUser(state,data){
            state.users.push(
                {
                    "id":data.id,
                    "name":data.name,
                    "ruc":data.ruc,
                    "category":data.category,
                    "typeUser":data.typeUser,
                    "adress":data.adress,
                    "phone":data.phone,
                    "email":data.email,
                    "instagram":data.instagram,
                    "status":data.status,
                    "colorStatus":data.colorStatus,
                    "delivery":data.delivery,
                    "fecha_created":data.fecha_created 
                }
            )
        },

        setEditUser(state,data){
            state.users[data.indice].name = data.name,
            state.users[data.indice].ruc = data.ruc,
            state.users[data.indice].category = data.category,
            state.users[data.indice].typeUser = data.typeUser,
            state.users[data.indice].adress = data.adress,
            state.users[data.indice].phone = data.phone,
            state.users[data.indice].email = data.email,
            state.users[data.indice].instagram = data.instagram,
            state.users[data.indice].status = data.status,
            state.users[data.indice].colorStatus = data.colorStatus,
            state.users[data.indice].delivery = data.delivery
        },

        setDeleteUser(state,index){
            state.users.splice(index,1)
        }



    },

    actions:{
     
    },
    getters:{

    }
}