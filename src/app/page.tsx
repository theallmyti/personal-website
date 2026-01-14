import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";

async function getProjects() {
  try {
    const res = await fetch("https://api.github.com/users/theallmyti/repos?sort=pushed&per_page=100", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="relative min-h-screen bg-[#121212]">
      <ScrollyCanvas />
      <Overlay />
      <Projects projects={projects} />
    </main>
  );
}
