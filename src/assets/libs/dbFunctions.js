export async function getDataFromDBDash(params) {
    let results = [];
    for (let id of params) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getDataFromDB`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ table: id }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const data = await response.json();
            results.push(data);
        }
    }
    return results;
}
