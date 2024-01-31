import { CreditCard, DollarSign, Package } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Overview } from "@/app/_components/ecommerce/overview";
import { Heading } from "@/components/ui/heading";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getStockCount } from "@/actions/get-stock-count";
import { formatter } from "@/lib/utils";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
};

const DashboardPage: React.FC<DashboardPageProps> = async ({ 
  params
}) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">
                Total Revenue
              </h2>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="card-body">
              <div className="text-2xl font-bold">{formatter.format(totalRevenue)}</div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Sales</h2>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="card-body">
              <div className="text-2xl font-bold">+{salesCount}</div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Products In Stock</h2>
              <Package className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="card-body">
              <div className="text-2xl font-bold">{stockCount}</div>
            </div>
          </div>
        </div>
        <div className="card col-span-4">
          <div>
            <h2>Overview</h2>
          </div>
          <div className="card-body pl-2">
            <Overview data={graphRevenue} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;