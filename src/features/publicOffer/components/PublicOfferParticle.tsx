import { publicOfferData } from '../data';

const PublicOfferParticle = () => {
  return (
    <ul className="flex flex-col gap-5 text-justify">
      {publicOfferData.map((data, index) => {
        const { title, description, lists } = data;

        return (
          <li key={index}>
            <div className="mb-3 flex gap-4 items-center">
              <svg className="w-2.5 h-4 fill-fire">
                <use href="/icons.svg#icon-triangle"></use>
              </svg>
              <h2 className="text-base xl:text-lg leading-[119%] font-semibold">
                {title}
              </h2>
            </div>
            {description && (
              <p className="mb-2 text-sm xl:text-base leading-[136%]">
                {description}
              </p>
            )}

            {lists && (
              <ol className="space-y-1 text-sm xl:text-base leading-[136%]">
                {lists.map((item, index) => {
                  return (
                    <li key={index} className="flex flex-col">
                      <div className="flex gap-1">
                        <span className=" font-medium">{index + 1}.</span>
                        <p>{item.text}</p>
                      </div>

                      {item.subList && (
                        <ul className="pl-6">
                          {item.subList.map((subList, subIndex) => {
                            return (
                              <li key={subIndex} className="flex gap-1">
                                <span>&#183;</span>
                                <span>{subList}</span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ol>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default PublicOfferParticle;
