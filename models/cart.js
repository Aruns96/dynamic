const fs = require("fs");
const path = require("path");
const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart {
    static addProduct(id,productPrice){
       fs.readFile(p,(err,fileContent)=>{
        let cart = {produts:[],totalPrice:0}
        if(!err){
           cart = JSON.parse(fileContent);
        }
        const existingProductIndex = cart.produts.findIndex(prod => prod.id === id);
        const existingProduct = cart.produts[existingProductIndex]
        let updatedProduct;
        if(existingProduct){
         updatedProduct = {...existingProduct};
         updatedProduct.qty = updatedProduct.qty + 1;
         cart.produts = [...cart.produts];
         cart.produts[existingProductIndex] =  updatedProduct;
        }else{
            updatedProduct = {id : id,qty:1};
            cart.produts = [...cart.produts,updatedProduct]
        }
        cart.totalPrice = cart.totalPrice + +productPrice;
        fs.writeFile(p,JSON.stringify(cart),err=>{
            console.log(err)
        })
       })
    }
}