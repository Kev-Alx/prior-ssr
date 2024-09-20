import { Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Button } from "@/components/ui/button";
import AdminPanel from "@/components/AdminPanel";
import { Category, CategoryAndArticle, Item } from "@/types/admin";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Dashboard({
    auth,
    item,
    items,
    categories,
}: PageProps) {
    const signOut = async () => {
        router.post("/admin/logout");
    };
    return (
        <>
            <Head title="Dashboard" />
            <nav className="z-10 absolute bg-bg w-full border-b-2 border-neutral-950">
                <div className="max-w-7xl w-full mx-auto flex justify-between px-8 py-2 items-center">
                    <h1>Admin dashboard</h1>
                    <Button onClick={signOut}>Sign out</Button>
                </div>
            </nav>
            <TooltipProvider>
                <div className="h-screen overflow-hidden">
                    <AdminPanel
                        items={items as Item[]}
                        item={item as CategoryAndArticle}
                        categories={categories as Category[]}
                    />
                </div>
            </TooltipProvider>
            <Toaster />
        </>
    );
}
