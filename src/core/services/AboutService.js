import {client} from "../../helpers/FetchWrapper";
import {Common} from "../../common/Common";
import * as Constants from "../../common/Constants";
export const AboutService = {
    GetInfo,
    GetListMembers
  };

  function GetInfo (params){
    return client(Constants.URL_API_DATA + `About/GetInfo?${Common.object2QueryString(params)}`)
    .then(result => {
      console.log(result)
        return result;
    }).catch(er => {
     console.log('lỗi', er);
        return null;
    })
   
   
     
}
function GetListMembers (params){
  return client(Constants.URL_API_DATA + `About/GetMember?${Common.object2QueryString(params)}`)
  .then(result => {
    console.log(result)
      return result;
  }).catch(er => {
   console.log('lỗi', er);
      return null;
  })
}