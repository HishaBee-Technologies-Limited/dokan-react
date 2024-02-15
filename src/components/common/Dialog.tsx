import {
    DialogHeader,
    DialogFooter,
    DialogContent,
    Dialog as DialogComponent,
} from "@/components/ui/dialog"
import { Text } from "./text"

type IDialogProps = {
    open: boolean;
    children: React.ReactNode;
    header: React.ReactNode | string;
    onClose: (open: boolean) => void
}

export function Dialog({ children, header, onClose, open }: IDialogProps) {
    return (
        <>
            <DialogComponent open={open} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[625px] min-h-[20rem] pb-space16">
                    <DialogHeader className="p-0 h-[5.6rem] px-space16 py-space12">
                        {(typeof header === 'string') ? <Text variant="success" classes="text-lg md:text-xl font-bold">{header}</Text> : header}
                    </DialogHeader>

                    <div className="px-space16">
                        {children}
                    </div>
                </DialogContent>
            </DialogComponent>
        </>
    )
}

export const Footer = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="h-[5rem]"></div>
            <DialogFooter className={`px-space16 py-space12 absolute bottom-space16 left-0 w-full border-t border-primary-20 dark:border-primary-80 `}>
                {children}
            </DialogFooter>
        </>
    )
}
