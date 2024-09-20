import { useAdminPage } from "@/lib/store";
import { Link, usePage } from "@inertiajs/react";
import { File, Home, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Ads } from "@/types/admin";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

type Props = { items: Ads[]; type: string };

const AdList = ({ type, items }: Props) => {
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
                        <Link href={`/admin/ads/create`}>
                            <Plus className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="space-y-2 px-2 overflow-y-auto">
                <MainItem type="ads" />
                <Separator />
                {items.map((ad) => (
                    <ListItem item={ad} />
                ))}
            </div>
        </>
    );
};

const MainItem = ({ type }: any) => {
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
    if (url.split("/").length > 3 && url.split("/")[3] === "main") {
        isActive = true;
    }
    return (
        <Link
            href={`/admin/${type}/main`}
            className={cn(
                "flex gap-2 py-1 pl-2 items-center hover:bg-tag/50 transition-colors rounded",
                isActive && "bg-tag"
            )}
            onClick={() => handleChangePanel("three")}
        >
            <Home className="w-5 h-5" />

            <p className=" truncate">Homepage Ad</p>
        </Link>
    );
};

const ListItem = ({ item }: any) => {
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
    return (
        <Link
            href={`/admin/ads/${item.uuid}`}
            className={cn(
                "flex gap-2 py-1 pl-2 items-center hover:bg-tag/50 transition-colors rounded",
                isActive && "bg-tag"
            )}
            onClick={() => handleChangePanel("three")}
        >
            {item.imageUrl ? (
                <img src={item.imageUrl} />
            ) : (
                <File className="w-5 h-5" />
            )}
            <p className=" truncate">{item.name}</p>
        </Link>
    );
};
export default AdList;
