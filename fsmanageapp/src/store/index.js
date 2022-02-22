import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    state:{
        Categorys:[
            {id:1,Name:"Franelas",fecha:"2021-05-18",status:true},
            {id:2,Name:"Camisas",fecha:"2021-05-08",status:true},
            {id:3,Name:"Pantalones",fecha:'2021-05-18',status:false},
            {id:4,Name:"Perfumes",fecha:'2021-05-18',status:true},
            {id:5,Name:"Cinturones",fecha:'2021-05-18',status:true}
        ],
        Proveedores:[
            {id:1,Name:"Shop millenium c.a",rif:"11111111",direccion:"av, san francisco , caracas",phone:"424584563",fecha:"2021-05-18",status:true},
            {id:2,Name:"Jennifer confeccion c.a",rif:"11111111",direccion:"av, san francisco , caracas",phone:"424584563",fecha:"2021-05-08",status:true},
            {id:3,Name:"Tiendas Tinny's c.a",rif:"11111111",direccion:"av, san francisco , caracas",phone:"424584563",fecha:'2021-05-18',status:false},
            {id:4,Name:"Lisys shop c.a",rif:"11111111",direccion:"av, san francisco , caracas",phone:"424584563",fecha:'2021-05-18',status:true},
            {id:5,Name:"Otro",rif:"11111111",direccion:"av, san francisco , caracas",phone:"424584563",fecha:'2021-05-18',status:true}
        ],
        Clientes:[
            {id:1,Name:"Maria Alonso",cedula :"14785458",direccion:"av, san francisco , caracas",phone:"424584563",fecha:"2021-05-18",status:true},
            {id:2,Name:"Eva Hernandez",cedula:"147854856",direccion:"av, san francisco , caracas",phone:"424584563",fecha:"2021-05-08",status:true},
            {id:3,Name:"Luisa Marcano",cedula:"21458963",direccion:"av, san francisco , caracas",phone:"424584563",fecha:'2021-05-18',status:false},
            {id:4,Name:"Fernando Aular",cedula:"19792523",direccion:"av, san francisco , caracas",phone:"424584563",fecha:'2021-05-18',status:true},
            {id:5,Name:"Carlos Martinez",cedula:"11119227",direccion:"av, san francisco , caracas",phone:"424584563",fecha:'2021-05-18',status:true}
        ],
        Productos:[
            {id:1,Name:"Franela xj",url:"https://image.freepik.com/psd-gratis/maqueta-camiseta-femenina_23-292935581.jpg",Category:"Franelas",Proveedor:"Jennifer confeccion c.a",stock:5,precioCompra:15,precioVenta:18,oferta:false,status:true,caracteristicas:[ { "name": "talla", "valor": "L" }, { "name": " Color", "valor": "azul" }, { "name": "Material", "valor": "Algodon 100%" } ]},
            {id:2,Name:"Pantalon Levis",url:"https://image.freepik.com/psd-gratis/mockup-camiseta-deportiva-logotipo_23-2148126781.jpg",Category:"Camisas",Proveedor:"Lisys shop c.a",stock:5,precioCompra:15,precioVenta:18,oferta:false,status:true,caracteristicas:[ { "name": "talla", "valor": "L" }, { "name": " Color", "valor": "azul" }, { "name": "Material", "valor": "Algodon 100%" } ]},
            {id:3,Name:"Camisa",url:"https://image.freepik.com/psd-gratis/composicion-maqueta-camiseta-japonesa-vista-superior_23-2148976177.jpg",Category:"Franelas",Proveedor:"Lisys shop c.a",stock:5,precioCompra:15,precioVenta:18,oferta:false,status:true,caracteristicas:[ { "name": "talla", "valor": "L" }, { "name": " Color", "valor": "azul" }, { "name": "Material", "valor": "Algodon 100%" } ]},
            {id:4,Name:"Blusa",url:"https://images.freejpg.com.ar/900/0605/white-sneakers-jeans-scarf-blue-minimal-apparel-F100025090.jpg",Category:"Pantalones",Proveedor:"Lisys shop c.a",stock:5,precioCompra:15,precioVenta:18,oferta:false,status:true,caracteristicas:[ { "name": "talla", "valor": "L" }, { "name": " Color", "valor": "azul" }, { "name": "Material", "valor": "Algodon 100%" } ]},
            {id:5,Name:"Zapatos D&G",url:"https://image.freepik.com/psd-gratis/maqueta-ropa_23-2148081467.jpg",Category:"Franelas",Proveedor:"Tiendas Tinny's c.a",stock:5,precioCompra:15,precioVenta:18,oferta:false,status:true,caracteristicas:[ { "name": "talla", "valor": "L" }, { "name": " Color", "valor": "azul" }, { "name": "Material", "valor": "Algodon 100%" } ]},
            {id:6,Name:"Gorra HOLLISTER",url:"https://image.freepik.com/psd-gratis/maqueta-camiseta-femenina_23-292935581.jpg",Category:"Cinturones",Proveedor:"Jennifer confeccion c.a",stock:5,precioCompra:15,precioVenta:18,oferta:false,status:true,caracteristicas:[ { "name": "talla", "valor": "L" }, { "name": " Color", "valor": "azul" }, { "name": "Material", "valor": "Algodon 100%" } ]},
            {id:7,Name:"PANTALON TOMMY",url:"https://image.freepik.com/psd-gratis/maqueta-camiseta-femenina_23-292935581.jpg",Category:"Perfumes",Proveedor:"Shop millenium c.a",stock:5,precioCompra:15,precioVenta:18,oferta:false,status:true,caracteristicas:[ { "name": "talla", "valor": "L" }, { "name": " Color", "valor": "azul" }, { "name": "Material", "valor": "Algodon 100%" } ]},
            {id:8,Name:"Camisa",url:"https://image.freepik.com/psd-gratis/maqueta-camiseta-femenina_23-292935581.jpg",Category:"Pantalones",Proveedor:"Shop millenium c.a",stock:5,precioCompra:15,precioVenta:18,oferta:false,status:true,caracteristicas:[ { "name": "talla", "valor": "L" }, { "name": " Color", "valor": "azul" }, { "name": "Material", "valor": "Algodon 100%" } ]}
        ]

    },

    mutations:{

    },

    actions:{

    }

});