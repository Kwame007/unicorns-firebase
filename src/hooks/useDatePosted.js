import React from "react";
import moment from "moment/moment";

const useDatePosted = (serverTime) => {
  // convert server timeStamp to milliseconds
  let epochTimestamp = serverTime?.createdAt.toMillis();
  // date posted
  const postedOn = moment(epochTimestamp).fromNow();
  return { postedOn };
};

export default useDatePosted;
