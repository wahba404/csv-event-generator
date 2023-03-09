import algoliasearch from "algoliasearch";

export default async function getObjectIDs(appID, apiKey, indexName) {
    // use algolia to build array of objectIDs

//   const appID = process.env.APP_ID;
  // ensure your API key has browse permission
//   const apiKey = process.env.API_KEY;
//   const indexName = process.env.INDEX_NAME;
  const client = algoliasearch(appID, apiKey);
  const index = client.initIndex(indexName);

  let objectIDs = [];
  // Get all records, only retrieve objectID
  await index.browseObjects({
    query: "",
    attributesToRetrieve: [],
    batch: (batch) => {
      objectIDs = objectIDs.concat(batch);
    },
  });

  if (objectIDs.length < 1){
    console.log("error buidling objectIDs")
  }
  
  return objectIDs;
}