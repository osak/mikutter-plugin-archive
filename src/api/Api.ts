declare const API_BASE: string;

function getBaseUrl() {
    return API_BASE;
}

function encodeQueryParam(str: string): string {
    return encodeURIComponent(str)
        .replace('=', '%3D')
        .replace('&', '%26');
}

export async function get(path: string, q: { [key: string]: any }) {
    const params = Object.keys(q)
        .map((key) => `${key}=${encodeQueryParam(q[key])}`)
        .join('&');
    const response = await fetch(`${getBaseUrl()}${path}?${params}`);
    return await response.json();
}
