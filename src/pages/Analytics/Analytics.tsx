import { useState, useEffect } from "react";
import TopCities from "../../components/ecommerce/TopCities";
import StatisticsChart from "../../components/ecommerce/PlatformActivity";
import UserFunnel from "../../components/ecommerce/UserFunnel";
import MonthlySalesChart from "../../components/ecommerce/UserGrowthChart";
import UserGrowthMini from "../../components/ecommerce/UserGrowthMini";
import { getFunnelCityAnalytics } from "../../api/dashboardapis";

const Analytics = () => {
  const [loading, setLoading] = useState(false);
  const [funnelData, setFunnelData] = useState<any>(undefined);
  const [citiesData, setCitiesData] = useState<any>(undefined);

  useEffect(() => {
    const fetchFunnelCity = async () => {
      setLoading(true);
      try {
        const res = await getFunnelCityAnalytics();
        if (res.success && res.data) {
          setFunnelData(res.data.funnel);
          setCitiesData(res.data.cities);
        }
      } catch (error) {
        console.error("Error loading funnel and city analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFunnelCity();
  }, []);

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
        <UserFunnel funnel={funnelData} loading={loading} />
      </div>

      <div className="col-span-12 lg:col-span-6 xl:col-span-6">
        <TopCities cities={citiesData} loading={loading} />
      </div>
    </div>
  );
};

export default Analytics;
