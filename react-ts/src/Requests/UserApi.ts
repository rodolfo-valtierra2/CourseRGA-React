
const url = 'http://localhost:3000/auth';

function request (method:string , body=null) {
    let content = {}
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

function requestAuth (method:string, body=null, token='') {
    let content: any = {headers: {}};

    if(body && ['POST','PUT'].includes(method))
        content = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }
    return content.headers = {
        ...content.headers,
        Authorization: 'Bearer '+token
    }
}


const UserApi = {
    signIn: (data:any) => fetch(url+"/signin", request('POST',data)).then(res => res.json()),
    register: (data:any) => fetch(url+"/signup", request('POST', data))
        .then(res=> res.json()),
    logOut: (token:string) => fetch(url, requestAuth('delete',null,token)).then(res => res.json())
}

export {UserApi}
