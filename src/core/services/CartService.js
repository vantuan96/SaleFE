import {client} from "../../helpers/FetchWrapper";
import {Common} from "../../common/Common";
import * as Constants from "../../common/Constants";
export const CartService = {
    
    GetListAllCartShop,
    GetAll,
    DeleteSp
  };

  function GetListAllCartShop (params){
    return client(Constants.URL_API_DATA + `CartShopping/GetAllCartOrder?${Common.object2QueryString(params)}`)
    .then(result => {
      console.log(result)
        return result;
    }).catch(er => {
     console.log('lỗi', er);
        return null;
    })
   
}

function DeleteSp (params){
  return client(Constants.URL_API_DATA + `CartShopping/Delete?${Common.object2QueryString(params)}`)
  .then(result => {
    console.log(result)
      return result;
  }).catch(er => {
   console.log('lỗi', er);
      return null;
  })
 
}
function GetAll (params){
  return client(Constants.URL_API_DATA + `CartShopping/GetAllOrder?${Common.object2QueryString(params)}`)
  .then(result => {
    console.log(result)
      return result;
  }).catch(er => {
   console.log('lỗi', er);
      return null;
  })
}