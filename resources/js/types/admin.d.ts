export interface Item {
    name: string;
    title?: string;
    imageUrl?: string;
    uuid: string;
}

interface Base {
    uuid: string;
    createdAt: string;
}

export interface Ad extends Base {
    name: string;
    main_image: string;
    description: string;
    link: string;
}

export interface Category extends Base {
    name: string;
    description: string;
}
export interface MainAd extends Base {
    title: string;
    description: string;
    link: string;
    image: string;
}
export interface Faq extends Base {
    slug: string;
    question: string;
    answer: string;
}

export interface User extends Base {
    id: string;
    name: string;
    email: string;
}

export interface Ads extends Base {
    title: string;
    description: string;
    link: string;
    image: string;
}
export interface Article extends Base {
    title: string;
    author?: string;
    category_id: string;
    category: Category;
    slug: string;
    description: string;
    read_time?: number;
    main_image?: string;
    publish_date: Date;
    content?: string;
    is_published?: boolean;
    main_featured: boolean;
    category_featured: boolean;
}

export type CategoryAndArticle = Category | Article | Faq;
