
const url = 'http://localhost:3000/auth';

function request (method, body=null) {
    let content = {method}
    if(body && ['POST','PUT'].includes(method))
        content = {
            ...content,
            headers: {
                'Content-Type': 'application/json', // Specify JSON format
            },
            body: JSON.stringify(body),
        }
    return content
}

function requestAuth (method, body=null, token='') {
    let content: any = {headers: {}};

    if(body && ['POST','PUT'].includes(method))
        content = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }
    content.headers = {
        ...content.headers,
        Authorization: 'Bearer '+token
    }
}


const UserApi = {
    signIn: (data) => fetch(url+"/signin", request('POST',data)).then(res => res.json()),
    register: (data) => fetch(url+"/signup", request('POST', data))
        .then(res=> res.json()),
    logOut: (token) => fetch(url, requestAuth('delete',null,token)).then(res => res.json())
}

export {UserApi}
