import { Link } from '@/navigation';
import Card from '@/components/common/Card';
import { Text } from '@/components/common/text';

type TotalDueCalculationItemCardLink = {
  label: string;
  value: number;
  isSupplier?: boolean;
};

export default function TotalDueCalculationItemCardLink({
  isSupplier,
  value,
  label,
}: TotalDueCalculationItemCardLink) {
  return (
    <Link className="w-1/2" href="">
      <Card
        className={`flex flex-col gap-1 items-center justify-center p-4 ${isSupplier ? '!bg-success-100' : '!bg-error-100'} `}
      >
        <Text variant="white">{label}</Text>
        <Text variant="white" className="font-medium">
          ৳ {value}
        </Text>
      </Card>
    </Link>
  );
}
