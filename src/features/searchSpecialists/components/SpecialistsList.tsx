import { Specialist } from '@/features/searchSpecialists/types/specialist';
import SpecialistCard from '@/features/searchSpecialists/components/SpecialistCard';

type Props = {
  specialists: Specialist[];
};
const gridClasses =
  'grid grid-cols-1 justify-items-center gap-y-5 mb-5 xl:grid-cols-2 xl:gap-x-10 xl:gap-y-10 xl:mb-[58px]';
const SpecialistsList = ({ specialists }: Props) => {
  return (
    <div className={gridClasses}>
      {specialists.map(specialist => (
        <SpecialistCard key={specialist.id} specialist={specialist} />
      ))}
    </div>
  );
};

export default SpecialistsList;
