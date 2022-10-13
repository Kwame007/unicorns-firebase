import { RecentReviewsCard } from ".";
import ReviewPlaceHolder from "./ReviewsPlaceHolder";
import { useCheckMobileScreen } from "../hooks";

const RecentReviews = ({ review }) => {
  const isMobile = useCheckMobileScreen();

  return (
    <div className="container mx-auto mt-6 mb-6 p-5 ">
      <h2 className="text-2xl font-semibold text-center my-12  mb-10 text-gray-600 uppercase leading-normal  md:mb-20 md:text-4xl">
        Recent Reviews
      </h2>
      <div className="grid grid-cols-1 gap-8 justify-center items-center w-full hover:cursor-pointer md:grid-cols-3 ">
        {/* check if on mobile screen the shows only two reviews */}
        {isMobile
          ? review
              ?.slice(0, 2)
              .map((data) => <RecentReviewsCard review={data} key={data.id} />)
          : review
              ?.slice(0, 6)
              .map((data) => <RecentReviewsCard review={data} key={data.id} />)}

        {review.length === 0 &&
          // create an array with N number of elements
          // checks if on mobile screen the show just two placeholder
          Array.from(Array(isMobile ? 2 : 6).keys()).map((_, index) => (
            <ReviewPlaceHolder key={index} />
          ))}
      </div>
    </div>
  );
};

export default RecentReviews;
