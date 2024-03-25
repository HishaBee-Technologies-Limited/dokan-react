import {
  DialogHeader,
  DialogFooter as Footer,
  DialogContent,
  Dialog as DialogComponent,
} from '@/components/ui/dialog';
import { Text } from './text';

type IDialogProps = {
  open: boolean;
  children: React.ReactNode;
  header: React.ReactNode | string;
  onClose: (open: boolean) => void;
  className?: string;
};

export function Dialog({
  children,
  header,
  onClose,
  open,
  className = '',
}: IDialogProps) {
  return (
    <>
      <DialogComponent open={open} onOpenChange={onClose}>
        <DialogContent
          className={`sm:max-w-[64rem] min-h-[20rem] ${className}`}
        >
          <DialogHeader className="h-[5.6rem] px-space16 py-space12">
            {typeof header === 'string' ? (
              <Text className="text-lg md:text-xl font-bold">{header}</Text>
            ) : (
              header
            )}
          </DialogHeader>

          <div className="overflow-y-scroll max-h-[80vh]">{children}</div>
        </DialogContent>
      </DialogComponent>
    </>
  );
}

export const DialogFooter = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Footer
      className={`px-space16 py-space12 sticky -bottom-1 left-0 w-full border-t border-primary-20 dark:border-primary-80 dark:bg-primary-90 bg-white ${className}`}
    >
      {children}
    </Footer>
  );
};
