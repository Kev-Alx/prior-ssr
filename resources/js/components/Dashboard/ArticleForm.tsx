import "@blocknote/core/fonts/inter.css";
import { ArrowLeft, Edit, Loader2, Share, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { router, useForm } from "@inertiajs/react";
import { cn, slugify } from "@/lib/utils";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerPortal,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import useChangePanel from "@/hooks/useChangePanel";
import { useState } from "react";
import { Block } from "@blocknote/core";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Article, Category } from "@/types/admin";
import useArticle from "@/hooks/useArticle";
import axios from "axios";
import { useOrigin } from "@/hooks/useOrigin";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
type Props = {
    article?: Article;
    categories: Category[];
};

const ArticleForm = ({ article, categories }: Props) => {
    const origin = useOrigin();
    const handleUpload = async (file: File) => {
        const body = new FormData();
        body.append("file", file);
        const response = await axios.post("/admin/upload", body);
        return `${origin}/storage/` + response.data.path;
    };

    const editor = useCreateBlockNote({
        uploadFile: handleUpload,
        initialContent: article?.content ? JSON.parse(article.content) : null,
    });
    const { data, setData } = useForm({
        title: article?.title || "",
        description: article?.description || "",
        slug: article?.slug || "",
        author: article?.author || "",
        category_id: article?.category_id || "",
        readTime: article?.read_time || 0,
        mainImage: article?.main_image || "",
        publishDate: article?.publish_date || new Date(),
        content: article?.content || "",
        mainFeatured: article?.main_featured || false,
        categoryFeatured: article?.category_featured || false,
        isPublished: article?.is_published ?? true,
    });
    const [blocks, setBlocks] = useState<Block[]>();
    const { isLoading, createNewArticle, deleteArticle, updateArticle } =
        useArticle();
    const submit = (e: any) => {
        e.preventDefault();
        if (isExiting) return;
        const payload = {
            title: data.title,
            description: data.description,
            slug: data.slug,
            author: data.author,
            category_id: data.category_id,
            publish_date: data.publishDate,
            main_image: data.mainImage,
            read_time: data.readTime,
            main_featured: data.mainFeatured,
            category_featured: data.categoryFeatured,
            content: JSON.stringify(blocks),
            is_published: data.isPublished,
        };
        if (isEditing) {
            updateArticle({
                uuid: article?.uuid || "",
                ...payload,
            });
        } else {
            createNewArticle({
                ...payload,
            });
        }
    };

    const generateSlug = () => {
        setData("slug", slugify(data.title));
    };
    const handleChangePanel = useChangePanel();
    const [isExiting, setIsExiting] = useState(false);
    const isEditing = !!article;
    const handleDelete = () => {
        setIsExiting(true);
        handleChangePanel("two");
        deleteArticle({
            uuid: article?.uuid || "",
        });
    };
    return (
        <section className="bg-bg h-full overflow-y-auto relative">
            <form onSubmit={submit}>
                <div className="flex justify-between px-4 py-4 border-b-2 border-neutral-950 items-center bg-bg sticky top-0">
                    <h1>{article?.title || "Untitled"}</h1>
                    <div className="flex gap-2">
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() => {
                                        setIsExiting(true);
                                        handleChangePanel("two");
                                        router.replace(`/admin/article`);
                                    }}
                                    size={"icon"}
                                    variant={"secondary"}
                                    type="button"
                                    asChild
                                    className="p-1 cursor-pointer"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                Cancel
                            </TooltipContent>
                        </Tooltip>
                        {isLoading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <Tooltip delayDuration={100}>
                                <TooltipTrigger asChild>
                                    <Button size={"icon"} type="submit">
                                        <Share className="h-5 w-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    Publish
                                </TooltipContent>
                            </Tooltip>
                        )}

                        <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={handleDelete}
                                    size={"icon"}
                                    variant={"destructive"}
                                    type="button"
                                    asChild
                                    className="p-1 cursor-pointer"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                Delete
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
                <div className="p-4 overflow-y-auto">
                    <label htmlFor="title">Title</label>
                    <Input
                        id="title"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="mb-3 mt-2"
                    />
                    <label htmlFor="description">Description</label>
                    <Input
                        id="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="mb-3 mt-2"
                    />
                    <label htmlFor="slug">Slug</label>
                    <div className="flex gap-2 items-center">
                        <Input
                            id="slug"
                            value={data.slug}
                            onChange={(e) => setData("slug", e.target.value)}
                            className="mb-3 mt-2"
                        />
                        <Button type="button" onClick={generateSlug}>
                            Generate
                        </Button>
                    </div>
                    <label htmlFor="author">Author</label>
                    <Input
                        id="author"
                        value={data.author}
                        onChange={(e) => setData("author", e.target.value)}
                        className="mb-3 mt-2"
                    />
                    <label>Category</label>
                    <Select
                        value={data.category_id}
                        onValueChange={(e) => setData("category_id", e)}
                    >
                        <SelectTrigger className="w-full mb-3 mt-2">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {categories.map((cat) => (
                                    <SelectItem key={cat.uuid} value={cat.uuid}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <label>Main Image</label>
                    <Input
                        type="file"
                        className="w-full mb-3 mt-2"
                        onChange={async (e) => {
                            const body = new FormData();
                            //@ts-ignore
                            body.append("file", e.target.files[0]);
                            const response = await axios.post(
                                "/admin/upload",
                                body
                            );
                            setData(
                                "mainImage",
                                `${origin}/storage/` + response.data.path
                            );
                        }}
                    />
                    <label htmlFor="readTime">
                        Read time
                        <span className="text-muted-foreground">
                            {" "}
                            (minutes)
                        </span>
                    </label>
                    <Input
                        id="readTime"
                        value={data.readTime}
                        onChange={(e) => setData("readTime", +e.target.value)}
                        className="mb-3 mt-2"
                        type="number"
                        min={0}
                        placeholder="minutes"
                    />
                    <label className="block">Publish Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full pl-3 text-left font-normal mb-3 mt-2",
                                    !data.publishDate && "text-muted-foreground"
                                )}
                            >
                                {data.publishDate ? (
                                    format(data.publishDate, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="center">
                            <Calendar
                                mode="single"
                                selected={data.publishDate}
                                onSelect={(e) =>
                                    setData("publishDate", e || new Date())
                                }
                                disabled={(date) => {
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    return date < today;
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <div className="w-full flex justify-between items-center my-3">
                        <span>Content</span>
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button
                                    className="flex gap-2 items-center px-6"
                                    variant={"secondary"}
                                >
                                    Edit
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </DrawerTrigger>
                            <DrawerPortal>
                                <DrawerContent className="h-[96%] ">
                                    <DrawerHeader>
                                        <DrawerTitle>Editing title</DrawerTitle>
                                    </DrawerHeader>
                                    <Separator />
                                    <div className="overflow-auto">
                                        <BlockNoteView
                                            editor={editor}
                                            theme={"light"}
                                            onChange={() => {
                                                // setData('content', editor.document)
                                                setBlocks(editor.document);
                                            }}
                                        />
                                    </div>
                                    <DrawerFooter>
                                        <DrawerClose asChild>
                                            <Button>Done</Button>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </DrawerContent>
                            </DrawerPortal>
                        </Drawer>
                    </div>
                    <div className="mb-4 mt-2 grid grid-cols-4 gap-x-4 gap-y-6">
                        <label>Featured in homepage</label>
                        <Switch
                            checked={data.mainFeatured}
                            onCheckedChange={(e) => setData("mainFeatured", e)}
                        />
                        <label>Featured in category</label>
                        <Switch
                            checked={data.categoryFeatured}
                            onCheckedChange={(e) =>
                                setData("categoryFeatured", e)
                            }
                        />
                        <label>Publish Article</label>
                        <Switch
                            checked={data.isPublished}
                            onCheckedChange={(e) => setData("isPublished", e)}
                        />
                    </div>
                </div>
            </form>
        </section>
    );
};

export default ArticleForm;
