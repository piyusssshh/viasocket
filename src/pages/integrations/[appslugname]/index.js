import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MdAdd, MdChevronRight } from 'react-icons/md';
import IntegrationSearch from '@/components/integrations/integrationApps';
import ErrorComp from '@/components/404/404Comp';
import GetStarted from '@/components/getStarted/getStarted';
import { getDbdashData } from '@/pages/api';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { GetColorMode } from '@/utils/getColorMode';
import IntegrationHero from '@/components/integrations/integrationHero';
import FAQSection from '@/components/faqSection/faqSection';
import NoDataPluginComp from '@/components/noDataPluginComp/noDataPluginComp';
import IntegrationsComp from '@/components/integrationsComp/integrationsComp';
import axios from 'axios';
import BlogGrid from '@/components/blogGrid/blogGrid';

const IntegrationSlugPage = ({ getStartedData, combos, apps, pathArray, params, metaData, faqData }) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const tag = params.appslugname;
            const defaultTag = 'integrations';
            const res = await axios.get(`http://localhost:1111/api/fetch-posts?tag=${tag}&defaultTag=${defaultTag}`);
            const posts = await res.data;
            setPosts(posts);
        };
        fetchPosts();
    }, []);

    //defined states
    const [plugin, setPlugin] = useState();

    const cardsData = combos?.combinations;

    useEffect(() => {
        setPlugin(combos?.plugins?.[pathArray[2]]);
    }, [combos, pathArray[2]]);

    const uniqueCategories = [
        'All',
        'Engineering',
        'Productivity',
        'Marketing',
        'IT',
        'Support',
        'Website Builders',
        'Databases',
        'Social Media Accounts',
        'Communication',
        'Accounting',
        'Ads & Conversion',
        'AI Tools',
        'Analytics',
        'App Builder',
        'App Families',
        'Bookmark Managers',
        'Business Intelligence',
        'Calendar',
        'Call Tracking',
        'Website & App Building',
        'Commerce',
        'Communication',
        'Contact Management',
        'Content & Files',
        'CRM (Customer Relationship Management)',
        'Customer Appreciation',
        'Customer Support',
        'Dashboards',
        'Developer Tools',
        'Devices',
        'Documents',
        'Drip Emails',
        'eCommerce',
        'Education',
        'Email',
        'Email Newsletters',
        'Event Management',
        'Fax',
        'File Management & Storage',
        'Filters',
        'Fitness',
        'Forms & Surveys',
        'Fundraising',
        'Gaming',
        'Human Resources',
        'HR Talent & Recruitment',
        'Images & Design',
        'Internet of Things',
        'Proposal & Invoice Management',
        'IT Operations',
        'Online Courses',
        'Lifestyle & Entertainment',
        'Marketing Automation',
        'News & Lifestyle',
        'Notes',
        'Notifications',
        'Payment Processing',
        'Phone & SMS',
        'Printing',
        'Product Management',
        'Productivity',
        'Project Management',
        'Reviews',
        'Sales & CRM',
        'Scheduling & Booking',
        'Security & Identity Tools',
        'Server Monitoring',
        'Signatures',
        'Social Media Marketing',
        'Spreadsheets',
        'Support',
        'Taxes',
        'Team Chat',
        'Team Collaboration',
        'Time Tracking Software',
        'Task Management',
        'Transactional Email',
        'Transcription',
        'URL Shortener',
        'Video & Audio',
        'Video Conferencing',
        'Webinars',
    ];

    if (combos && !combos.error) {
        return (
            <>
                <MetaHeadComp
                    metaData={metaData}
                    page={'/integrations/AppOne'}
                    pathArray={pathArray}
                    plugin={[plugin]}
                />
                {plugin && (
                    <IntegrationsComp
                        combinationData={combos}
                        pluginData={[plugin]}
                        apps={apps}
                        pathArray={pathArray}
                    />
                )}

                {cardsData?.length > 0 && (
                    <div className="py-14 bg-white">
                        <div className="flex flex-col gap-9 container">
                            <h2 className="text-3xl">Actions and Triggers</h2>
                            {combos?.plugins?.[pathArray[2]]?.events.some((event) => event.type === 'trigger') && (
                                <div className="flex-col flex gap-3">
                                    <h3 className="text-xl font-semibold">Triggers</h3>
                                    <div className="grid gap-6 md:grid-cols-2 grid-cols-1">
                                        {combos?.plugins?.[pathArray[2]]?.events.map((event) => {
                                            if (event.type === 'trigger') {
                                                return (
                                                    <div className="flex gap-3 border border-gray-300 rounded-sm p-3 items-center">
                                                        <Image
                                                            width={24}
                                                            height={24}
                                                            className="w-auto h-[28px]"
                                                            src={
                                                                combos?.plugins?.[pathArray[2]]?.iconurl
                                                                    ? combos?.plugins?.[pathArray[2]]?.iconurl
                                                                    : 'https://placehold.co/40x40'
                                                            }
                                                            alt={combos?.plugins?.[pathArray[2]]?.name}
                                                        />

                                                        <div>
                                                            <h4 className="font-semibold">{event?.name}</h4>
                                                            <p>{event?.description}</p>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                </div>
                            )}
                            {combos?.plugins?.[pathArray[2]]?.events.some((event) => event?.type === 'action') && (
                                <div className="flex-col flex gap-3">
                                    <h3 className="text-xl font-semibold">Actions</h3>
                                    <div className="grid gap-6 md:grid-cols-2 grid-cols-1">
                                        {combos?.plugins?.[pathArray[2]]?.events.map((event) => {
                                            if (event.type === 'action') {
                                                return (
                                                    <div className="flex gap-3 border border-gray-300 rounded-sm p-3 items-center">
                                                        <Image
                                                            width={24}
                                                            height={24}
                                                            className="w-auto h-[28px]"
                                                            src={
                                                                combos?.plugins?.[pathArray[2]]?.iconurl
                                                                    ? combos?.plugins?.[pathArray[2]]?.iconurl
                                                                    : 'https://placehold.co/40x40'
                                                            }
                                                            alt={combos?.plugins?.[pathArray[2]]?.name}
                                                        />

                                                        <div>
                                                            <h4 className="font-semibold">{event?.name}</h4>
                                                            <p>{event?.description}</p>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {posts?.length && (
                    <div className="container mx-auto  py-12">
                        {' '}
                        <BlogGrid posts={posts} />
                    </div>
                )}
                {faqData && faqData.length > 0 && (
                    <div className="bg-white py-20 ">
                        <div className="container">
                            <FAQSection faqData={faqData} faqName={`[singleApp]`} />
                        </div>
                    </div>
                )}

                {/* abouttttt */}
                <div className="py-14">
                    <div className="flex lg:flex-row md:flex-row flex-col gap-10 container justify-between">
                        <div className="flex flex-1 flex-col justify-start gap-4">
                            <Image
                                src={plugin?.iconurl ? plugin?.iconurl : 'https://placehold.co/40x40'}
                                width={34}
                                height={34}
                                alt={combos?.plugins?.[pathArray[2]]?.name}
                            />
                            <h6 className="lg:text-[32px] md:text-2xl text-xl font-medium">
                                {`About ${combos?.plugins?.[pathArray[2]]?.name}`}
                            </h6>
                            <p className="md:text-xl text-base">{plugin?.description}</p>
                            <div>
                                <Link
                                    href={
                                        combos?.plugins?.[pathArray[2]]?.domain.startsWith('http')
                                            ? combos?.plugins?.[pathArray[2]]?.domain
                                            : 'http://' + combos?.plugins?.[pathArray[2]]?.domain
                                    }
                                    target="_blank"
                                >
                                    <button
                                        className="font-medium text-[#2D81F7] flex items-center"
                                        aria-label="load more apps"
                                    >
                                        Learn More
                                        <MdChevronRight fontSize={22} />
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col gap-4">
                            <Link href="/" aria-label="main link">
                                <Image src="/assets/brand/socket_fav_dark.svg" width={34} height={34} alt="viasocket" />
                            </Link>
                            <h6 className="lg:text-[32px] md:text-2xl text-xl font-medium">About viaSocket</h6>
                            <p className="md:text-xl text-base ">
                                viasocket is an innovative and versatile workflow automation platform designed to
                                streamline and simplify the integration of your favorite applications and tools.
                            </p>
                            <div>
                                <Link href="/" target="_blank">
                                    <button
                                        className="font-medium text-[#2D81F7] flex items-center"
                                        aria-label="load more apps"
                                    >
                                        Learn More
                                        <MdChevronRight fontSize={22} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ------------------------------------------------------------------------------------------------------ */}

                <div className=" py-14">
                    <div className="container">
                        {getStartedData && <GetStarted data={getStartedData} isHero={'false'} />}
                    </div>
                </div>

                {/* footer */}

                <div className=" py-10">
                    <div className="flex flex-row gap-4 justify-center items-center">
                        <h4 className="lg:text-[32px] md:text-xl text-lg font-semibold">Integrations run at</h4>
                        <Link href="/" aria-label="main page">
                            <Image
                                src="../../../assets/brand/socket_fav_dark.svg"
                                width={40}
                                height={40}
                                alt="viasocket"
                            />
                        </Link>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <MetaHeadComp
                    metaData={metaData}
                    page={'/integrations/AppOne'}
                    pathArray={pathArray}
                    plugin={[plugin]}
                />
                <ErrorComp pathArray={pathArray} />
            </>
        );
    }
};

export default IntegrationSlugPage;

export async function getServerSideProps(context) {
    const { params } = context;
    const pathArray = [params.appslugname];
    // Fetch data server-side here
    const combos = await fetchCombos(pathArray);
    const apps = await fetchApps('All', 25);

    const IDs = ['tbl2bk656', 'tblvgm05y', 'tblnoi7ng'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    return {
        props: {
            params,
            combos,
            apps,
            pathArray,
            metaData: results[0].data.rows,
            getStartedData: results[1].data.rows,
            faqData: results[2].data.rows,
        },
    };
}

async function fetchApps(selectedCategory, visibleItems) {
    const fetchUrl =
        selectedCategory && selectedCategory !== 'All'
            ? `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?category=${
                  selectedCategory && selectedCategory === 'Other' ? null : selectedCategory
              }&limit=200`
            : `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=200`;
    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
        },
    };

    const response = await fetch(fetchUrl, apiHeaders);
    const responseData = await response.json();
    return responseData;
}

async function fetchCombos(pathArray) {
    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
        },
    };
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/integrations?service=${pathArray[0]}`,
        apiHeaders
    );
    const responseData = await response.json();
    return responseData;
}
