import { useEffect, useRef } from "react";
import { getDocs, query } from "firebase/firestore";

const useGetCollectionSize = (collectionRef) => {
  // collection size reference
  const collectionSize = useRef(0);

  useEffect(() => {
    const getCollectionSize = async () => {
      try {
        const querySnapshot = await getDocs(query(collectionRef));
        collectionSize.current = querySnapshot.size;
      } catch (error) {
        console.log(error);
      }
    };

    getCollectionSize();
  }, []);

  // returns specific collection size
  return collectionSize.current;
};

export default useGetCollectionSize;
