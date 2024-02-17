import { Text } from "./text"
import { useMediaQuery } from 'usehooks-ts'
import {
    Sheet,
    SheetFooter,
    SheetHeader,
    SheetContent,
} from "@/components/ui/sheet"

type IDrawerProps = {
    open: boolean;
    children: React.ReactNode;
    header: React.ReactNode | string;
    onClose: (open: boolean) => void
}

export function Drawer({ children, header, onClose, open }: IDrawerProps) {
    const footerHeight = 9.6
    const desktopView = useMediaQuery('(min-width: 768px)')

    return (
        <>
            <Sheet open={open} onOpenChange={onClose}>
                <SheetContent side={desktopView ? 'right' : 'bottom'} className="dark:bg-primary-90 dark:border-none">
                    <SheetHeader>
                        {(typeof header === 'string') ? <Text variant="success" className="text-lg md:text-xl font-bold">{header}</Text> : header}
                    </SheetHeader>

                    <div
                        style={{ height: `calc(100vh - 5.6rem - ${footerHeight}rem)` }}
                        className="px-space16 py-space10 md:px-space32 md:py-space16 overflow-y-scroll"
                    >
                        {children}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

export const DrawerFooter = ({ children }: { children: React.ReactNode }) => {
    return (
        <SheetFooter className={`absolute bottom-0 left-0 w-full px-space16 pb-space16 pt-space10 md:px-space32 md:pt-space16 md:pb-space24 border-t border-primary-20 dark:border-primary-80`}>
            {children}
        </SheetFooter>
    )
}
