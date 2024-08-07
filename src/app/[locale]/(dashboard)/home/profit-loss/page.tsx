import PageHeader from '@/components/dashboard/profit-loss/Header';
import OtherExpense from '@/components/dashboard/profit-loss/OtherExpense';
import OtherIncome from '@/components/dashboard/profit-loss/OtherIncome';
import PageCardInformation from '@/components/dashboard/profit-loss/PageCardInformation';
import ProfitFromSale from '@/components/dashboard/profit-loss/ProfitFromSell';
import TotalLoss from '@/components/dashboard/profit-loss/TotalLoss';

export default function ProfitLoss() {
  return (
    <div className="space-y-space16 h-full w-full">
      <PageHeader />
      <PageCardInformation />
      <ProfitFromSale />
      <OtherIncome />
      <OtherExpense />
      <TotalLoss />
    </div>
  );
}
