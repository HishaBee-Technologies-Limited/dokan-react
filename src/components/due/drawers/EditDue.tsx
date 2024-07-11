import { createDue } from '@/actions/due/createDue';
import { createDueItem } from '@/actions/due/createDueItem';
import { DrawerFooter } from '@/components/common/Drawer';
import { Button } from '@/components/ui/button';
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
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  amount: z.string().min(1, {
    message: 'this field is required.',
  }),
});
const EditDue = () => {
  console.log('s');
  const dueItem = useDueStore((state) => state.dueItem);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: String(dueItem?.amount),
    },
  });

  console.log(dueItem);
  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    const amount =
      Number(data.amount) > dueItem?.amount!
        ? dueItem?.due.due_amount! + (Number(data.amount) - dueItem?.amount!)
        : Number(data.amount);
    const payload = {
      // shop_id: Number(shop_id),
      amount: data.amount,
      unique_id: dueItem?.due.unique_id,
      due_left: data.amount,
      version: Number(dueItem?.due.version) + 1,
      updated_at: formatDate(DATE_FORMATS.default),
      created_at: dueItem?.due.created_at,
      message: '',
      contact_mobile: dueItem?.contact_mobile,
      contact_type: dueItem?.contact_type,
      contact_name: dueItem?.contact_name,
      // sms: data.sms ?? false,
      // purchase_unique_id: responseCreatePurchase.data.purchase.unique_id,
    };
    const dueRes = await createDue(payload);
    const payloadForDueItem = {
      amount: Number(data.amount),
      unique_id: dueItem?.unique_id,
      due_left: Number(data.amount),
      version: dueItem?.version! + 1,
      updated_at: formatDate(DATE_FORMATS.default),
      created_at: dueItem?.due.created_at,
      message: dueItem?.note,
      contact_mobile: dueItem?.contact_mobile,
      contact_type: dueItem?.contact_type,
      contact_name: dueItem?.contact_name,
      // sms: data.sms ?? false,
      due_unique_id: dueItem?.due.unique_id,
      // purchase_unique_id: responseCreatePurchase.data.purchase.unique_id,
    };

    const res = await createDueItem(payloadForDueItem);
    // router.refresh();
    // handleDrawerOpen({ open: false });
  }
  return (
    <div>
      <div>
        <h4>{dueItem?.contact_name}</h4>
        <h5>{dueItem?.contact_mobile}</h5>
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
            <Button type="submit" className="w-full">
              Save
            </Button>
          </DrawerFooter>
        </form>
      </Form>
    </div>
  );
};

export default EditDue;
