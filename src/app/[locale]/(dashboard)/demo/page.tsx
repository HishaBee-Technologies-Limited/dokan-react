'use client';
import Card from '@/components/common/Card';
import DatePicker from '@/components/common/DatePicker';
import { Dialog, DialogFooter } from '@/components/common/Dialog';
import { Drawer, DrawerFooter } from '@/components/common/Drawer';
import Tooltip from '@/components/common/Tooltip';
import { RadioGroupForm } from '@/components/common/forms/RadioGroupDemo';
import { Select } from '@/components/common/forms/Select';
import { PageSubTitle, PageTitle, Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useState } from 'react';

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

const DemoPage = () => {
  const [value, setValue] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  return (
    <div className="space-y-space24">
      <div className="flex gap-space24">
        <PageTitle title="Page Title" />
        <PageSubTitle title="Page Sub Title" />
        <Text title="primary" variant="primary" />
        <Text title="secondary" variant="secondary" />
        <Text title="muted" variant="muted" />
        <Text title="error" variant="error" />
        <Text title="success" variant="success" />
        <Text title="warning" variant="warning" />
      </div>

      <div className="flex gap-space24">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="transparent">Transparent</Button>
        <Button variant="danger">Danger</Button>

        <Tooltip trigger="Tooltip" triggerClass="ml-space24">
          <div>Tooltip Content</div>
        </Tooltip>
      </div>

      <div className="flex gap-space16">
        <Input
          className="max-w-[30rem]"
          type="text"
          placeholder="Example input .."
        />
        <div className="inline-flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <label htmlFor="airplane-mode">Switch</label>
        </div>
        <Select
          data={frameworks}
          onChange={(value) => setValue(value)}
          searchable
        />
        <DatePicker onChange={(date) => console.log(date)} />

        <Button variant="outline" onClick={() => setOpenDialog(!openDialog)}>
          {' '}
          Dialog Open
        </Button>
        <Dialog
          header="Modal"
          open={openDialog}
          onClose={(open) => setOpenDialog(open)}
        >
          <div className="px-space16 py-space12">
            <div className="min-h-[30rem]">
              Dialog Content
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas dolores, corporis nihil atque at accusantium sapiente
                iste quidem aliquid vitae placeat alias quasi praesentium
                eveniet nostrum repudiandae sit? Ratione, reiciendis? Ipsa
                blanditiis id, corrupti autem, quibusdam repudiandae perferendis
                harum fuga magni repellendus repellat non cum neque fugiat quo
                consectetur. Excepturi libero veritatis, exercitationem
                praesentium tempora recusandae voluptas reiciendis numquam quia
                vitae voluptatum iste blanditiis pariatur earum laborum est
                cupiditate nihil nostrum minima. Aspernatur cumque iusto animi
                eveniet. Laborum fugiat expedita maxime iste sapiente ipsam
                voluptatibus in! Incidunt saepe eveniet cupiditate deserunt
                inventore veniam, tempore vel fugit error? Magnam vitae vel
                laudantium omnis voluptate fugit, impedit odit dolore repellat
                voluptatum ad tempore excepturi mollitia cum enim sunt a
                voluptas ex quaerat? Asperiores obcaecati, earum, qui doloribus
                iusto autem rerum excepturi architecto dicta dolores corporis
                aperiam quos sed cupiditate. Exercitationem praesentium
                consequuntur nisi consectetur harum asperiores assumenda ex
                laudantium itaque sunt dolorem ipsum explicabo architecto
                distinctio et nobis incidunt minima rerum rem, ducimus impedit
                ut quos! Earum dolorum, laudantium fuga omnis iusto maxime
                deserunt ab officia voluptates voluptatum similique, architecto
                facere atque vitae porro id harum fugiat ipsam eos iure
                perferendis iste molestias commodi. Dolorem ex voluptatem
                dignissimos reprehenderit ad debitis consequatur, quo fuga
                veritatis blanditiis eos nesciunt ipsum perspiciatis excepturi
                enim odit? Tempore repudiandae rerum necessitatibus, facere
                commodi perferendis, id distinctio accusantium vel eveniet
                possimus, quasi excepturi pariatur veritatis ex. Doloremque
                ullam officia, corporis dignissimos veritatis eligendi
                accusantium aspernatur omnis! Voluptates, impedit magnam optio
                corporis enim nostrum illum eaque hic itaque laboriosam,
                recusandae, earum minima iusto neque iste rem ipsa. Perspiciatis
                suscipit sint perferendis cumque quo laboriosam vel quaerat
                maxime mollitia? Maxime tempora rem adipisci dolore blanditiis
                quis deleniti explicabo magni enim consequuntur. Ab consequatur
                a officia in? Perspiciatis fuga, hic tenetur placeat dolore
                dolores? Quam hic saepe voluptatem maiores voluptas voluptatibus
                est laboriosam alias temporibus illum, adipisci quas numquam,
                rerum ea at quae! Accusantium ducimus doloribus neque assumenda
                rerum non obcaecati officiis, ipsa vitae alias et in quaerat.
                Debitis fugit dolore laboriosam, quo aspernatur modi velit ut
                accusamus id odio esse magnam vitae eaque unde iusto itaque
                voluptates! Sequi
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDialog(!openDialog)}
            >
              {' '}
              Dialog Open
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpenDialog(!openDialog)}
            >
              {' '}
              Dialog Open
            </Button>
          </DialogFooter>
        </Dialog>

        <Button variant="outline" onClick={() => setOpen(!open)}>
          {' '}
          drawer Open
        </Button>
        <Drawer
          open={open}
          header="Demo Drawer"
          onClose={(open) => setOpen(open)}
        >
          <div className=" h-full">
            <DrawerFooter>
              <Button>Button</Button>
            </DrawerFooter>
          </div>
        </Drawer>
      </div>
      <div className="flex items-start gap-space32">
        <RadioGroupForm />
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <label htmlFor="option-one">RadioGroupItem One</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <label htmlFor="option-two">RadioGroupItem Two</label>
          </div>
        </RadioGroup>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      </div>

      <Card>Card</Card>

      <Tabs defaultValue="account">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default DemoPage;
