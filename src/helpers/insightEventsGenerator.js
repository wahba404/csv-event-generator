export default function insightEventsGenerator(
  userTokens,
  numEventsPerUser = 10,
  minDate,
  maxDate,
  objectIDs
) {
  // console.log("usertoens:", userTokens)
  // console.log("numevents:", numEventsPerUser)
  // console.log("minDate:", minDate)
  // console.log("maxDate:", maxDate)
  // console.log("objectIDs:", objectIDs)

  const eventDB = [];
  
  const eventTypes = [
    { eventName: "clicked Product", eventType: "click" },
    { eventName: "clicked Product", eventType: "click" },
    { eventName: "purchased Product", eventType: "conversion" },
    { eventName: "clicked Product", eventType: "click" },
    { eventName: "clicked Product", eventType: "click" },
    { eventName: "purchased Product", eventType: "conversion" },
  ];

  // Date helper

  // random date generator
  const generateRandomDate = (min, max) => {
    const random = getRandomDate(new Date(min), new Date(max));
    return random.toISOString();
  };
  // use getTime to apply math's random
  function getRandomDate(from, to) {
    const fromTime = from.getTime();
    const toTime = to.getTime();
    const randomTime = Math.floor(Math.random() * (toTime - fromTime + 1)) + fromTime;
  return new Date(randomTime);
}

  if (userTokens.length >= 1) {
    for (const userToken in userTokens) {
      for (let i = 0; i < numEventsPerUser; i++) {
        let objectID =
          objectIDs[Math.floor(Math.random() * objectIDs.length)]["objectID"];
        let event = eventTypes[Math.floor(Math.random() * 6)];
        let eventType = event["eventType"];
        let eventName = event["eventName"];

        eventDB.push({
          userToken: userToken,
          timestamp: generateRandomDate(minDate, maxDate),
          objectID,
          eventType,
          eventName,
        });
      }
    }
  } else {
    return "Error generating csv, please review params";
  }
  return eventDB;
}
