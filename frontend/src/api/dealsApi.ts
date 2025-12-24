const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function loginApi(
    email: string,
    password: string,
    website: string
) {
    const response = await fetch(`${API_BASE_URL}/deals/fetch-deals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, website }),
        credentials: 'include',
    });

    if (!response.ok) {
        const error = await response.json();
        console.log('login error response: ', error);
        throw new Error('Login failed, please check your credentials and try again.');
    }

    return response.json();
}

export async function fetchFilesApi(
    dealId: number,
    website: string
) {
    const response = await fetch(
        `${API_BASE_URL}/deals/fetch-files/${dealId}?site=${website}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        }
    );

    if (!response.ok) {
        const error = await response.json();
        console.log('fetch files error response: ', error);
        throw new Error('Something went wrong while fetching files, please try again.');
    }

    const data = await response.json();

    return data;
}
