import StatsCard from "../../common/StatsCard";

export default function AboutStats() {
  return (
    <div className="w-full h-auto bg-white grid grid-cols-2 lg:grid-cols-4 px-2 lg:px-10 py-3 lg:py-8 gap-3 lg:gap-6 relative z-10">
      <div className="stat-card-item w-full"><StatsCard mainHeading="2009" subHeading="Established In" description="Since then, our excellence has made us a trusted name in copper manufacturing." /></div>
      <div className="stat-card-item w-full"><StatsCard mainHeading="20K+" subHeading="MT/Annum" description="Produces 20,000 metric tons of copper per year." /></div>
      <div className="stat-card-item w-full"><StatsCard mainHeading="150+" subHeading="Employees" description="With over 150 experienced employees, we deliver quality and reliability every day." /></div>
      <div className="stat-card-item w-full"><StatsCard mainHeading="50+" subHeading="Global sales" description="With a presence in 50+ countries, we serve clients on every continent." /></div>
    </div>
  );
}
