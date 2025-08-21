interface SpecialistCardSkeletonProps {
  delay?: number;
}

function SpecialistCardSkeleton({ delay = 0 }: SpecialistCardSkeletonProps) {
  return (
    <div
      className="h-full w-full max-w-full grid 
    bg-alabaster rounded-2xl shadow-smoke
    px-5 py-[12px] xl:p-5 gap-x-[10px] gap-y-[12px] xl:gap-6
    [grid-template-areas:'photo_text'_'btn_btn']
    [grid-template-rows:96px_auto] xl:[grid-template-rows:auto]
    xl:[grid-template-areas:'photo text']
    [grid-template-columns:96px_minmax(0,1fr)]
    xl:[grid-template-columns:236px_minmax(0,1fr)]
    xl:max-w-[500px] max-h-[400px]"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Фото */}
      <div className="[grid-area:photo] max-w-[96px] h-[96px] xl:max-w-[236px] xl:h-[360px] rounded-2xl overflow-hidden bg-hot-cinnamon-500/20 animate-pulse"></div>

      {/* Контент */}
      <div className="[grid-area:text] flex flex-col h-full mb-[12px] xl:mb-[30px]">
        <div className="flex flex-col gap-[13px] xl:gap-[18px]">
          {/* Ім’я */}
          <div className="h-6 w-2/3 bg-hot-cinnamon-500/20 rounded-2xl animate-pulse"></div>
          {/* Рейтинг */}
          <div className="h-5 w-1/4 bg-hot-cinnamon-500/20 rounded-2xl animate-pulse"></div>
          {/* Досвід */}
          <div className="h-5 w-1/3 bg-hot-cinnamon-500/20 rounded-2xl animate-pulse"></div>
          {/* Біо */}
          <div className="hidden xl:block h-40 w-full bg-hot-cinnamon-500/20 rounded-2xl animate-pulse"></div>
        </div>
        {/* Кнопка десктоп */}
        <div className="hidden xl:block [grid-area:btn] max-w-[304px] w-full min-h-[40px] mt-auto xl:min-w-[200px] xl:h-[40px] rounded-2xl bg-hot-cinnamon-500/20 animate-pulse"></div>
      </div>
      {/* Кнопка мобілка */}
      <div className="xl:hidden [grid-area:btn] max-w-[304px] w-full min-h-[40px] mt-auto rounded-2xl bg-hot-cinnamon-500/20 animate-pulse"></div>
    </div>
  );
}

export default SpecialistCardSkeleton;
