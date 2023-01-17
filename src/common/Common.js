
import moment from 'moment';
// import Select from "react-select";
export const Common = {
    // parseJSON,
     dateFormatterNoTime,
    object2QueryString,
    getDsTrangThai,
    validString,
    // isEmptyObject,
    validPassword
}
// function isEmptyObject (obj){
//     if(typeof obj == "undefined"){
//         return true;
//     }
//     return obj== null || obj == '' || obj.length === 0;
// }
// function parseJSON(str) {
//     let result = ''
//     try {
//         if (str != null) {
//             if (str !== '') {
//                 result = JSON.parse(str);
//             }
//         }
//     } catch (error) {
//         result = str;
//     }
// }
// function dateFormatterNoTime(cell) {
//     return moment(cell).format("DD/MM/YYYY")
// }
function validString(str){
    const regex = /^[0-9a-zA-Z_/ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỂưạảấầẩẫậắằẳẵặẹẻẽềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹýč,.\-\s']+$/;
    return regex.test(str);
  }
  function validPassword(pwd){
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9_@./#&+-]{8,}$/; // Minimum eight characters, at least one letter and one number
    return regex.test(pwd);
  }
function object2QueryString(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
}
function getDsTrangThai(){
    return [
      {value: 1, label: 'Hoạt động'},
      {value: 0, label: 'Khóa'}
    ];
  }
  function dateFormatterNoTime(cell) {
    return moment(cell).format("yyyy/MM/DD hh:mm:ss")
  }