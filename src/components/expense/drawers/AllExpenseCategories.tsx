import React from 'react';
import { ExpenseEnum } from '@/enum/expense';
import { Text } from '@/components/common/text';
import { Button } from '@/components/ui/button';
import { DrawerFooter } from '@/components/common/Drawer';
import { useExpenseStore } from '@/stores/useExpenseStore';
import WrapperOddList from '@/components/common/WrapperOddList';
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  MoreVertIcon,
} from '@/components/common/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AllExpenseCategories = () => {
  const setExpenseDialog = useExpenseStore(
    (state) => state.setExpenseDialogState
  );

  return (
    <div>
      <div className="flex justify-between items-center gap-space12 flex-wrap py-space12 px-space6 border-b border-color mb-space16">
        <article className="spacey-space6">
          <Text
            title="Total Expense Categories"
            variant="secondary"
            className="font-medium"
          />
          <Text title="04" className="font-semibold text-xl" />
        </article>

        <div className="bg-green-300 h-8 w-20"></div>
      </div>

      <WrapperOddList className="space-y-space8">
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="border border-color rounded-md p-space12 flex items-center justify-between gap-space12"
            >
              <div className="flex items-center gap-space8">
                <div className="h-space24 w-space24 rounded-sm bg-primary-20"></div>
                <Text title="House Rent" className="text-sm font-medium" />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size={'icon'} variant={'transparent'}>
                    {' '}
                    <MoreVertIcon />{' '}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  side="bottom"
                  className="w-56 "
                >
                  <DropdownMenuItem asChild>
                    <Button
                      size={'sm'}
                      variant={'transparent'}
                      className="w-full justify-start"
                      onClick={() =>
                        setExpenseDialog({
                          open: true,
                          header: ExpenseEnum.EDIT_CATEGORY,
                        })
                      }
                    >
                      <EditIcon />
                      Edit
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button
                      size={'sm'}
                      variant={'transparent'}
                      className="w-full justify-start text-error-100"
                      onClick={() =>
                        setExpenseDialog({
                          open: true,
                          header: ExpenseEnum.DELETE_EXPENSE_CATEGORY,
                        })
                      }
                    >
                      <DeleteIcon />
                      Delete
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
      </WrapperOddList>

      <DrawerFooter>
        <Button
          className="w-full"
          onClick={() =>
            setExpenseDialog({
              open: true,
              header: ExpenseEnum.ADD_NEW_CATEGORY,
            })
          }
        >
          <AddIcon />
          নতুন ক্যাটাগরি
        </Button>
      </DrawerFooter>
    </div>
  );
};

export default AllExpenseCategories;
