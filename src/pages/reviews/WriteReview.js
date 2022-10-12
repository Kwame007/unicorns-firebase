import React, {
  useState,
  useReducer,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  Header,
  Step1,
  Step3,
  StepIndicator,
  Step2,
  Step4,
  StepControl,
  Modal,
} from "../../components";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  collection,
  getDocs,
  increment,
  updateDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { calculateOverallRating } from "../../helpers/app";

// initial state
const initialState = {
  overallRating: 0,
  courseRating: 0,
  facultyRating: 0,
  facilityRating: 0,
  recommendationRating: 0,
  year: "",
  date: "",
  courseSummary: "",
  universitySummary: "",
  programme: "",
  university: "",
};

// reducer function
const reviewReducer = (state, action) => {
  switch (action.type) {
    case "COURSE_RATING":
      return { ...state, courseRating: action.payload };
    case "FACULTY_RATING":
      return { ...state, facultyRating: action.payload };
    case "FACILITY_RATING":
      return { ...state, facilityRating: action.payload };
    case "RECOMMENDATION_RATING":
      return { ...state, recommendationRating: action.payload };
    case "OVERALL_RATING":
      return { ...state, overallRating: action.payload };
    case "SET_YEAR":
      return { ...state, year: action.payload };
    case "SET_GRAD_YEAR":
      return { ...state, date: action.payload };
    case "SET_COURSE_SUMMARY":
      return { ...state, courseSummary: action.payload };
    case "SET_PROGRAMME":
      return { ...state, programme: action.payload };
    case "SET_UNIVERSITY":
      return { ...state, university: action.payload };
    case "SET_UNI_SUMMARY":
      return { ...state, universitySummary: action.payload };
    default:
      return state;
  }
};

// check if user already course review
const checkUserCourseAssociation = async (nickname, userId, ref) => {
  const querySnapshot = await getDocs(
    collection(db, "universities", nickname, "programmes")
  );
  let ID = [];
  querySnapshot.forEach((doc) => {
    ID.push(doc.id);
  });

  ID.forEach(async (id) => {
    const querySnapshot = await getDocs(
      collection(db, "universities", nickname, "programmes", id, "reviews")
    );

    querySnapshot.forEach((review) => {
      if (review.id === userId) {
        // set ref to true if user has already given a course review
        ref.current = true;
        return;
      }
    });
  });
};

const WriteReview = () => {
  // current uni
  const current = JSON.parse(localStorage.getItem("currentUniversity"));

  // track the current step state
  const [currentStep, setCurrentStep] = useState(1);
  const [isShowing, setIsShowing] = useState(false);
  const [reviewSummary, dispatch] = useReducer(reviewReducer, initialState);

  // duplicate review
  const duplicateReview = useRef(false);
  // current university
  const currentUniversity = useRef(current);

  // current course id
  const courseId = localStorage.getItem("courseId");
  // current user id
  const userId = localStorage.getItem("id");

  // current university
  const { imageUrl, name, nickname } = currentUniversity.current;

  const navigate = useNavigate();

  // university review summary
  const uniSummary = {
    overallRating: reviewSummary.overallRating,
    facultyRating: reviewSummary.facilityRating,
    facilityRating: reviewSummary.facilityRating,
    recommendationRating: reviewSummary.recommendationRating,
    year: reviewSummary.year,
    date: reviewSummary.date,
    universitySummary: reviewSummary.universitySummary,
    university: reviewSummary.university,
    courseRating: reviewSummary.courseRating,
    nickname,
    createdAt: serverTimestamp(),
    likes: 0,
    id: userId,
  };

  // course review summary
  const courseSummary = {
    courseRating: reviewSummary.courseRating,
    courseSummary: reviewSummary.courseSummary,
    course: reviewSummary.programme,
    year: reviewSummary.year,
    likes: 0,
    university: reviewSummary.university,
    nickname,
    id: userId,
    createdAt: serverTimestamp(),
  };

  // store in local storage
  const docId = localStorage.getItem("id");

  // check if user has already written a review for a university
  const checkUserUniAssociation = useCallback(async () => {
    const universityRef = collection(db, "universities");
    const reviewsSnap = await getDocs(universityRef);

    reviewsSnap.forEach((review) => {
      const reviewsRef = collection(db, "universities", review.id, "reviews");

      getDocs(reviewsRef).then((data) =>
        data.forEach((review) => {
          if (review.id === docId) {
            // matched uni name
            let nickName = review.data().nickname;

            // check matched uni with current uni
            if (nickName !== currentUniversity.current.nickname) {
              alert(
                `Sorry you can not write a review for this university.You already have a review with ${nickName}`
              );

              // redirect to reviews
              navigate("/reviews", { replace: true });
            }
          }
        })
      );
    });
  }, [docId, navigate]);

  // create university review function
  const createUniReview = async () => {
    // document reference
    const docRef = doc(db, "universities", nickname, "reviews", docId);
    const docSnap = await getDoc(docRef);

    // check if current user already have a university review with their current uni
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // Add a new document in collection "university reviews"
      await setDoc(
        doc(db, "universities", nickname, "reviews", docId),
        uniSummary
      );
    }
  };

  // create course review function
  const createCourseReview = async () => {
    // document reference
    const docRef = doc(
      db,
      "universities",
      nickname,
      "programmes",
      courseId,
      "reviews",
      docId
    );
    await checkUserCourseAssociation(nickname, userId, duplicateReview);

    const docSnap = await getDoc(docRef);

    if (duplicateReview.current) return;

    // check if course already exists (for the selected university)
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // Add a new document in collection course reviews
      await setDoc(docRef, courseSummary);
    }
  };

  // submit review function
  const createReview = async () => {
    // show feed back modal
    setIsShowing(true);
    // wait for all promises to resolve
    Promise.all([createCourseReview(), createUniReview()]).then(() => {
      // current university reference
      const currentUniversityRef = doc(db, "universities", nickname);

      // reference to university collection
      const currentUniversityReviewsRef = query(
        collection(db, "universities", nickname, "reviews")
      );

      // overall rating
      const overallRatings = [];

      // subscribe to sub-collection (reviews)
      const unsubscribe = onSnapshot(
        currentUniversityReviewsRef,
        (querySnapshot) => {
          querySnapshot.forEach((doc_1) => {
            // push overall ratings from each university into one array
            overallRatings.push(Number(doc_1.data().overallRating));
          });

          // if duplicate review prevent update
          if (!duplicateReview.current) {
            //  update total reviews & rating for current university
            updateDoc(currentUniversityRef, {
              totalReviews: increment(2),
              rating: calculateOverallRating(...overallRatings),
            });
          }
        }
      );

      setIsShowing(false);

      //  redirect to review page
      navigate(`/reviews/${nickname}`, { replace: true });
    });
  };

  // steps
  const steps = [
    "University & Course rating",
    "year info",
    "University & course review",
    "summary",
  ];

  // handle step change
  const handleStepChange = (direction) => {
    let nextStep = currentStep;

    // step direction
    direction === "next" ? nextStep++ : nextStep--;

    // check if next step is within boundaries
    nextStep > 0 && nextStep <= steps.length && setCurrentStep(nextStep);
  };

  // switch steps
  const SwitchStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            {...reviewSummary}
            dispatch={dispatch}
            name={name}
            nickname={nickname}
          />
        );
      case 2:
        return <Step2 {...reviewSummary} dispatch={dispatch} />;
      case 3:
        return <Step3 {...reviewSummary} dispatch={dispatch} />;
      case 4:
        return <Step4 {...reviewSummary} dispatch={dispatch} />;
    }
  };

  useEffect(() => {
    checkUserUniAssociation();
  }, [checkUserUniAssociation]);

  return (
    <div>
      <Header title={name} image={imageUrl} />
      <section className="max-w-4xl my-20 mx-3 md:mx-auto ">
        <div className=" flex gap-3 mb-5 text-xl hover:text-indigo-500 ">
          <ArrowLeftIcon className="w-6 " />{" "}
          <Link to={`/reviews/${nickname}`} className="text-lg">
            All reviews {name}
          </Link>
        </div>
        <StepIndicator steps={steps} currentStep={currentStep} />

        {SwitchStep()}

        <div className="w-full mx-auto my-20 md:w-1/2">
          <StepControl
            handleStepChange={handleStepChange}
            currentStep={currentStep}
            steps={steps}
            createReview={createReview}
            reviewSummary={reviewSummary}
          />
        </div>
      </section>

      <Modal isShowing={isShowing}>
        <div className="bg-white  fixed top-40 left-4 z-50 rounded-md w-11/12 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full md:top-1/2 md:left-1/3">
          <div className="h-36 text-center  mt-5">
            <div class="progress"></div>

            <p className="font-semibold text-lg text-indigo-500">
              Creating your review
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WriteReview;
