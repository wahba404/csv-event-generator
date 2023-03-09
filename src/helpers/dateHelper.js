export default function dateHelper(minDate, maxDate) {

    // random date generator
    const generateRandomDate = (minDate, maxDate) => {
      const random = getRandomDate(new Date(minDate), new Date(maxDate));
      return random.toISOString();
    };
    // use getTime to apply math's random
    function getRandomDate(from, to) {
      const fromTime = from.getTime();
      const toTime = to.getTime();
      return new Date(fromTime + Math.random() * (toTime - fromTime));
    }
}
