import { formatDate } from "@/lib/utils";
import { Article } from "@/types/admin";
import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";
type Props = {
    article: Article;
};

const ArticleCard = ({ article }: Props) => {
    return (
        <Link
            className="flex flex-col gap-3 px-4 py-3 w-full sm:max-lg:last:odd:col-span-2 hover:bg-tag/20 transition-colors group cursor-pointer rounded"
            href={`/${article.slug}`}
        >
            <div className="rounded-[6px] bg-slate-300 h-52">
                <img
                    src={article.main_image}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex gap-8 items-center">
                <p className="text-muted-foreground text-lg font-grotesk">
                    {formatDate(article.publish_date)}
                </p>
                <p className="bg-tag dark:bg-neutral-700 py-0.5 px-2 rounded-full text-center font-grotesk">
                    {article.category.name}
                </p>
            </div>
            <h2 className="font-grotesk font-medium text-2xl">
                {article.title}
            </h2>
            <p className="text-muted-foreground flex-grow">
                {article.description}
            </p>
            <p className="flex items-end gap-2 mt-4 effect hover:underline ">
                <span className="font-grotesk ">Read more</span>
                <ChevronRight className="w-5 p-0 group-hover:translate-x-1 transition-transform" />
            </p>
        </Link>
    );
};

export default ArticleCard;
