export default function userGenerator(num, customTokens = []) {
     // STEP 1 USERTOKENS
  // create userToken array
  // specify amount of tokens
  const userTokens = Array.from(Array(num).keys());
  if (customTokens.length > 0) {
    for (token in customTokens) {
        userTokens.unshift(token)
    }
  }

  return userTokens;

  // more custom usertoken array builder
 // function generateRandomSet(num, min, max) {
  //     let randomNumbers = new Set();
  //     while (randomNumbers.size < num) {
  //       randomNumbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  //     }
  //     return Array.from(randomNumbers);
  //   }
}