export default class http {
    static async get(url: string) {
        return fetch(url).then((response) => response.json());
    }
    static async post(url:string, data:any) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => response.json());
    }
    static async put(url:string, data:any) {
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => response.json());
    }
    static async delete(url:string) {
        return fetch(url, {
            method: 'DELETE',
        }).then((response) => response.json());
    }
}