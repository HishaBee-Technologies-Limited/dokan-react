'use client';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>
        {/* <Icon icon="material-symbols:progress-activity-sharp" className="animate-spin mr-2 w-0 group-hover:w-10 duration-300" /> */}
        {/* <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> */}
        Please wait
      </Button>
    </main>
  );
}
