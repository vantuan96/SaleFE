import {client} from "../../helpers/FetchWrapper";
import {Common} from "../../common/Common";
import * as Constants from "../../common/Constants";
export const MainMenuService = {
    
    GetTreeHeader,
    
  };

  function GetTreeHeader (params){
    return client(Constants.URL_API_DATA + `MainMenu/TreeHeader?${Common.object2QueryString(params)}`)
    .then(result => {
      console.log(result)
        return result;
    }).catch(er => {
     console.log('lỗi', er);
        return null;
    })
   
}

