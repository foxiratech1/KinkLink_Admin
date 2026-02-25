import MonthlyTarget from "../../components/ecommerce/VerificationProgress";
import RecentOrders from "../../components/ecommerce/RecentAdminActions";
// import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import PhotoMetrics from "../../components/ecommerce/PhotoMetrics";

import SystemStatus from "../../components/ecommerce/SystemStatus";

export default function Home() {
  return (
    <>
      <PageMeta
        title="KinkLink Dashboard"
        description="Dashboard page for KinkLink, where you can monitor your photo sales and purchases."
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Row 1: Full-width metrics */}
        <div className="col-span-12">
          <PhotoMetrics />
        </div>

        {/* Row 2: Two equal-width cards */}
        {/* <div className="col-span-12 xl:col-span-8">
          <UserGrowthMini />
        </div> */}

        {/* <div className="col-span-12 xl:col-span-4">
          <UserFunnel />
        </div> */}

        {/* Row 3: Full-width StatisticsChart */}
        {/* <div className="col-span-12 xl:col-span-4">
          <TopCities />

        </div> */}

        {/* Row 4: Two cards side by side */}
        {/* <div className="col-span-12 xl:col-span-4">
          <EngagementMetrics />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <UserActivityChart />
        </div> */}

        <div className="col-span-12 xl:col-span-6">
          <MonthlyTarget />
        </div>
        {/* Row 5: Funnel + User Growth */}
        {/* <div className="col-span-12 xl:col-span-7">
          <MonthlySalesChart />
        </div> */}

        {/* <div className="col-span-12 lg:col-span-7">
          <StatisticsChart />
        </div> */}
        {/* <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div> */}
        {/* Row 6: Top Cities */}
        <div className="col-span-12 xl:col-span-6">
          <SystemStatus />
        </div>

        {/* Row 7: Engagement Metrics */}
        <div className="col-span-12">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
