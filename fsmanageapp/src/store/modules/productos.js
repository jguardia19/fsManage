export default {
    namespaced:true,

    state:{
       productos:[
            {id:1,name:"Franela xj",url_img:"https://image.freepik.com/psd-gratis/maqueta-camiseta-femenina_23-292935581.jpg",category:"Franelas",proveedor:"Jennifer confeccion c.a",stock:5,precioCompra:15,precioVenta:18,oferta:false,status:true,caracteristicas:[ { "name": "talla", "valor": "L" }, { "name": " Color", "valor": "azul" }, { "name": "Material", "valor": "Algodon 100%" } ]},
            {id:2,name:"Pantalon Levis",url_img:"https://image.freepik.com/psd-gratis/mockup-camiseta-deportiva-logotipo_23-2148126781.jpg",category:"Camisas",proveedor:"Lisys shop c.a",stock:5,precioCompra:15,precioVenta:18,oferta:false,status:true,caracteristicas:[ { "name": "talla", "valor": "L" }, { "name": " Color", "valor": "azul" }, { "name": "Material", "valor": "Algodon 100%" } ]},
            {id:3,name:"Camisa",url_img:"https://image.freepik.com/psd-gratis/composicion-maqueta-camiseta-japonesa-vista-superior_23-2148976177.jpg",category:"Franelas",proveedor:"Lisys shop c.a",stock:5,precioCompra:15,precioVenta:18,oferta:false,status:true,caracteristicas:[ { "name": "talla", "valor": "L" }, { "name": " Color", "valor": "azul" }, { "name": "Material", "valor": "Algodon 100%" } ]},
            {id:4,name:"Blusa",url_img:"https://images.freejpg.com.ar/900/0605/white-sneakers-jeans-scarf-blue-minimal-apparel-F100025090.jpg",category:"Pantalones",proveedor:"Lisys shop c.a",stock:5,precioCompra:15,precioVenta:18,oferta:false,status:true,caracteristicas:[ { "name": "talla", "valor": "L" }, { "name": " Color", "valor": "azul" }, { "name": "Material", "valor": "Algodon 100%" } ]},
            {id:5,name:"Zapatos D&G",url_img:"https://image.freepik.com/psd-gratis/maqueta-ropa_23-2148081467.jpg",category:"Franelas",proveedor:"Tiendas Tinny's c.a",stock:5,precioCompra:15,precioVenta:18,oferta:false,status:true,caracteristicas:[ { "name": "talla", "valor": "L" }, { "name": " Color", "valor": "azul" }, { "name": "Material", "valor": "Algodon 100%" } ]},
            {id:6,name:"Gorra HOLLISTER",url_img:"https://image.freepik.com/psd-gratis/maqueta-camiseta-femenina_23-292935581.jpg",category:"Cinturones",proveedor:"Jennifer confeccion c.a",stock:5,precioCompra:15,precioVenta:18,oferta:false,status:true,caracteristicas:[ { "name": "talla", "valor": "L" }, { "name": " Color", "valor": "azul" }, { "name": "Material", "valor": "Algodon 100%" } ]},
            {id:7,name:"PANTALON TOMMY",url_img:"https://image.freepik.com/psd-gratis/maqueta-camiseta-femenina_23-292935581.jpg",category:"Perfumes",proveedor:"Shop millenium c.a",stock:5,precioCompra:15,precioVenta:18,oferta:false,status:true,caracteristicas:[ { "name": "talla", "valor": "L" }, { "name": " Color", "valor": "azul" }, { "name": "Material", "valor": "Algodon 100%" } ]},
            {id:8,name:"Camisa",url_img:"https://image.freepik.com/psd-gratis/maqueta-camiseta-femenina_23-292935581.jpg",category:"Pantalones",proveedor:"Shop millenium c.a",stock:5,precioCompra:15,precioVenta:18,oferta:false,status:true,caracteristicas:[ { "name": "talla", "valor": "L" }, { "name": " Color", "valor": "azul" }, { "name": "Material", "valor": "Algodon 100%" } ]}
       ]
    },

    mutations:{

        // create new producto
        addNewProducto(state,data){
            state.productos.push(
                {
                    "id":data.id,
                    "name":data.name,
                    "url_img":"https://image.freepik.com/psd-gratis/maqueta-camiseta-femenina_23-292935581.jpg",
                    "category":data.category,
                    "proveedor":data.proveedor,
                    "stock":data.stock,
                    "precioCompra":data.precioCompra,
                    "precioVenta":data.precioVenta,
                    "marca":data.marca,
                    "modelo":data.modelo,
                    "oferta":data.oferta,
                    "caracteristicas":data.caracteristicas,
                    "status":data.status,
                    "fecha_created":data.fecha_created
                }
            )
        },

        setFilterProductsCategory(state,filter){

            let busqueda = state.productos.filter( element => element.category === filter) 

            console.log(busqueda)

            state.productos = busqueda
        }

    },

    actions:{
     
    },
    getters:{

    }
}