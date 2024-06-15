import PageHeader from '@/components/profit-loss-report/PageHeader';
import PageCardInformation from '@/components/profit-loss-report/PageCardInformation';
import ProfitFromSale from '@/components/profit-loss-report/ProfitFromSale';
import OtherIncome from '@/components/profit-loss-report/OtherIncome';
import OtherExpense from '@/components/profit-loss-report/OtherExpense';
import TotalLoss from '@/components/profit-loss-report/TotalLoss';

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
