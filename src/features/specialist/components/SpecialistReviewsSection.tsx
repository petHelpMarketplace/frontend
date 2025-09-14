// import { useEffect, useRef, useState } from 'react';
import { ReviewsList } from './SpecialistReviewList';
import mockReviewsData from '../../../data/__mocks__/mockReviewsData';

function SpecialistReviewsSection() {
  return (
    <section className="section">
      <h2 className="text-center text-xl text-fire font-semibold uppercase mb-10">
        Відгуки
      </h2>
      <ReviewsList reviews={mockReviewsData} />
    </section>
  );
}

export default SpecialistReviewsSection;
