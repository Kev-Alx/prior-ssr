import { Separator } from "@/components/ui/separator";
import Guest from "@/Layouts/GuestLayout";
import { Ad as AdT } from "@/types/admin";
import { Head } from "@inertiajs/react";

type Props = {
    ads?: AdT[];
};

const Ad = ({ ads }: Props) => {
    return (
        <>
            <Head title="Ads" />
            <Guest>
                <main className="max-w-7xl mx-auto pt-24 px-8">
                    <h1 className="font-grotesk font-bold text-4xl mb-4">
                        Support Us
                    </h1>
                    <Separator />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-8 sm:p-4 w-full">
                        {ads?.map((ad) => (
                            <AdItem ad={ad} />
                        ))}
                    </div>
                </main>
            </Guest>
        </>
    );
};
const AdItem = ({ ad }: { ad: AdT }) => {
    return (
        <a
            href={ad.link}
            className="flex flex-col gap-3 px-4 py-3 w-full sm:max-lg:last:odd:col-span-2 hover:bg-tag/20 transition-colors group cursor-pointer rounded"
        >
            <h1 className="font-grotesk font-medium text-xl">{ad.name}</h1>
            <img
                src={ad.main_image}
                className="w-full object-cover rounded-[6px] bg-slate-300 max-h-80"
            />
            <p className="font-grotesk text-muted-foreground">
                {ad.description}
            </p>
        </a>
    );
};
export default Ad;
