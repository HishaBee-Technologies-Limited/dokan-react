import React from 'react';
import Card from '@/components/common/Card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/common/Image';

const SocialLinks = () => {
  return (
    <div className="w-full space-y-space16">
      <Card className="p-space12 space-y-space12 pb-space32">
        <Text title="Your shop social media links" className="font-semibold" />

        <Text
          className="font-medium text-sm"
          variant="secondary"
          title="your customer can follow through social media"
        />

        <div className="flex gap-space16">
          <Image
            src="/images/social/facebook.svg"
            alt=""
            height={64}
            width={64}
          />
          <Image
            src="/images/social/instagram.svg"
            alt=""
            height={64}
            width={64}
          />
          <Image
            src="/images/social/youtube.svg"
            alt=""
            height={64}
            width={64}
          />
        </div>

        <div className="space-y-space6">
          <Label htmlFor="facebook" className="font-medium text-sm">
            Facebook
          </Label>
          <Input id="facebook" placeholder="http://facebook.com/pagelink" />
        </div>
        <div className="space-y-space6">
          <Label htmlFor="Instagram" className="font-medium text-sm">
            Instagram
          </Label>
          <Input id="Instagram" placeholder="https://instagram.com/abc" />
        </div>
        <div className="space-y-space6">
          <Label htmlFor="Youtube" className="font-medium text-sm">
            Youtube
          </Label>
          <Input id="Youtube" placeholder="https://youtube.com/abc" />
        </div>
      </Card>

      <div className="flex justify-end gap-space16">
        <Button variant={'secondary'}>Cancel</Button>
        <Button>Update</Button>
      </div>
    </div>
  );
};

export default SocialLinks;
