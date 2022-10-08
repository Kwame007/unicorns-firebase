// calculate overall rating
export function calculateOverallRating(...ratings) {
  let totalRating = 0;
  ratings.forEach((rating) => {
    totalRating += rating;
  });
  return totalRating / ratings.length;
}
