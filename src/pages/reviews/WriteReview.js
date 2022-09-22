import React, { useState, useReducer, useEffect, useRef } from "react";
import {
  Header,
  Step1,
  Step3,
  StepIndicator,
  Step2,
  Step4,
  StepControl,
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
  Firestore,
} from "firebase/firestore";
import { useCallback } from "react";

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

// function calculateOverallRating(...ratings) {
//   let totalRating = 0;
//   ratings.forEach((rating) => {
//     totalRating += rating;
//   });
//   return totalRating / ratings.length;
// }

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
  // track the current step state
  const [currentStep, setCurrentStep] = useState(1);
  const [reviewSummary, dispatch] = useReducer(reviewReducer, initialState);

  const duplicateReview = useRef(false);

  const courseId = localStorage.getItem("courseId");
  const userId = localStorage.getItem("id");

  // current uni
  const current = JSON.parse(localStorage.getItem("currentUniversity"));

  const currentUniversity = useRef(current);
  const { imageUrl, name, nickname } = currentUniversity.current;

  const navigate = useNavigate();

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
  };

  const courseSummary = {
    courseRating: reviewSummary.courseRating,
    courseSummary: reviewSummary.courseSummary,
    course: reviewSummary.programme,
    year: reviewSummary.year,
    likes: 0,
    university: reviewSummary.university,
    nickname,
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

  useEffect(() => {
    checkUserUniAssociation();
  }, [checkUserUniAssociation]);

  // submit review function
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

      console.log("No such document!");
    }
  };

  // submit review function
  const createReview = async () => {
    // wait for all promises to resolve
    Promise.all([createCourseReview(), createUniReview()]).then(() => {
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
  console.log("test");

  return (
    <div>
      <Header title={name} image={imageUrl} />
      <section className="max-w-4xl mx-auto my-20">
        <div className=" flex gap-3 mb-5 text-xl">
          <ArrowLeftIcon className="w-6 " />{" "}
          <Link to="reviews">All reviews {name}</Link>
        </div>
        <StepIndicator steps={steps} currentStep={currentStep} />

        {SwitchStep()}

        <div className="w-1/2 mx-auto my-20">
          <StepControl
            handleStepChange={handleStepChange}
            currentStep={currentStep}
            steps={steps}
            test={createReview}
            reviewSummary={reviewSummary}
          />
        </div>
      </section>
    </div>
  );
};

export default WriteReview;
