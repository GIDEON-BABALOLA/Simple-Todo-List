
module.exports.myDate = function myDate(){
const today = new Date();
    const currentDay = today.getDay();
    const day = "";
    const options = {
        weekday : "long",
        // day : "numeric",
        // month : "long"
      //  year : "numeric"
    }
    return today.toLocaleDateString("en-US", options);
}
module.exports.myDay = function myDay(){
  const today = new Date();
  const currentDay = today.getDay();
  const day = "";
  const options = {
      weekday : "long",
     // day : "numeric",
     // month : "long"
    //  year : "numeric"
  }
  return today.toLocaleDateString("en-US", options);;
}
// module.exports.myDate = myDate;
// module.exports.myDay = myDay;
// Always know that a module is an object
