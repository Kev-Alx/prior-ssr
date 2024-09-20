import { useEffect, useMemo } from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { File } from "lucide-react";
import { useSearch } from "@/lib/store";
import { router } from "@inertiajs/react";

type Props = {
    type: string;
    items: any[];
};

const SearchCommand = ({ items, type }: Props) => {
    const { toggle, isOpen, onClose } = useSearch();
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [toggle]);
    const onSelect = (id: string) => {
        router.visit(`/admin/${type}/${id}`);
        onClose();
    };
    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <div className="py-1">
                <CommandInput
                    placeholder={`Search for ${type}s...`}
                    className="outline-none border-none focus:outline-none w-10/12"
                />
            </div>
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Documents">
                    {items?.map((document) => (
                        <CommandItem
                            key={document.uuid}
                            value={`${document.uuid}-${document.name}`}
                            title={document.name}
                            onSelect={() => onSelect(document.uuid)}
                            className="cursor-pointer"
                        >
                            <File className="mr-2 h-4 w-4" />
                            <span>{document.name}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};

export default SearchCommand;
