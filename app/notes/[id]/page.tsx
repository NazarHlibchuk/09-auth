// app/notes/[id]/page.tsx
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchNote } from "@/lib/api";
import NoteDetails from "./NoteDetails.client";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

//  Динамічна SEO-функція
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNote(id);

    if (!note) {
      return {
        title: "Нотатка не знайдена — NoteHub",
        description: "На жаль, цієї нотатки не існує або вона була видалена.",
        openGraph: {
          title: "Нотатка не знайдена — NoteHub",
          description: "Спробуйте знайти іншу нотатку у NoteHub.",
          url: `https://08-zustand-psi-jet.vercel.app/notes/${id}`,
          images: [
            {
              url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
              width: 1200,
              height: 630,
              alt: "NoteHub Not Found",
            },
          ],
        },
      };
    }

    return {
      title: `${note.title} | NoteHub`,
      description: note.content?.slice(0, 150) || "Перегляньте деталі цієї нотатки у NoteHub.",
      openGraph: {
        title: note.title,
        description: note.content?.slice(0, 150) || "Перегляньте цю нотатку у NoteHub.",
        url: `https://08-zustand-psi-jet.vercel.app/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub Note Details",
          },
        ],
        type: "article",
      },
    };
  } catch (error) {
    console.error("Помилка при генерації metadata:", error);
    return {
      title: "NoteHub — Помилка завантаження нотатки",
      description: "Сталася помилка при отриманні даних нотатки.",
    };
  }
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails noteId={id} />
    </HydrationBoundary>
  );
}
