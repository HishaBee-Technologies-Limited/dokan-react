import { Link } from '@/navigation';
import Card from '@/components/common/Card';
import { Text } from '@/components/common/text';
import { cn } from '@/lib/utils';

type DueCard = {
  label: string;
  value: number;
  isSupplier?: boolean;
};

export default function DueCard({ isSupplier, value, label }: DueCard) {
  return (
    <Link className="w-full md:w-1/2" href="">
      <Card
        className={cn(
          isSupplier
            ? 'bg-[#E6FAE6] text-[#008000] font-semibold text-lg hover:bg-[#CCFFCC]'
            : 'bg-[#FAE6E6] text-[#800000] font-semibold text-lg hover:bg-[#FFCCCC]',
          `flex flex-col items-center justify-center py-4 px-6 rounded-xl  transition-colors duration-300  shadow`
        )}
      >
        <Text className="text-[#800000] font-semibold text-lg">{label}</Text>
        <Text className="text-[#800000] font-semibold text-lg">৳ {value}</Text>
      </Card>
    </Link>
  );
}
