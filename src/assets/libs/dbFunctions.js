import axios from 'axios';

export async function getDataFromDBDash(params) {
    let results = [];
    for (let id of params) {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/getDataFromDB`,
            JSON.stringify({ table: id }),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const data = response.data;
            results.push(data);
        }
    }
    return results;
}
