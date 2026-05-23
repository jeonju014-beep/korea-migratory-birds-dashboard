export default function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-blush-200 bg-blush-50 px-4 py-3 text-sm text-blush-600">
      ⚠️ {message}
    </div>
  );
}
