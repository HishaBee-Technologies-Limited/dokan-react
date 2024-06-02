import { Card, CardContent } from '@/components/ui/card';

export default function NoDataCard() {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <Card className="text-center max-w-sm">
        <CardContent className="p-8 space-y-4">
          <FileIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">No Data Available</h3>
            <p className="text-gray-500 dark:text-gray-400">
              It looks like there is no data to display at the moment. You can
              try by changing date
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FileIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}
