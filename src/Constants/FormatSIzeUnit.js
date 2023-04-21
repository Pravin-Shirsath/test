export const formatSizeUnits = (bytes) => {
    if (bytes >= 1073741824) {
        bytes = (bytes / 1073741824).toFixed(2) + " GB";
    } else if (bytes >= 1048576) {
        bytes = (bytes / 1048576).toFixed(2) + " MB";
    } else if (bytes >= 1024) {
        bytes = (bytes / 1024).toFixed(2) + " KB";
    } else if (bytes > 1) {
        bytes = bytes + " bytes";
    } else if (bytes == 1) {
        bytes = bytes + " byte";
    } else {
        bytes = "0 bytes";
    }
    return bytes;
}


export const gbToBytes = (gb) => {
    return gb * 1024 * 1024 * 1024;
}


export const convertToGB = (sizeInBytes) => {
    const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
    return sizeInGB.toFixed(2);
}


/*To convert file sizes of different units to bytes, you can create a function that takes the size 
  and unit as inputs and returns the size in bytes. 
  Here's an example function that converts common file size units to bytes:*/

export const convertToBytes = (size, unit) => {
    const units = {
        'B': 1,
        'KB': 1024,
        'MB': 1024 * 1024,
        'GB': 1024 * 1024 * 1024,
        'TB': 1024 * 1024 * 1024 * 1024
    };

    const bytes = size * units[unit.toUpperCase()];
    return bytes;
}