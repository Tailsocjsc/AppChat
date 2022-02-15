import Firebase from './FireBase';
import moment from 'moment';
export const SendMessage = async (currentUid, guesUid, message) => {
  try {
    var todayDate = moment();
    return await Firebase.database()
      .ref('messages/' + currentUid)
      .child(guesUid)
      .push({
        messege: {
          currentUid: currentUid,
          guesUid: guesUid,
          message: message,
          date: todayDate.format('YYYY-MM-DD'),
          time: todayDate.format('hh:mm A'),
        },
      });
  } catch (error) {
    return error;
  }
};
export const RecieveMessage = async (currentUid, guesUid, message) => {
  try {
    var todayDate = moment();
    return await Firebase.database()
      .ref('messages/' + guesUid)
      .child(currentUid)
      .push({
        messege: {
          currentUid: currentUid,
          guesUid: guesUid,
          message: message,
          date: todayDate.format('YYYY-MM-DD'),
          time: todayDate.format('hh:mm A'),
        },
      });
  } catch (error) {
    return error;
  }
};
