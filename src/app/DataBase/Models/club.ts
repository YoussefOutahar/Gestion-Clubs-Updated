import { Time } from "@angular/common";
import { Timestamp } from "rxjs";

export interface Club {
    id: number;
    name: string;
    date_creation: string;
    nb_member: number;
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

export interface Event {
    id: number;
    name: string;
    date: string;
    cost: number;
    img: string;
    earnings: number;
    supp_budget: number;
    url: string;
    id_club: number;
    description: string;
    location: string;
    file_name: string;
    aimed_target: string;
    time: string;
    funding_method: string;
    article_for_newsletter: string;
    state: string;
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

export interface Event {
    id: number;
    name: string;
    date: string;
    cost: number;
    img: string;
    earnings: number;
    supp_budget:number;
    url: string;
    id_club: number;
    description: string;
    location: string;
    file_name: string;
    aimed_target: string;
    time: string;
    funding_method: string;
    article_for_newsletter: string;
    state: string;
}

export interface Budget {
    id_club: number;
    source: string;
    budget: number;
    rest: number;
    year: number;
}
