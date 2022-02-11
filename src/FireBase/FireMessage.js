import Firebase from './FireBase';
export const SendMessage = async (currentUid, guesUid, message) => {
    console.log(currentUid);
    console.log(guesUid);
    console.log(message);
  try {
    return await Firebase.database()
      .ref('messages/' + currentUid)
      .child(guesUid)
      .push({
        currentUid: currentUid,
        guesUid: guesUid,
        message: message,
      });
  } catch (error) {
    return error;
  }
};
export const RecieveMessage = async (currentUid, guesUid, message) => {
    try {
      return await Firebase.database()
        .ref('messages/' + guesUid)
        .child(currentUid)
        .push({
          currentUid: currentUid,
          guesUid: guesUid,
          message: message,
        });
    } catch (error) {
      return error;
    }
  };
