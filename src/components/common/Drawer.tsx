import { Text } from './text';
import { useMediaQuery } from 'usehooks-ts';
import {
  Sheet,
  SheetFooter,
  SheetHeader,
  SheetContent,
} from '@/components/ui/sheet';

type IDrawerProps = {
  open: boolean;
  children: React.ReactNode;
  header: React.ReactNode | string;
  onClose: (open: boolean) => void;
};

export function Drawer({ children, header, onClose, open }: IDrawerProps) {
  const desktopView = useMediaQuery('(min-width: 768px)');
  const calcHeight = desktopView
    ? `calc(100vh - 5.6rem)`
    : `calc(100vh - 10rem)`;

  return (
    <>
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent
          side={desktopView ? 'right' : 'bottom'}
          className="dark:bg-primary-90 dark:border-none"
        >
          <SheetHeader>
            {typeof header === 'string' ? (
              <Text className="text-lg md:text-xl font-bold">{header}</Text>
            ) : (
              header
            )}
          </SheetHeader>

          <div
            style={{ height: calcHeight }}
            className="px-space16 py-space10 md:px-space32 md:py-space16 overflow-y-scroll"
          >
            {children}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export const DrawerFooter = ({
  children,
  height = '9.6rem',
  className = '',
}: {
  children: React.ReactNode;
  height?: string;
  className?: string;
}) => {
  return (
    <>
      <div style={{ height: height }}></div>
      <SheetFooter
        className={`absolute bottom-0 left-0 w-full px-space16 pb-space16 pt-space10 md:px-space32 md:pt-space16 md:pb-space24 border-t border-primary-20 dark:border-primary-80 background flex justify-end gap-space16 ${className}`}
      >
        {children}
      </SheetFooter>
    </>
  );
};
