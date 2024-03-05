import React from "react";
import { Text } from "../../common/text";
import { Button } from "../../ui/button";
import { DeleteIcon } from "../../common/icons";
import { DialogFooter } from "../../common/Dialog";
import { useProductStore } from "../../../stores/useProductStore";

export const DeleteProduct = () => {
  const handleClose = useProductStore((state) => state.setDialogState);

  return (
    <div className="relative">
      <article className="px-space16 py-space16 space-y-space16">
        <Text
          title="Are you sure you want to Delete this Product?"
          className="text-xl font-semibold"
        />
        <Text
          title="You will not able to save further Product"
          variant="secondary"
          className="text-lg"
        />
      </article>

      <DialogFooter className="flex justify-end gap-space16">
        <Button variant={"danger"} onClick={() => handleClose({ open: false })}>
          <DeleteIcon color="#fff" />
          Delete
        </Button>
      </DialogFooter>
    </div>
  );
};
