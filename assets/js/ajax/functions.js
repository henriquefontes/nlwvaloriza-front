async function createUser(name, email, password) {
    const uri = `http://localhost:3000/users`;
    const response = await fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
    
    return response;
}

async function loginUser(email, password) {
    const uri = `http://localhost:3000/login`;
    const response = await fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    
    const token = await response.json();

    return {
        response,
        token
    };
}

async function getUsers(token) {
    const uri = `http://localhost:3000/users`
    const response = await fetch(uri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application-json',
            'Authorization': `Bearer ${token}`
        }
    })

    const json = await response.json();
    
    return json;
}

async function getTags(token) {
    const uri = `http://localhost:3000/tags`
    const response = await fetch(uri, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application-json',
            'Authorization': `Bearer ${token}`
        }
    })

    const json = await response.json();

    return json;

}

async function postCompliment(tag, user_receiver, message, token) {
    const uri = `http://localhost:3000/compliments`;
    const response = await fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            tag_id: tag,
            user_receiver: user_receiver.id,
            message: message
        })
    })
    
    const json = await response.json();

    return {
        response,
        json
    };
}

export { getUsers, getTags, postCompliment, createUser, loginUser }