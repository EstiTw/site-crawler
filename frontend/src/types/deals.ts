export interface Deal {
    id: number;
    title: string;
}

export interface File {
    id: number;
    name: string;
    size_in_bytes: number;
    file_url: string;
}

export interface DealsResponse {
    access_token: string;
    available_deals: Deal[];
}

export interface FilesResponse {
    files: {
        data: {
            [key: string]: File;
        };
        message: string;
    };
}
