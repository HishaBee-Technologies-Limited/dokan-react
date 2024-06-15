import { Text } from '@/components/common/text';

export default function PageCardInformation() {
  return (
    <div className="flex justify-between items-center">
      <Text variant="blue" className="font-medium text-lg">
        Description
      </Text>
      <Text variant="blue" className="font-medium text-lg">
        Total
      </Text>
    </div>
  );
}
