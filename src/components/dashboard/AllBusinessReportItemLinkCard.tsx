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
      <Card className="flex flex-col items-center p-10 gap-5">
        <Image alt={label} src={imageURL} width={80} height={80} />
        <Text className="font-medium text-lg">{label}</Text>
      </Card>
    </Link>
  );
}
