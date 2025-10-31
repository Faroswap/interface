export function SpecialBoostLoading() {
  return (
    <div className="bg-paper md:bg-main rounded-lg w-full md:w-[224px] h-[48px] flex items-center">
      <div className="animate-pulse bg-skeleton rounded-full w-6 h-6" />
      <div className="animate-pulse bg-skeleton rounded-full w-6 h-6 relative -left-[6px]" />
      <div className="animate-pulse bg-skeleton rounded-md w-[100px] h-5 ml-2" />
    </div>
  );
}
