import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MdAdd, MdKeyboardArrowDown } from 'react-icons/md';

export default function IntegrationsApps({ pluginData, apps }) {
    const [searchTerm, setSearchTerm] = useState();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredApps, setFilteredApps] = useState([]);
    const [visibleItems, setVisibleItems] = useState(50);

    const applyFilters = () => {
        if (apps.length) {
            let filteredItems = apps.filter((item) => {
                const nameMatches = searchTerm ? item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) : true;
                const categoryMatches =
                    selectedCategory === 'All' || item.category === selectedCategory || !item.category;
                return nameMatches && categoryMatches;
            });
            setFilteredApps(filteredItems);
        }
    };

    const handleLoadMore = () => {
        setVisibleItems(visibleItems + 25);
    };

    const openChatWidget = () => {
        window.chatWidget.open();
    };

    useEffect(() => {
        applyFilters();
    }, [searchTerm, apps]);

    return (
        <>
            <div className="py-14">
                <div className="container flex  flex-col gap-8">
                    <h1 className="lg:text-3xl  text-2xl md:text-3xl font-semibold">Integrate with specific service</h1>
                    <div className="flex flex-col gap-9">
                        <div className="flex  gap-2 justify-center items-center bg-white border  py-4 px-6 rounded-md w-fit">
                            <Image
                                className="w-[26px] h-[26px]"
                                src={pluginData[0].iconurl || 'https://placehold.co/40x40'}
                                width={40}
                                height={40}
                                alt={pluginData[0].name}
                            />
                            <h6 className="text-2xl font-bold capitalize">{pluginData[0]?.name}</h6>
                        </div>
                        <div className="px-8">
                            <MdAdd fontSize={46} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-9 min-h-[380px] h-full">
                        <div className="lg:w-[500px] md:w-[400px] w-[250px]   ">
                            <label className="input border-[#CCCCCC] flex items-center gap-2 bg-white rounded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-4 h-4 opacity-70"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Search integrations"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="flex flex-row flex-wrap gap-5">
                            {filteredApps.length ? (
                                filteredApps.slice(0, visibleItems).map((app) => {
                                    console.log(app, 233);
                                    return (
                                        <>
                                            <a
                                                key={app?.rowid}
                                                href={
                                                    app?.appslugname
                                                        ? `/integrations${pluginData[0]?.appslugname ? '/' + pluginData[0]?.appslugname : ''}/${app?.appslugname}`
                                                        : `/noplugin`
                                                }
                                                target={pluginData[0]?.appslugname ? '_self' : '_blank'}
                                                rel="noopener noreferrer"
                                                aria-label="apps"
                                            >
                                                <div
                                                    className="flex flex-row justify-center items-center gap-2 px-5 py-3 rounded border border-[#CCCCCC] bg-white"
                                                    onClick={() => handleLocalStore(app?.name)}
                                                >
                                                    {app?.iconurl && (
                                                        <Image
                                                            src={app?.iconurl}
                                                            alt={app?.name}
                                                            height={23}
                                                            width={23}
                                                        />
                                                    )}

                                                    <span className="text-base font-medium">{app?.name}</span>
                                                </div>
                                            </a>
                                        </>
                                    );
                                })
                            ) : (
                                <div className="flex flex-col gap-4 max-w-[600px]">
                                    <p className="text-red-500 font-semibold text-xl">
                                        Can't find what you need? Let us know what you're looking for! We're always
                                        looking to expand our collection. Request an app here
                                    </p>
                                    <div>
                                        <button
                                            className="px-4 py-2 border border-[#CCCCCC] rounded"
                                            onClick={openChatWidget}
                                            aria-label="live chat"
                                        >
                                            Live Chat
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            {visibleItems < filteredApps.length && filteredApps.length && (
                                <button
                                    onClick={handleLoadMore}
                                    className="font-medium text-[#2D81F7] flex items-center"
                                    aria-label="load more apps"
                                >
                                    Load More
                                    <MdKeyboardArrowDown fontSize={22} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
