import {client} from "../../helpers/FetchWrapper";
import {Common} from "../../common/Common";
import * as Constants from "../../common/Constants";
export const ServicesService = { 
    GetNews,
    GetById,
    GetCmtNewsDt,
    SaveComments,
    GetNewsRecent,
    SaveVote,
    GetListVote,
    SaveLikeCmt
  };
  function SaveLikeCmt (params){
    let requestOption = {
        method : 'POST',
        body : params
     };
     return client(Constants.URL_API_DATA + `Service/SaveLikeCountCmt` , requestOption).then(result => {
        return result;
    }).catch(er => {
        // console.log('lỗi', er);
        return null;
    })
}
  function GetListVote (params){
    return client(Constants.URL_API_DATA + `Service/ListVote?${Common.object2QueryString(params)}`)
    .then(result => {
      console.log(result)
        return result;
    }).catch(er => {
     console.log('lỗi', er);
        return null;
    })
  }
  function SaveVote (params){
    let requestOption = {
        method : 'POST',
        body : params
     };
     return client(Constants.URL_API_DATA + `Service/SaveVote` , requestOption).then(result => {
        return result;
    }).catch(er => {
        // console.log('lỗi', er);
        return null;
    })
}
  function SaveComments (params){
    let requestOption = {
        method : 'POST',
        body : params
     };
     return client(Constants.URL_API_DATA + `Service/SaveComments` , requestOption).then(result => {
        return result;
    }).catch(er => {
        // console.log('lỗi', er);
        return null;
    })
}
function GetNewsRecent (params){
  return client(Constants.URL_API_DATA + `Service/GetNewsRecent?${Common.object2QueryString(params)}`)
  .then(result => {
    console.log(result)
      return result;
  }).catch(er => {
   console.log('lỗi', er);
      return null;
  })
}
function GetNews (params){
  return client(Constants.URL_API_DATA + `Service/GetNewsService?${Common.object2QueryString(params)}`)
  .then(result => {
    console.log(result)
      return result;
  }).catch(er => {
   console.log('lỗi', er);
      return null;
  })
}
function GetById (params){
  return client(Constants.URL_API_DATA + `Service/Detail?${Common.object2QueryString(params)}`)
  .then(result => {
    console.log(result)
      return result;
  }).catch(er => {
   console.log('lỗi', er);
      return null;
  })
}
function GetCmtNewsDt (params){
  return client(Constants.URL_API_DATA + `Service/GetCmtForDetail?${Common.object2QueryString(params)}`)
  .then(result => {
    console.log(result)
      return result;
  }).catch(er => {
   console.log('lỗi', er);
      return null;
  })
}