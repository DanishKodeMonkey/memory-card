export async function fetchCatImages() {
    // randomly generate an array of 8 HTTP numbers
    const generateRandomStatusCodes = () => {
        const validStatusCodes = [
            100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208,
            214, 226, 300, 301, 302, 303, 304, 305, 307, 308, 400, 401, 402,
            403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415,
            416, 417, 418, 420, 421,
        ];
        const statusCodes = [];
        while (statusCodes.length < 8) {
            const code = Math.floor(Math.random() * 500 + 100); // range 100 to 500 number
            if (!statusCodes.includes(code)) {
                console.log('pushing ' + code + ' to array...');
                statusCodes.push(code);
            } else {
                console.log(code, ' already exists');
            }
        }
        return statusCodes;
    };
    const randomStatusCodes = generateRandomStatusCodes();
    const catImageURLs = randomStatusCodes.map(
        (code) => `https://http.cat/${code}`
    );

    return catImageURLs;
}
