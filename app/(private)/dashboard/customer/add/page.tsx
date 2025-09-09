import Card from "@/app/components/card";
import CustomerDetailsForm from "./customerDetailsForm";
import { Icon } from "@iconify/react";
import ContactForm from "./contactForm";
import LocationInformation from "./locationForm";
import FinancialInformation from "./financialForm";
import TransactionPromotion from "./transactionForm";
import AdditionalInformation from "./additionalInformationForm";
import FormButtons from "./formButton";

export default function AddCustomer() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Icon icon="mdi:arrow-left" width={24} className="cursor-pointer" />
        <h1 className="text-xl font-semibold">Add New Customer</h1>
      </div>

      {/* Customer Details Card */}
      <Card>
        <h2 className="text-lg font-semibold mb-6">Customer Details</h2>
        <CustomerDetailsForm />
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-6">Contact</h2>
        <ContactForm />
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-6">Location Information</h2>
        <LocationInformation />
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-6">Financial Information</h2>
        <FinancialInformation />
      </Card>

      <Card>
        <h2 className="text-lg font-semibold mb-6">Transaction Promotion</h2>
        <TransactionPromotion />
      </Card>

       <Card>
        <h2 className="text-lg font-semibold mb-6">Additional Information</h2>
        <AdditionalInformation />
      </Card>

      <FormButtons />
    </div>
  );
}
