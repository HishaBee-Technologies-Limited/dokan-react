import React from "react";
import AddEmployee from "./AddEmployee";
import AddCustomer from "./AddCustomer";
import AddSupplier from "./AddSupplier";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

const AddNewMember = () => {
  return (
    <Tabs defaultValue="Customer">
      <TabsList className="grid grid-cols-3 mb-space16">
        <TabsTrigger value="Customer">Customer</TabsTrigger>
        <TabsTrigger value="Supplier">Supplier</TabsTrigger>
        <TabsTrigger value="Employee">Employee</TabsTrigger>
      </TabsList>

      <TabsContent value="Customer">
        <AddCustomer />
      </TabsContent>
      <TabsContent value="Supplier">
        <AddSupplier />
      </TabsContent>
      <TabsContent value="Employee">
        <AddEmployee />
      </TabsContent>
    </Tabs>
  );
};

export default AddNewMember;
