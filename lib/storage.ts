import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./firebase";




export const handleImageUpload = async (file: File) => {
    try {
        const storage = getStorage(app);
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
        const downloadUrl = await getDownloadURL(storageRef);
        return { success: true, downloadUrl };
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}