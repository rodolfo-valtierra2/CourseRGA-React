
const url = 'http://localhost:3000/users';


const SessionApi = {
    signIn: (data) => fetch(url, {
        method: 'post',
        body: JSON.stringify(data)
    }).then(res => res.json()),
    singUp: (data) => fetch(url, {
        method: 'put',
        body: JSON.stringify(data)
    }),
    logOut: (token) => fetch(url+"/"+token, {
        method: 'delete'
    }).then(res => res.json())
}

export {SessionApi}