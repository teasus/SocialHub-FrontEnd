export const uploadToCloudnary = async (pics) => {

    if (pics) {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "socialhub");
        data.append("cloud_name", "dwitpekbd");

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dwitpekbd/image/upload", {
                method: "post",
                body: data
            })

            const fileData = await res.json();

            return fileData.url.toString();
        } catch (error) {
            console.log("error uploading function ", error)
        }
    }

    else console.log("error uploading function");
}