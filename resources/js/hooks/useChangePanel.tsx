import { useAdminPage } from "@/lib/store";
import { useMediaQuery } from "usehooks-ts";

const useChangePanel = () => {
    const { setActivePanel } = useAdminPage();
    const isMobile = useMediaQuery("(max-width: 640px)");
    const handleChangePanel = (panel: "one" | "two" | "three") => {
        if (!isMobile) {
            return;
        }
        setActivePanel(panel);
    };
    return handleChangePanel;
};

export default useChangePanel;
