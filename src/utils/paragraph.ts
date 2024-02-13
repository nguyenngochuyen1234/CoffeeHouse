export function sliceParagraph(inputText: string, maxSize: number) {
    // Kiểm tra độ dài của đoạn văn ban
    if (inputText.length <= maxSize) {
        return inputText; // Trả về toàn bộ đoạn văn nếu độ dài không vượt quá giới hạn
    } else {
        // Cắt đoạn văn bản theo độ dài mong muốn và thêm dấu elipsis (...)
        return inputText.substring(0, maxSize) + '...';
    }
}
