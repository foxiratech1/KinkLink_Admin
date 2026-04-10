import TopCities from "../../components/ecommerce/TopCities";
import StatisticsChart from "../../components/ecommerce/PlatformActivity";
import UserFunnel from "../../components/ecommerce/UserFunnel";
import MonthlySalesChart from "../../components/ecommerce/UserGrowthChart";
import UserGrowthMini from "../../components/ecommerce/UserGrowthMini";

const Analytics = () => {
  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      <div className="col-span-12 lg:col-span-8 xl:col-span-9">
        <StatisticsChart />
      </div>

      <div className="col-span-12 lg:col-span-4 xl:col-span-3">
        <UserGrowthMini />
      </div>

      <div className="col-span-12 xl:col-span-12">
        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-6">
        <UserFunnel />
      </div>

      <div className="col-span-12 lg:col-span-6 xl:col-span-6">
        <TopCities />
      </div>
    </div>
  );
};

export default Analytics;
