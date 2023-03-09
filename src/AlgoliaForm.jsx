import { useState } from "react";
import getObjectIDs from "./helpers/getObjectIDs";

export default function AlgoliaForm( {setObjectIDs} ) {
  const [appID, setAppID] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [indexName, setIndexName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!appID || !apiKey || !indexName) {
      setError("Please fill out all fields.");
      return;
    }

    // Do something with the form data, e.g. submit it to a server
    console.log({ appID, apiKey, indexName });
    getObjectIDs(appID, apiKey, indexName).then((result) => {
        // const objectIDs = result
        setObjectIDs(result)
    })

    // Clear the form fields and error indexName
    // setAppID("");
    setApiKey("");
    // setIndexName("");
    setError("");
  };

  return (
    <form className="max-w-md mx-auto">
          <p className="block text-gray-700 font-bold mb-2">
            Algolia Application Details
          </p>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="appID"
            type="text"
            placeholder="appID"
            value={appID}
            onChange={(event) => setAppID(event.target.value)}
          />
        </div>
        <div>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="apiKey"
            type="password"
            placeholder="apiKey"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
          />
        </div>
        <div>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="indexName"
            placeholder="indexName"
            value={indexName}
            onChange={(event) => setIndexName(event.target.value)}
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
