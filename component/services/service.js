class ProductService{
  getData(){
         let promise=fetch("http://localhost:4070/api/products");
         return promise;
  }

  postData(prd){
      let promise=fetch("http://localhost:4070/api/products",
      {method:"post",headers:{ 
          "Content-Type":"application/json"},
          body:JSON.stringify(prd)

      });
      return promise;
  }

  deleteData(id){
    let promise = fetch(`http://localhost:4070/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return promise;
  }

  UpdateData(prd){
    let id=prd.ProductId;
    let promise = fetch(`http://localhost:4070/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },body:JSON.stringify(prd)

    });
    return promise;
  }

}


export default ProductService;