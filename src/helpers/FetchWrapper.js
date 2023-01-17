 import * as Constants from "../common/Constants";
 export function client(endpoint, { body, ...customConfig } = {}) {
    const token = localStorage.getItem(Constants.AUTH_TOKEN);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append('Access-Control-Allow-Origin', "*");
    headers.append("formName", customConfig.formName);
    headers.append('GET', 'POST', 'OPTIONS');
    headers.append("categoryName", customConfig.categoryName);

    if (token) {
        headers.append("Authorization", `Bearer ${token}`);

    }

    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: headers,
      
    }
    if (body) {
        config.body = JSON.stringify(body);
    }
    return  fetch(`${endpoint}`, config).then(async response => {
       
        if (response.status === 401) {
            // console.log("Not authorization");
            handle401();
            return;
        }
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            return Promise.reject(data);
        }

    })

}
function handle401() {
    localStorage.clear();
    sessionStorage.clear();
    // history.push("/login");
}
export function fileClient(endpoint, { body, ...customConfig } = {}) {
    // const token = localStorage.getItem(Constants.AUTH_TOKEN);
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("formName", customConfig.formName);
    headers.append("categoryName", customConfig.categoryName);
    if (customConfig.templateName) {
        headers.append("templateName", customConfig.templateName);
    }
    // if (token) {
    //     headers.append("Authorization", `Bearer ${token}`);
    // }
    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: headers
    }
    if (body) {
        config.body = JSON.stringify(body);
    }

    return fetch(`${endpoint}`, config)
    .then(response => response.blob())
    .then(result => {
      return result;
    })
    .catch(error => {
      // console.log('error', error);
      return null;
    });
}
