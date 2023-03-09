import Header from "./Header";
import Form from "./Form";
import AlgoliaForm from "./AlgoliaForm";
import insightEventsGenerator from "./helpers/insightEventsGenerator";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

let results;
export default function App() {
  // algolia retrieval
  const [objectIDs, setObjectIDs] = useState();
  const [success, setSuccess] = useState(false);
  const [resultsGenerated, setResultsGenerated] = useState(false);

  useEffect(() => {
    if (objectIDs && objectIDs.length > 1) {
      setSuccess(!success);
    }
  }, [objectIDs]);

  // Master form submit callback
  const handleFormSubmission = (
    userTokens,
    numEventsPerUser,
    minDate,
    maxDate
  ) => {
    console.log({ userTokens, numEventsPerUser, minDate, maxDate }, objectIDs);
    results = insightEventsGenerator(
      userTokens,
      numEventsPerUser,
      minDate,
      maxDate,
      objectIDs
    );
    console.log(results);

    if (results && results.length > 0) {
      setResultsGenerated(() => true);
    }
  };

  return (
    <div className="md:px-3 px-12 bg-lime-50 mb-48">
      <div className="flex justify-center w-screen">
        <Header />
      </div>
      <div className="flex justify-center mt-48 w-screen">
        <AlgoliaForm setObjectIDs={setObjectIDs} />
      </div>
      {success && (
        <div className="flex justify-center w-screen">
          <p>Successfully connected!</p>
        </div>
      )}
      <div className="flex justify-center mb-12 w-screen">
        <Form handleFormSubmission={handleFormSubmission} />
      </div>
      {resultsGenerated && (
        <div className="flex justify-center w-screen">
          <CSVLink
            data={results}
            filename={"GeneratedEvents.csv"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            target="_blank"
            onClick={() => {
              setResultsGenerated(() => false);
              results = null;
            }}
          >
            Download me
          </CSVLink>
        </div>
      )}
    </div>
  );
}
