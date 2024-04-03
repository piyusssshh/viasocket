import { getDbdashData } from '@/pages/api'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotificationBar() {
    const [data, setData] = useState(null)
    useEffect(() => {
        getDbdashDataa()
    }, [])

    const getDbdashDataa = async () => {
        const dbdashData = await getDbdashData('tblgw6ag9')
        setData(dbdashData.data.rows)
    }
    if (data && data[0]?.details) {
        return (
            <div
                className="  p-2  w-full "
                style={{
                    backgroundColor: data[5]?.details,
                    color: data[6]?.details,
                }}
            >
                <div className="container flex flex-wrap items-center justify-center  ">
                    <Link
                        href={data[1]?.details && data[1]?.details}
                        target="_blank"
                        className=" text-white text-sm flex items-center flex-wrap gap-2"
                        aria-label="update"
                    >
                        <span
                            className="  text-xs rounded-full px-2 h-fit"
                            style={{
                                backgroundColor: data[3]?.details,
                                color: data[4]?.details,
                            }}
                        >
                            {data[2]?.details}
                        </span>
                        {data[0]?.details}{' '}
                        <div className="underline text-xs">Learn More</div>
                    </Link>
                </div>
            </div>
        )
    }
}
