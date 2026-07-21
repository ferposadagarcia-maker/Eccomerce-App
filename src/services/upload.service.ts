export const uploadImage = async (file: File): Promise<string> => {
    const presignedResponse = await fetch("/api/presign", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            filename: file.name,
            contentType: file.type,
        }),
    });
    if (!presignedResponse.ok) {
        throw new Error("No se pudo obtener la URL firmada");
    }

    const { url, publicUrl } = await presignedResponse.json();

    const uploadResponse = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
            "Content-Type": file.type,
        },
    });

    if (!uploadResponse.ok) {
        throw new Error("Error al subir el archivo a S3");
    }

    return publicUrl;
}
