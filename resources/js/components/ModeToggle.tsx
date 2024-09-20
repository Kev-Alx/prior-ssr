import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useTheme } from "@/components/Providers/ThemeProvider";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { useBlockTheme } from "@/lib/store";

export function ModeToggle() {
    const { setTheme } = useTheme();
    const { setTheme: setBlockTheme } = useBlockTheme();
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="p-2">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="center"
                className="w-32 p-2
            "
            >
                <PopoverClose asChild>
                    <div
                        onClick={() => {
                            setBlockTheme("light");
                            setTheme("light");
                        }}
                        className="relative flex select-none items-center rounded-sm px-4 py-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer hover:bg-accent"
                    >
                        Light
                    </div>
                </PopoverClose>
                <PopoverClose asChild>
                    <div
                        onClick={() => {
                            setBlockTheme("dark");
                            setTheme("dark");
                        }}
                        className="relative flex select-none items-center rounded-sm px-4 py-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer hover:bg-accent"
                    >
                        Dark
                    </div>
                </PopoverClose>
            </PopoverContent>
        </Popover>
    );
}
