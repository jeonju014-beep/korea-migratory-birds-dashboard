export default function LoadingCard({ message = '철새 데이터 불러오는 중...' }: { message?: string }) {
  return (
    <div className="cute-card flex flex-col items-center justify-center gap-2 p-10 text-blush-400">
      <div className="flex items-center gap-3">
        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-blush-200 border-t-blush-500" />
        <span>{message}</span>
      </div>
      <p className="text-xs text-blush-300">공공 API 여러 곳에서 데이터를 모으는 중이에요 (최초 10~20초)</p>
    </div>
  );
}
