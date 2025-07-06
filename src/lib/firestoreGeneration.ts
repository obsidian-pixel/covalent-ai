import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function saveGeneration({
  userId,
  prompt,
  result,
}: {
  userId: string;
  prompt: string;
  result: string;
}) {
  return addDoc(collection(db, "generations"), {
    userId,
    prompt,
    result,
    createdAt: serverTimestamp(),
  });
}
