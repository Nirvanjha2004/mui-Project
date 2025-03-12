import CardComp from "@/components/DirectComp/CardComp"

function CardPage() {
  return (
    <div className="flex gap-8 justify-center items-center flex-wrap max-w-4xl">
        <CardComp title="Total Tests" description="2,543"/>
        <CardComp title="Active Users" description="1,892"/>
        <CardComp title="Total Referrals" description="2,543"/>
        <CardComp title="Avg Completion Time" description="24m 36s"/>
    </div>
  )
}

export default CardPage