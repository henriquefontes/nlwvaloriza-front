async function requestAPI(endpoint, method, token, body) {
    const uri = `http://localhost:3000/${endpoint}`

    const requestOptions = (method) => {
        if (method != 'GET') {
            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify(body)
            }

            return options;
        }

        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            }
        }

        return options;
    }

    const response = await fetch(uri, requestOptions(method));

    const json = await response.json();
    
    return {
        response,
        json
    };
}

export { requestAPI }