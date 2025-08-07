import Timeline from "@/components/timeline/timeline"
import timelineItems from "@/data/timelineItems"

export default function Home() {
  return (
    // #ccecfa
    <main className="container mx-auto p-4 bg-[#ccecfa] h-full">
      <h1 className="text-3xl font-bold mb-4">Airtable Timeline Assignment</h1>
      <Timeline items={timelineItems} />
    </main>
  );
}
