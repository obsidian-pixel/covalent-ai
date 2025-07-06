import { db } from "./firebase";
import { doc, deleteDoc } from "firebase/firestore";

export async function deleteUserFromFirestore(uid: string) {
  const userRef = doc(db, "users", uid);
  await deleteDoc(userRef);
}
