import {client} from "../../helpers/FetchWrapper";
import {Common} from "../../common/Common";
import * as Constants from "../../common/Constants";
export const ProductService = { 
  
    // SaveComments,
    GetTreeCateProduct,
    GetProductsByCategory,
    GetByCategoryId,
    GetById,
    AddProductToCart,
    GetAll,
    GetAllProduct
  };
  function GetAllProduct (params){
    return client(Constants.URL_API_DATA + `Product/GetListProduct?${Common.object2QueryString(params)}`)
    .then(result => {
      console.log(result)
        return result;
    }).catch(er => {
     console.log('lỗi', er);
        return null;
    })
  }
  function AddProductToCart (params){
    let requestOption = {
        method : 'POST',
        body : params
     };
     return client(Constants.URL_API_DATA + `Product/AddToCart` , requestOption).then(result => {
        return result;
    }).catch(er => {
        // console.log('lỗi', er);
        return null;
    })
}
function GetAll (params){
  return client(Constants.URL_API_DATA + `Product/GetAllProductTT?${Common.object2QueryString(params)}`)
  .then(result => {
    console.log(result)
      return result;
  }).catch(er => {
   console.log('lỗi', er);
      return null;
  })
}
function GetById (params){
  return client(Constants.URL_API_DATA + `Product/GetById?${Common.object2QueryString(params)}`)
  .then(result => {
    console.log(result)
      return result;
  }).catch(er => {
   console.log('lỗi', er);
      return null;
  })
}
function GetByCategoryId (params){
  return client(Constants.URL_API_DATA + `ProductCategory/GetById?${Common.object2QueryString(params)}`)
  .then(result => {
    console.log(result)
      return result;
  }).catch(er => {
   console.log('lỗi', er);
      return null;
  })
}
function GetTreeCateProduct (params){
  return client(Constants.URL_API_DATA + `ProductCategory/TreeProductCategory?${Common.object2QueryString(params)}`)
  .then(result => {
    console.log(result)
      return result;
  }).catch(er => {
   console.log('lỗi', er);
      return null;
  })
}
function GetProductsByCategory (params){
  return client(Constants.URL_API_DATA + `Product/GetProductByCategory?${Common.object2QueryString(params)}`)
  .then(result => {
    console.log(result)
      return result;
  }).catch(er => {
   console.log('lỗi', er);
      return null;
  })
}

