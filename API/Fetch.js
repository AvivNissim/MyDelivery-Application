const BASE_API = "https://my-delivery.somee.com";

export const Get = async (url) => {
    let result = await fetch(`${BASE_API}/${url}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    let data = await result.json();

    return data;
}

export const Post = async (url, info) => {
    let result = await fetch(`${BASE_API}/${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
    });

    let data = await result.json();

    return data;
}

export const Delete = async(url) => {
    let result = await fetch(`${BASE_API}/${url}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    let data = await result.json();

    return data;
}

export const Put = async (url, info) => {
    let result = await fetch(`${BASE_API}/${url}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
    });

    let data = await result.json();

    return data;
}

