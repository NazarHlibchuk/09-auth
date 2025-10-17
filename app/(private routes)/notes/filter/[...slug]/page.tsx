// app/notes/filter/[...slug]/page.tsx
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from '@/lib/api/clientApi';
import NotesPage from "./Notes.client";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

//  Генеруємо SEO мета-дані динамічно
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.join(" / ") || "усі нотатки";

  const title = `Нотатки — фільтр: ${filter} | NoteHub`;
  const description = `Перегляньте нотатки за фільтром "${filter}" у NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-psi-jet.vercel.app/notes/filter/${slug?.join("/") || ""}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub Filter Page",
        },
      ],
      type: "website",
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const tag = slug?.[0] || "All";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, "", 1], // tag, search, page
   queryFn: () => fetchNotes({ tag, page: 1 }), // обов'язково передаємо tag
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPage tag={tag} />
    </HydrationBoundary>
  );
}
