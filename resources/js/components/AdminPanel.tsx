import { useEffect, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { useMediaQuery } from "usehooks-ts";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { router, usePage } from "@inertiajs/react";
import ItemList from "@/components/Dashboard/ItemList";
import ArticleForm from "@/components/Dashboard/ArticleForm";
import CategoryForm from "@/components/Dashboard/CategoryForm";
import FaqForm from "@/components/Dashboard/FaqForm";
import UserForm from "@/components/Dashboard/UserForm";
import { useAdminPage } from "@/lib/store";
import {
    Article,
    Category,
    CategoryAndArticle,
    Faq,
    Item,
    User,
} from "@/types/admin";
import { cn, formatItem } from "@/lib/utils";
import AdList from "@/components/Dashboard/AdList";
import MainAdForm from "@/components/Dashboard/MainAdForm";
import AdForm from "@/components/Dashboard/AdForm";
// import SearchCommand from "./SearchCommand";

type Props = {
    item?: CategoryAndArticle;
    items?: Item[];
    categories?: Category[];
};

const AdminPanel = ({ item, items, categories }: Props) => {
    const { activePanel, setActivePanel } = useAdminPage();
    const isMobile = useMediaQuery("(max-width: 640px)");
    const isDesktop = useMediaQuery("(min-width: 1200px)");
    const [typeView, setTypeView] = useState(true);
    const [itemView, setItemView] = useState(true);
    const { url } = usePage();
    const type =
        url.split("/")[2]?.charAt(0).toUpperCase() +
        url.split("/")[2]?.substring(1);
    const refType = useRef<ImperativePanelHandle>(null);
    const refItem = useRef<ImperativePanelHandle>(null);
    const isArticle = url.split("/")[2] === "article";
    const isCategory = url.split("/")[2] === "category";
    const isFAQ = url.split("/")[2] === "faq";
    const isUser = url.split("/")[2] === "user";
    const isAds = url.split("/")[2] === "ads";
    items = formatItem(items || []);
    useEffect(() => {
        if (!isMobile) {
            setActivePanel("one");
        }
    }, [isMobile]);
    const handleChangePanel = (panel: "one" | "two" | "three") => {
        if (!isMobile) {
            return;
        }
        setActivePanel(panel);
    };
    const expandPanelType = () => {
        const panel = refType.current;
        if (panel) {
            panel.expand();
        }
    };
    const expandPanelItem = () => {
        const panel = refItem.current;
        if (panel) {
            panel.expand();
        }
    };
    return (
        <ResizablePanelGroup
            autoSaveId="persistence"
            direction="horizontal"
            className="bg-bg "
        >
            {activePanel === "one" && (
                <ResizablePanel
                    order={1}
                    className="h-screen flex flex-col pt-14"
                    maxSize={18}
                    collapsible
                    ref={refType}
                    onClick={() => expandPanelType()}
                    onCollapse={() => setTypeView(false)}
                    onExpand={() => setTypeView(true)}
                    collapsedSize={isDesktop ? 5 : 8}
                    minSize={16}
                >
                    {typeView ? (
                        <div className="space-y-2 flex flex-col w-full lg:px-6 px-2 py-4">
                            <h1 className="font-semibold pl-2">Content</h1>
                            <Button
                                className={cn(
                                    "flex items-center justify-between bg-transparent hover:bg-tag/50 text-neutral-950 px-2",
                                    isArticle && "bg-tag"
                                )}
                                onClick={() => {
                                    handleChangePanel("two");
                                    router.replace("/admin/article");
                                }}
                            >
                                <span>Article</span>
                                <ChevronRight />
                            </Button>
                            <Button
                                className={cn(
                                    "flex items-center justify-between bg-transparent hover:bg-tag/50 text-neutral-950 px-2",
                                    isCategory &&
                                        url.split("/").length > 2 &&
                                        "bg-tag"
                                )}
                                onClick={() => {
                                    handleChangePanel("two");
                                    router.replace("/admin/category");
                                }}
                            >
                                <span>Category</span>
                                <ChevronRight />
                            </Button>
                            <Button
                                className={cn(
                                    "flex items-center justify-between bg-transparent hover:bg-tag/50 text-neutral-950 px-2",
                                    isFAQ && "bg-tag"
                                )}
                                onClick={() => {
                                    handleChangePanel("two");
                                    router.replace("/admin/faq");
                                }}
                            >
                                <span>FAQ</span>
                                <ChevronRight />
                            </Button>
                            <Button
                                className={cn(
                                    "flex items-center justify-between bg-transparent hover:bg-tag/50 text-neutral-950 px-2",
                                    isAds && "bg-tag"
                                )}
                                onClick={() => {
                                    handleChangePanel("two");
                                    router.replace("/admin/ads");
                                }}
                            >
                                <span>Ads</span>
                                <ChevronRight />
                            </Button>

                            <Button
                                className={cn(
                                    "flex items-center justify-between bg-transparent hover:bg-tag/50 text-neutral-950 px-2",
                                    isUser && "bg-tag"
                                )}
                                onClick={() => {
                                    handleChangePanel("two");
                                    router.replace("/admin/user");
                                }}
                            >
                                <span>Users</span>
                                <ChevronRight />
                            </Button>
                        </div>
                    ) : (
                        <div className="h-full cursor-pointer flex flex-col pt-12 items-center">
                            <p className="-rotate-90 origin-bottom translate-x-3 font-semibold lg:text-xl w-32 text-center">
                                {type || "Type"}
                            </p>
                        </div>
                    )}
                </ResizablePanel>
            )}
            {(activePanel === "two" || !isMobile) && (
                <>
                    {!isMobile && (
                        <ResizableHandle
                            withHandle
                            className="border border-neutral-950"
                        />
                    )}
                    <ResizablePanel
                        order={2}
                        className="h-screen flex flex-col pt-14 overflow-y-scroll"
                        maxSize={isDesktop ? 22 : 30}
                        minSize={isDesktop ? 18 : 24}
                        collapsible
                        ref={refItem}
                        onClick={() => expandPanelItem()}
                        onCollapse={() => setItemView(false)}
                        onExpand={() => setItemView(true)}
                        collapsedSize={isDesktop ? 5 : 8}
                    >
                        {isMobile && (
                            <Button
                                onClick={() => {
                                    handleChangePanel("one");
                                    router.replace("/admin");
                                }}
                            >
                                Back
                            </Button>
                        )}
                        {itemView ? (
                            isAds ? (
                                //@ts-ignore
                                <AdList type="Ads" items={items || []} />
                            ) : (
                                <>
                                    <ItemList
                                        type={url.split("/")[2] || ""}
                                        items={items || []}
                                    />
                                    {/* <SearchCommand
                                        type={url.split("/")[2] || ""}
                                        items={items}
                                    /> */}
                                </>
                            )
                        ) : (
                            <div className="h-full cursor-pointer flex flex-col pt-16 items-center">
                                <p
                                    className="-rotate-90 w-32
                                 origin-bottom translate-x-3 font-semibold lg:text-xl truncate text-center"
                                >
                                    {items?.find(
                                        (obj) => obj.uuid === url.split("/")[3]
                                    )?.name || "Item"}
                                </p>
                            </div>
                        )}
                    </ResizablePanel>
                </>
            )}
            {(activePanel === "three" || !isMobile) && (
                <>
                    {!isMobile && (
                        <ResizableHandle
                            withHandle
                            className="border border-neutral-950"
                        />
                    )}
                    <ResizablePanel
                        order={3}
                        className={
                            "h-screen overflow-hidden flex flex-col pt-14"
                        }
                    >
                        {url.split("/").length > 3 &&
                            url.split("/")[3].length > 0 &&
                            (url.split("/")[2] === "article" ? (
                                <ArticleForm
                                    categories={categories || []}
                                    article={item as Article}
                                />
                            ) : url.split("/")[2] === "category" ? (
                                <CategoryForm category={item as Category} />
                            ) : url.split("/")[2] === "faq" ? (
                                <FaqForm faq={item as Faq} />
                            ) : url.split("/")[2] === "user" ? (
                                //@ts-ignore
                                <UserForm user={item} />
                            ) : url.split("/")[2] === "ads" &&
                              url.split("/")[3] === "main" ? (
                                //@ts-ignore
                                <MainAdForm mainAd={item[0]} />
                            ) : (
                                //@ts-ignore
                                <AdForm ad={item} />
                            ))}
                    </ResizablePanel>
                </>
            )}
        </ResizablePanelGroup>
        // <p>wel</p>
    );
};

export default AdminPanel;
