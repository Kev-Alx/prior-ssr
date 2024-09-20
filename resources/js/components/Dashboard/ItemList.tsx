import { useAdminPage, useSearch } from "@/lib/store";
import { Item } from "@/types/admin";
import { Link, usePage } from "@inertiajs/react";
import { File, Plus, Trash } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { items: Item[]; type: string };

const ItemList = ({ items, type }: Props) => {
    // const { onOpen } = useSearch();
    if (type.length < 1) {
        return null;
    }
    console.log(items);
    const { setActivePanel } = useAdminPage();
    return (
        <>
            <div className="px-2 py-4 flex justify-between lg:px-6">
                <h1 className="font-semibold">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </h1>
                <div>
                    <Button
                        asChild
                        className="p-0.5"
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() => setActivePanel("three")}
                    >
                        <Link href={`/admin/${type}/create`}>
                            <Plus className="h-5 w-5" />
                        </Link>
                    </Button>
                    {/* <Button
                        onClick={onOpen}
                        className="p-0.5"
                        variant={"ghost"}
                        size={"icon"}
                    >
                        <Search className="h-5 w-5" />
                    </Button> */}
                </div>
            </div>
            <div className="space-y-2 px-2 overflow-y-auto">
                {items.map((item) => (
                    <ListItem type={type} key={item.uuid} item={item} />
                ))}
            </div>
        </>
    );
};

type ItemProps = {
    item: any;
    type: string;
};

const ListItem = ({ item, type }: ItemProps) => {
    const { setActivePanel } = useAdminPage();
    const isMobile = useMediaQuery("(max-width: 640px)");
    const handleChangePanel = (panel: "one" | "two" | "three") => {
        if (!isMobile) {
            return;
        }
        setActivePanel(panel);
    };
    const { url } = usePage();
    let isActive = false;
    if (url.split("/").length > 3 && url.split("/")[3] === item.uuid) {
        isActive = true;
    }
    console.log(item);
    return (
        <Link
            href={
                type === "user"
                    ? `/admin/${type}/${item.id}`
                    : `/admin/${type}/${item.uuid}`
            }
            className={cn(
                "flex gap-2 py-1 pl-2 items-center hover:bg-tag/50 transition-colors rounded",
                isActive && "bg-tag"
            )}
            onClick={() => handleChangePanel("three")}
            key={item.uuid + "unq"}
        >
            {item.is_published || type !== "article" ? (
                <File
                    className={cn(
                        "w-5 h-5",
                        item.category_featured && "fill-sky-400",
                        item.main_featured && "fill-yellow-300"
                    )}
                />
            ) : (
                <Trash className={cn("w-5 h-5 fill-red-500")} />
            )}
            <p className="truncate">{item.name}</p>
        </Link>
    );
};

export default ItemList;
