import Card from '@/components/common/Card';
import { Image } from '@/components/common/Image';
import { Text } from '@/components/common/text';
import { Link } from '@/navigation';

type AllBusinessReportItemLinkCardType = {
  linkURL: string;
  imageURL: string;
  label: string;
};

export default function AllBusinessReportItemLinkCard({
  linkURL,
  imageURL,
  label,
}: AllBusinessReportItemLinkCardType) {
  return (
    <Link href={linkURL}>
      <Card className="flex flex-col items-center p-4 gap-1 shadow">
        <Image alt={label} src={imageURL} width={45} height={45} />
        <Text className="font-medium text-sm">{label}</Text>
      </Card>
    </Link>
  );
}
