export interface Club {
    id: number;
    name: string;
    date_creation: string;
    nb_members: number;
    id_category: number;
    mission: string;
    logo: string;
    state: string;
    kpo: string;
    type: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface Meeting {
    id: number;
    id_club: number;
    location: string;
    date: string;
} 

export interface Forum {
    id: number;
    club_id: number;
    name: string;
    description: string;
    created_at: string;
}

export interface ForumMessage {
    id: number;
    created_at: string;
    forum_id: number;
    user_id: string;
    content: string;
}
