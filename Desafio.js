const fs = require('fs');

class Contenedor {

    LaId;
    listaOBJ = new Array();

    constructor(nombre){
        this.nombre = nombre;
        if(fs.existsSync(nombre)){
            this.listaOBJ = JSON.parse(fs.readFileSync(this.nombre, 'utf-8'));
            this.LaId = this.getId();
        }
        else {
            this.LaId = 1
            fs.writeFileSync(this.nombre, JSON.stringify([]));
        }

    }

    async getAll(){
        try{
            const contenido = await fs.promises.readFile(`./${this.nombre}`, 'utf-8')
            this.contenidoOBJ = JSON.parse (contenido)
            console.log (this.contenidoOBJ);
            }
        catch (err) {
            console.log("error")
            }
    }

    async deleteAll (){
        try{
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify([]));
            console.log("Productos eliminados")
        }
        catch (err) {
            console.log("error")
        }
    }

    async save(object) {
        try{
            object['id'] = this.LaId;
            this.LaId++;
            this.listaOBJ.push(object);
            await fs.promises.writeFile(this.nombre, JSON.stringify(this.listaOBJ, null, 2))
            console.log("El producto se guardo con la id: " + object.id)
            return Promise.resolve(object.id);
        }
        catch(error) {
            console.log(error)
        }
    }
    async getById(id) {
        let obj = null;
        this.listaOBJ.map((elemento) => {
            if (elemento.id == id)
            {
                obj = elemento;
            }
        })
        console.log (obj)
    }

    async deleteById(id) {
        let flag = false;
        for( let i = 0; i < this.listaOBJ.length; i++){     
            if ( this.listaOBJ[i].id === id) {
                flag = true;
                this.listaOBJ.splice(i, 1); 
                i--; 
            }
        }
        //console.log ("flag: " + flag)
        if (flag){
            try {
                await fs.promises.writeFile(this.nombre,JSON.stringify(this.listaOBJ, null, 2))
                console.log("borro");
            }
            catch (err) {
                console.log(err);
            }
        } else {
            console.log ("No se borro objeto pq no existe el ID");
        }
    }

    getId () {
        if (this.listaOBJ.length > 0) {
            let maxId = this.listaOBJ.reduce((acc,current) => {
                return Math.max(acc, current.id)
            }, 0)
            return maxId + 1;
        } else {
            return 1;
        }
    }
    
}

let Usuario1 = new Contenedor("productos.txt")
let producto1 = {title: "Cartuchera", price: 123, thumbnail: "http://www.google.com.ar"};
let producto2 = {title: "Goma", price: 123, thumbnail: "http://www.google.com.ar"};
let producto3 = {title: "Lapiz", price: 123, thumbnail: "http://www.google.com.ar"};

Usuario1.save(producto1)
Usuario1.save(producto2)
Usuario1.save(producto3)
//Usuario1.getById(3)
//Usuario1.deleteById(3)
//Usuario1.deleteAll()
//Usuario1.getAll()