import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from '@/lib/api/clientApi';

import NotePreview from "./NotePreview.client";


interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModal({ params }: PageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview noteId={id} />
    </HydrationBoundary>
  );
}
