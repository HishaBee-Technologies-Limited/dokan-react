import { createDue } from '@/actions/due/createDue';
import { createDueItem } from '@/actions/due/createDueItem';
import { DrawerFooter } from '@/components/common/Drawer';
import FallBackImage from '@/components/common/FallBackImage';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/common/text';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DATE_FORMATS } from '@/lib/constants/common';
import { formatDate } from '@/lib/utils';
import { useDueStore } from '@/stores/useDueStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  amount: z.string().min(1, {
    message: 'this field is required.',
  }),
});
const EditDue = () => {
  const dueItem = useDueStore((state) => state.dueItem);
  const handleDrawerOpen = useDueStore((state) => state.setDrawerState);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: String(Math.abs(dueItem?.amount!)),
    },
  });
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);

    const isSupplier = dueItem?.contact_type === 'SUPPLIER';
    const surplus = dueItem?.amount! - Number(data.amount);
    const dueAmount = isSupplier
      ? dueItem?.due.due_amount! - surplus
      : dueItem?.due.due_amount! + surplus;

    const payload = {
      amount: dueAmount,
      unique_id: dueItem?.due.unique_id,
      due_left: data.amount,
      version: Number(dueItem?.due.version) + 1,
      updated_at: formatDate(DATE_FORMATS.default),
      created_at: dueItem?.due.created_at,
      message: '',
      contact_mobile: dueItem?.contact_mobile,
      contact_type: dueItem?.contact_type,
      contact_name: dueItem?.contact_name,
    };

    await createDue(payload);

    const payloadForDueItem = {
      amount: isSupplier ? Number(data.amount) : -Number(data.amount),
      unique_id: dueItem?.unique_id,
      due_left: Number(data.amount),
      version: dueItem?.version! + 1,
      updated_at: formatDate(DATE_FORMATS.default),
      created_at: dueItem?.due.created_at,
      message: dueItem?.note,
      contact_mobile: dueItem?.contact_mobile,
      contact_type: dueItem?.contact_type,
      contact_name: dueItem?.contact_name,
      due_unique_id: dueItem?.due.unique_id,
    };

    await createDueItem(payloadForDueItem);
    router.refresh();
    setLoading(false);
    handleDrawerOpen({ open: false });
  }
  return (
    <div>
      <div className="flex items-center gap-space8 border-b border-color pb-space16">
        <FallBackImage
          src=""
          fallback={dueItem?.contact_name[0].toUpperCase() ?? 'FF'}
        />
        <article>
          <Text
            title={dueItem?.contact_name}
            className="!text-lg font-medium"
          />
          <Text title={dueItem?.contact_mobile} variant="muted" />
        </article>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-space12"
        >
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Amount <span className="text-error-100">*</span>{' '}
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DrawerFooter height="14rem" className="flex-col !gap-space12">
            <Button type="submit" disabled={loading} className="w-full">
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </DrawerFooter>
        </form>
      </Form>
    </div>
  );
};

export default EditDue;
