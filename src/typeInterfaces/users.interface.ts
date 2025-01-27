export type locationInterface = {
    ip: string,
    usedIps: string[],
    city: string,
    region: string,
    country: string,
    isp: string,
    lat: number,
    lon: number,
};

// export type authUserInterface = {
//     id: string,
//     first_name: string,
//     last_name: string,
//     tier: string,
//     UserTraits: {
//         date_of_birth: string,
//         gender: string,
//         verified: boolean,
//     },
// };


export type userInterface = {
    id: string;
    role_id: string,
    
    email: string;
    first_name: string;
    last_name: string;
    email_verified: boolean,
    is_suspended: boolean,
    idempotency_key: string;
    
    last_login: string,
    created_at: string;
    updated_at: string;
};
