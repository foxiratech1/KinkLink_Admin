
import MonthlySalesChart from "../../components/ecommerce/UserGrowthChart";
import StatisticsChart from "../../components/ecommerce/PlatformActivity";
import MonthlyTarget from "../../components/ecommerce/VerificationProgress";
import RecentOrders from "../../components/ecommerce/RecentAdminActions";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import PhotoMetrics from "../../components/ecommerce/PhotoMetrics";

// export default function Home() {
//   return (
//     <>
//       <PageMeta
//         title="KinkLink Dashboard | Sell and Buy Your Photos"
//         description="Dashboard page for KinkLink, where you can monitor your photo sales and purchases."
//       />
//       <div className="grid gap-4 md:gap-6">
//         <div className="col-span-12 space-y-4 md:space-y-6">
//           <PhotoMetrics />
//         </div>

        

//         <div className="col-span-12 md:col-span-6 lg:col-span-4">
//           <MonthlyTarget />
//         </div>

//         <div className="col-span-12 md:col-span-6 lg:col-span-4">   

//           <MonthlySalesChart />
//         </div>

        

//         <div className="col-span-12">
//           <StatisticsChart />
//         </div>

//         <div className="col-span-12 xl:col-span-5">
//           <DemographicCard />
//         </div>

//         <div className="col-span-12 xl:col-span-7">
//           <RecentOrders />
//         </div>
//       </div>
//     </>
//   );
// }
export default function Home() {
  return (
    <>
      <PageMeta
        title="KinkLink Dashboard | Sell and Buy Your Photos"
        description="Dashboard page for KinkLink, where you can monitor your photo sales and purchases."
      />
      
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Row 1: Full-width metrics */}
        <div className="col-span-12">
          <PhotoMetrics />
        </div>

        {/* Row 2: Two equal-width cards */}
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <MonthlyTarget />
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <MonthlySalesChart />
        </div>

        {/* Row 3: Full-width StatisticsChart */}
        <div className="col-span-12">
          <StatisticsChart />
        </div>

        {/* Row 4: Two cards side by side */}
        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}