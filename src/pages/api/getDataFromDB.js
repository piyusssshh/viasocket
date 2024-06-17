export default async function POST(req, res) {
    try {
        const data = await getDbdashData(req.body.table);
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'An error occurred' });
    }
}

//Functions
//
//getData from DB Dash table
const getDbdashData = async (tableName) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_DB_BASE_URL}/${process.env.NEXT_PUBLIC_DB_ID}/${tableName}`;
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'auth-key': `${process.env.NEXT_PUBLIC_DB_KEY}`,
            },
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error:', error);
    }
};
