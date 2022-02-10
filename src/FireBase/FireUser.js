// import { set } from "react-native-reanimated";
import Firebase from "./FireBase";
export const AddUser = async ( name , email ,image,uid)=>{
    try{
        return  await Firebase.database().ref('users/'+uid).
        set({
            name:name,
            email:email,
            image:image

        })

    }
    catch (error) {
        return error;
      }

}