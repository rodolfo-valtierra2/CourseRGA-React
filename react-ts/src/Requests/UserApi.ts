
const url = 'http://localhost:3000/auth';

function request (method, body=null) {
    let content = {method}
    if(body && ['POST','PUT'].includes(method))
        content = {
            headers: {
                'Content-Type': 'application/json', // Specify JSON format
            },
            body: JSON.stringify(body),
            ...content
        }

    return content
}


const UserApi = {
    signIn: (data) => fetch(url+"/signin", {
        method: 'post',
        body: JSON.stringify(data)
    }).then(res => res.json()),
    register: (data) => fetch(url+"/signup", request('POST', data))
        .then(res=> res.json()),
    logOut: (token) => fetch(url+"/"+token, request('delete')).then(res => res.json())
}

export {UserApi}