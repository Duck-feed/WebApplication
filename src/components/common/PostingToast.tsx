// components/common/PostingToast.tsx
export default function PostingToast({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-4 py-2 rounded-lg flex items-center shadow-lg z-50">
      <span className="mr-2 w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
      Posting...
    </div>
  );
}
