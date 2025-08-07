import Timeline from "@/components/timeline/timeline"
import timelineItems from "@/data/timelineItems"

export default function Home() {
  return (
    <main className="max-w-6xl w-full mx-auto p-4 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Airtable Timeline Assignment</h1>
      <Timeline items={timelineItems} />
    </main>
  );
}
