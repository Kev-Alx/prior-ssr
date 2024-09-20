import { Item } from "@/types/admin";
import { type ClassValue, clsx } from "clsx";
import { format, parse } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Remove non-word, non-space, and non-hyphen characters
        .replace(/\s+/g, "-") // Replace whitespace with hyphens
        .replace(/-+$/, ""); // Remove trailing hyphens
}

export function formatItem(items: Item[]) {
    for (const item of items) {
        if (item.hasOwnProperty("title")) {
            item.name = item.title || "";
            delete item.title;
        }
        if (item.hasOwnProperty("question")) {
            //@ts-ignore
            item.name = item.question || "";
            delete item.title;
        }
    }
    return items;
}

export function formatDate(inputDateStr: any) {
    const parsedDate = parse(inputDateStr, "yyyy-MM-dd", new Date());

    const month = format(parsedDate, "MMM");
    const year = format(parsedDate, "yyyy");

    const formattedDate = `${month} ${parsedDate.getDate()}, ${year}`;
    return formattedDate;
}
