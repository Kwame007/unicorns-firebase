// calculate overall rating
export function calculateOverallRating(...ratings) {
  let totalRating = 0;
  ratings.forEach((rating) => {
    totalRating += rating;
  });
  return totalRating / ratings.length;
}

// calculate average rating
export function averageRating(n) {
  const sum = [...n].reduce((prev, curr) => prev + curr);
  const avg = sum / [...n].length;
  if (!avg.isInteger && avg % 1 !== 0) {
    return avg.toFixed(1);
  } else {
    return avg;
  }
}
