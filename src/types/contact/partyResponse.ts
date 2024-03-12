export interface IPartyResponse {
    id: number;
    user_id: number;
    shop_id: number;
    name: string;
    mobile: string;
    email: string | null;
    address: string | null;
    image_src: string | null;
    created_at: string;
    updated_at: string;
    version: number;
    unique_id: string;
    salary?: string | undefined;
}
