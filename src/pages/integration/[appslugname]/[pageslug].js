import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MdOutlineArrowRightAlt,
  MdOutlineTaskAlt,
  MdOutlineAdsClick,
  MdAdd,
} from "react-icons/md";
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";


const IntegrationSlugPage = ({ combos, apps, pathArray }) => {
  console.log("🚀 ~ IntegrationSlugPage ~ combos:", combos)
  console.log("🚀 ~ IntegrationSlugPage ~ pathArray:", pathArray);
  //defined states
  const [pluginOne, setPluginOne] = useState();
  const [pluginTwo, setPluginTwo] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [visibleComboItems, setVisibleComboItems] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

  const cardsData = combos?.combinations;

  useEffect(() => {
    setPluginOne(combos?.plugins?.[pathArray[2]]);
    setPluginTwo(combos?.plugins?.[pathArray[3]]);
  }, [combos, pathArray[2]]);

  //fetch icons
  const getIconUrl = (pluginName) => {
    if (cardsData) {
      const plugin = combos?.plugins[pluginName];
      return plugin ? plugin.iconurl : null;
    }
  };

  const handleComboLoadMore = () => {
    setVisibleComboItems(visibleComboItems + 3);
  };

  //search functions
  const applyFilters = () => {
    let filteredItems = apps.filter(
      (item) =>
        item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredData(filteredItems);
  };

  useEffect(() => {
    applyFilters();
  }, [apps, searchTerm]);

  const handleLocalStore = (appName) => {
    localStorage.setItem("selectedAppName", appName);
  };

  //find actions and trigers
  const actionEvents = [];
  const triggerEvent = [];
  if (pathArray.length > 2) {
    [pathArray[2], pathArray[3]].forEach((path) => {
      if (combos?.plugins?.[path]?.events) {
        combos.plugins[path].events.forEach((event) => {
          if (event.type === "action") {
            actionEvents.push(event);
          } else if (event.type === "trigger") {
            triggerEvent.push(event);
          }
        });
      }
    });
  }

  // trigger cardshovered state
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  // Action cards selected and hovered state
  const [hoveredActionCardIndex, setHoveredActionCardIndex] = useState(null);
  const [selectedActionCardIndex, setSelectedActionCardIndex] = useState(null);

  const [selectedTrigger, setSelectedTrigger] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [showFixedSection, setShowFixedSection] = useState(true);

  const [selectedTriggerImage, setSelectedTriggerImage] = useState(null);
  const [selectedActionImage, setSelectedActionImage] = useState(null);

  const [cnt, setCnt] = useState(0);
  const handleCancelClick = () => {
    setShowFixedSection(false);
    setSelectedTrigger(null);
    setSelectedAction(null);
    setShowFixedSection(false);
    setSelectedCardIndex(null);
    setSelectedActionCardIndex(null);
  };

  const handleCardClick = (index) => {
    setSelectedCardIndex(index === selectedCardIndex ? null : index);
    setSelectedTrigger(index);
    setShowFixedSection(true);
    setSelectedTriggerImage(
      index !== null
        ? combos?.plugins[triggerEvent[index].pluginslugname]?.iconurl
        : null
    );
  };
  const handleActionCardClick = (index) => {
    setSelectedActionCardIndex(
      index === selectedActionCardIndex ? null : index
    );
    setSelectedAction(index);
    setShowFixedSection(true);
    setSelectedActionImage(
      index !== null
        ? combos?.plugins[actionEvents[index].pluginslugname]?.iconurl
        : null
    );
  };

  useEffect(() => {
    setCnt(
      selectedCardIndex !== null && selectedActionCardIndex !== null ? 2 : 1
    );
  }, [selectedCardIndex, selectedActionCardIndex]);

  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [searchDropdownTerm, setSearchDropdownTerm] = useState("");
  const handleAppClick = (app) => {
    handleLocalStore(app?.name);
    setSelectedApp(app);
    setCategoryDropdownOpen(false);
    setSearchDropdownTerm("");
  };

  const filteredDropdownData = useMemo(() => {
    return filteredData
      .filter(
        (item) =>
          item.name &&
          item.name.toLowerCase().includes(searchDropdownTerm.toLowerCase())
      )
      .slice(0, 11);
  }, [filteredData, searchDropdownTerm]);

  const getEventDescription = (eventId) => {
    const plugins = combos?.plugins;
    for (const pluginName in plugins) {
      const events = plugins[pluginName]?.events;
      if (events) {
        const event = events.find((e) => e.rowid === eventId);
        if (event) {
          return event.description;
        }
      }
    }
    return null;
  };

  return (
    <div>
      {/* nav start */}
      <div className='bg-[#00A68B] pt-6'>
        <div className='flex flex-row justify-start gap-3 items-center container bg-[#f5f5f5] py-4 px-6 rounded-lg'>
          <Link
            href={`/integration/${encodeURIComponent(pluginOne?.name)
              .replace(/\s/g, "-")
              ?.toLowerCase()}`}
          >
            <div className='flex gap-1 items-center'>
              <Image
                className='w-[26px] h-[26px]'
                src={
                  pluginOne?.iconurl
                    ? pluginOne?.iconurl
                    : "https://placehold.co/40x40"
                }
                width={40}
                height={40}
              />
              <h6 className='md:text-2xl text-base font-bold capitalize'>
                {pluginOne?.name}
              </h6>
            </div>
          </Link>
          <span className='text-2xl font-bold'>+</span>

          <div className='flex items-center gap-1 '>
            <div className='flex items-center gap-1'>
              <div className='dropdown bg-[#F5F5F5]  items-center rounded'>
                <div
                  tabIndex={0}
                  role='button'
                  className='flex gap-1 bg-[#F5F5F5] border px-4 py-2 rounded border-[#CCCCCC]'
                  onClick={() =>
                    setCategoryDropdownOpen(!isCategoryDropdownOpen)
                  }
                >
                  <Image
                    className='w-[26px] h-[26px]'
                    src={
                      pluginTwo?.iconurl
                        ? pluginTwo?.iconurl
                        : "https://placehold.co/40x40"
                    }
                    width={40}
                    height={40}
                  />
                  <h6 className='md:text-2xl text-base font-bold capitalize'>
                    {pluginTwo?.name}
                  </h6>
                </div>
                {isCategoryDropdownOpen && (
                  <div
                    tabIndex={0}
                    className='dropdown-content md:w-[500px] gap-4 z-[1]  p-2 shadow bg-base-100 rounded '
                  >
                    <div className='flex flex-row'>
                      <div className='flex flex-col gap-4  h-full'>
                        <div className='flex items-center border-b border-[#CCCCCC] mb-2'>
                          <input
                            type='text'
                            placeholder='Search...'
                            value={searchDropdownTerm}
                            onChange={(e) =>
                              setSearchDropdownTerm(e.target.value)
                            }
                            className='p-2  rounded w-full focus:outline-none focus:border-blue-500'
                          />
                        </div>
                        <div className='flex md:flex-row flex-col flex-wrap gap-2'>
                          {filteredDropdownData.length > 0 ? (
                            filteredDropdownData
                              .filter((app) => app.name !== pluginOne?.name)
                              .map((app) => (
                                <a
                                  key={app?.rowid}
                                  href={
                                    app?.slugname
                                      ? app?.slugname
                                      : `/integration/${(
                                          integrationSlug || ""
                                        ).toLowerCase()}/${app?.name
                                          ?.replace(/\s/g, "-")
                                          ?.toLowerCase()}`
                                  }
                                >
                                  <div
                                    className='flex flex-row justify-center items-center gap-2 px-5 py-3 rounded border border-[#CCCCCC] bg-white'
                                    onClick={() => handleAppClick(app)}
                                  >
                                    {app?.iconurl && (
                                      <Image
                                        src={app?.iconurl}
                                        alt={app?.name}
                                        height={23}
                                        width={23}
                                      />
                                    )}

                                    <h5 className='md:text-base text-sm font-medium'>
                                      {app?.name}
                                    </h5>
                                  </div>
                                </a>
                              ))
                          ) : (
                            <p className='text-sm text-gray-500 p-2'>
                              No results found.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero section start */}
      <div className='bg-[#00A68B] pt-14'>
        <div className='flex container'>
          <h1 className='lg:text-6xl md:text-4xl text-2xl text-white font-bold pb-8'>
            Create integrations between {pluginOne?.name} and {pluginTwo?.name}.
          </h1>
        </div>
      </div>

      {/* Display cards */}
      <div className='bg-[#00A68B] pb-14'>
        <div className='container grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center md:justify-start gap-10 py-10'>
          {cardsData?.length > 0 &&
            cardsData.slice(0, visibleComboItems).map((card, index) => {
              const triggerDescription = getEventDescription(card.trigger.id);
              const actionDescriptions = card.action.map((action) =>
                getEventDescription(action.id)
              );
              const combinedDescription = ` ${actionDescriptions.join(
                " and "
              )} when ${triggerDescription} `;
              return (
                <div
                  key={index}
                  className='card rounded-lg bg-white border relative '
                >
                  <div className='flex flex-col justify-between gap-4 '>
                    <div className='flex flex-row justify-between items-center pt-6 px-6 '>
                      <div className='flex gap-2'>
                        {getIconUrl(card?.trigger?.name) && (
                          <Image
                            src={getIconUrl(card?.trigger?.name)}
                            width={26}
                            height={26}
                            alt={card?.trigger?.name}
                          />
                        )}

                        {card?.action?.map((action, actionIndex) => (
                          <Image
                            key={actionIndex}
                            alt={action?.name}
                            src={getIconUrl(action.name)}
                            width={26}
                            height={26}
                          />
                        ))}
                      </div>
                      {/* <div className='flex gap-4 items-center'>
                        <p className='text-base'>Details</p>
                      </div> */}
                    </div>
                    <div className='flex px-6 mb-4 pb-6 '>
                      <p className='md:text-xl text-lg font-medium'>
                        {combinedDescription}
                      </p>
                    </div>
                  </div>
                  <div className='flex justify-end items-center gap-2 py-4 px-6 bg-[#E6E6E6] rounded-bl-lg rounded-br-lg mt-auto cursor-pointer'>
                    <p className='text-base font-medium'> Try it</p>
                    <MdOutlineArrowRightAlt size={25} />
                  </div>
                </div>
              );
            })}
        </div>
        <div className='flex flex-row justify-center items-center'>
          {visibleComboItems < cardsData?.length && (
            <button
              onClick={handleComboLoadMore}
              className='border border-white px-4 py-2 rounded-md text-white text-base'
            >
              Load More
            </button>
          )}
        </div>
      </div>

      {/* trigger and action  section implement */}
      <div className='bg-[#F5F5F5]'>
        {triggerEvent.length > 2 && actionEvents.length > 2 && (
          <>
            <div className='container  py-14'>
              <h1 className='flex justify-center lg:text-[40px] text-3xl md:text-3xl font-semibold'>
                Automate anything with {pluginOne?.name} & {pluginTwo?.name}{" "}
                Integrations!
              </h1>

              <div className='grid md:grid-cols-2 grid-cols-1 py-10 gap-10'>
                {/* trigger */}
                <div className='flex flex-col gap-6'>
                  <div className='flex items-center gap-4'>
                    <MdOutlineAdsClick size={24} />
                    <h5 className='lg:text-3xl md:text-2xl text-xl font-bold '>
                      When this happens
                    </h5>
                    <p className='text-sm text-red-600 bg-red-200 px-3 py-1 rounded-full font-normal'>
                      Triggers
                    </p>
                  </div>
                  {triggerEvent.length > 0 &&
                    triggerEvent.map((card, index) => (
                      <div
                        key={index}
                        className={`flex gap-6 justify-between items-center bg-white px-6 py-4 border border-[#CCCCCC] rounded-lg cursor-pointer relative ${
                          selectedCardIndex === index ? "selected-card" : ""
                        }`}
                        onClick={() => {
                          if (selectedCardIndex === index) {
                            handleCardClick(null);
                            setCnt(cnt - 1);
                          } else {
                            handleCardClick(index);
                            setCnt(cnt + 1);
                          }
                        }}
                        onMouseEnter={() => setHoveredCardIndex(index)}
                        onMouseLeave={() => setHoveredCardIndex(null)}
                      >
                        <div className='flex flex-1 flex-row items-center gap-6'>
                          <Image
                            src={
                              combos?.plugins[card?.pluginslugname]?.iconurl
                                ? combos?.plugins[card?.pluginslugname]?.iconurl
                                : "https://placehold.co/40x40"
                            }
                            width={38}
                            height={38}
                            className='w-[38px] h-[38px]'
                            alt={combos?.plugins[card?.pluginslugname]}
                          />
                          <div className='flex flex-col gap-2'>
                            <h6 className='md:text-xl text-lg font-semibold '>
                              {card?.name}
                            </h6>
                            <p className='md:text-xl text-lg font-normal '>
                              {card?.description}
                            </p>
                          </div>
                        </div>
                        <div className='w-[10px]'>
                          {selectedCardIndex === index ? (
                            <FaCheckCircle
                              className='text-[#1A73E8]'
                              size={20}
                            />
                          ) : (
                            hoveredCardIndex === index && (
                              <FaRegCheckCircle size={20} />
                            )
                          )}
                        </div>
                      </div>
                    ))}
                </div>

                {/* action */}
                <div className='flex flex-col gap-6'>
                  <div className='flex items-center gap-4'>
                    <MdOutlineTaskAlt size={24} />
                    <h5 className='lg:text-3xl md:text-2xl text-xl font-bold '>
                      Do this
                    </h5>
                    <p className='text-sm text-blue-600 bg-blue-200 px-3 py-1 rounded-full font-normal'>
                      Actions
                    </p>
                  </div>
                  {actionEvents.length > 0 &&
                    actionEvents.map((card, i) => (
                      <div
                        key={i}
                        className={`flex gap-6 justify-between items-center bg-white px-6 py-4 border border-[#CCCCCC] rounded-lg cursor-pointer relative ${
                          selectedActionCardIndex === i ? "selected-card" : ""
                        }`}
                        onClick={() => {
                          if (selectedActionCardIndex === i) {
                            handleActionCardClick(null);
                            setCnt(cnt - 1);
                          } else {
                            handleActionCardClick(i);
                            setCnt(cnt + 1);
                          }
                        }}
                        onMouseEnter={() => setHoveredActionCardIndex(i)}
                        onMouseLeave={() => setHoveredActionCardIndex(null)}
                      >
                        <div className='flex flex-row items-center gap-6'>
                          <Image
                            src={
                              combos?.plugins[card?.pluginslugname]?.iconurl
                                ? combos?.plugins[card?.pluginslugname]?.iconurl
                                : "https://placehold.co/40x40"
                            }
                            width={38}
                            height={38}
                            className='w-[38px] h-[38px]'
                            alt={combos?.plugins[card?.pluginslugname]}
                          />
                          <div className='flex flex-col gap-2'>
                            <h6 className='md:text-xl text-lg font-semibold '>
                              {card?.name}
                            </h6>
                            <p className='md:text-xl text-lg font-normal '>
                              {card?.description}
                            </p>
                          </div>
                        </div>
                        <div className=' w-[10px] '>
                          {selectedActionCardIndex === i ? (
                            <FaCheckCircle
                              className='text-[#1A73E8] '
                              size={20}
                            />
                          ) : (
                            hoveredActionCardIndex === i && (
                              <FaRegCheckCircle size={20} />
                            )
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {(selectedTrigger !== null || selectedAction !== null) &&
        cnt >= 1 &&
        showFixedSection && (
          <div
            className={`bg-white ${
              cnt < 1 ? "hidden" : "fixed"
            } bottom-0 w-[100%] z-30`}
          >
            <div className='container flex flex-wrap lg:justify-between gap-6 items-center py-4 '>
              <div className='flex flex-row flex-wrap items-center gap-4'>
                <div className='flex flex-row gap-4 bg-white border px-5 py-2 rounded-lg w-[400px] items-center'>
                  {selectedTrigger !== null ? (
                    <>
                      <Image
                        src={selectedTriggerImage}
                        alt='alt'
                        height={30}
                        width={30}
                        className='h-[30px] w-[30px]'
                      />
                      <h1 className='lg:text-xl md:text-lg text-base font-semibold'>
                        {triggerEvent[selectedTrigger]?.name}
                      </h1>
                    </>
                  ) : (
                    <p className='text-xl font-semibold text-[#808080]'>
                      Select Trigger
                    </p>
                  )}
                </div>

                <div className='lg:text-xl text-lg '>
                  <MdAdd size={20} />
                </div>

                <div className='flex flex-row items-center gap-4 bg-white border px-5 py-2 rounded-lg w-[400px]'>
                  {selectedAction !== null ? (
                    <>
                      <Image
                        src={selectedActionImage}
                        alt='alt'
                        height={30}
                        width={30}
                        className='h-[30px] w-[30px]'
                      />
                      <h1 className='lg:text-xl md:text-lg text-base font-semibold'>
                        {actionEvents[selectedAction]?.name}
                      </h1>
                    </>
                  ) : (
                    <p className='lg:text-xl md:text-lg text-base font-semibold text-[#808080]'>
                      Select Action
                    </p>
                  )}
                </div>
              </div>

              <div className='flex flex-row gap-3'>
                <div>
                  <button
                    className='btn md:btn-md btn-sm lg:text-base bg-black text-white p-2 rounded'
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <button
                    className='btn md:btn-md btn-sm lg:text-base bg-black text-white p-2 rounded'
                    disabled={cnt !== 2}
                  >
                    Try it now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* search section implement
      <IntegrationSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        renderFilterOptions={renderFilterOptions}
        isCategoryDropdownOpen={isCategoryDropdownOpen}
        handleCategoryClick={handleCategoryClick}
        selectedCategory={selectedCategory}
        handleCategoryItemClick={handleCategoryItemClick}
        filteredData={filteredData}
        integrationSlug={integrationSlug}
        handleLocalStore={handleLocalStore}
        visibleItems={visibleItems}
        apps={apps}
        handleLoadMore={handleLoadMore}
      /> */}

      {/* blogg section starts here */}
      <div className='bg-[#F5F5F5] py-10 hidden'>
        {/* heading */}
        <div className='flex flex-col gap-6 justify-center items-center container'>
          <h1 className='lg:text-4xl md:text-3xl text-2xl  font-semibold'>
            Blogs to help you automate things using Interakt
          </h1>
          <p className='md:text-lg text-base '>
            Interakt templates to make quick automation, just in few click away
            to automate your tasks
          </p>
        </div>
        {/* blogs */}

        <div className='container grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 py-10'>
          {/* 1 */}
          <div className='card bg-white border border-[#CCCCCC] p-5 justify-between rounded-lg  h-64 '>
            <div className='flex flex-col gap-2'>
              <h1 className='text-lg font-semibold'>
                How to automate your task using Interakt
              </h1>
              <p className='text-base'>
                Interakt templates to make quick automation, just in few click
                away to automate your tasks
              </p>
            </div>

            <div className='flex flex-col gap-2'>
              <h1 className='text-lg font-semibold'>viaSocket</h1>
              <p className='text-base'>01/03/2024</p>
            </div>
          </div>
          {/* 2 */}
          <div className='card bg-white border border-[#CCCCCC] p-5 justify-between rounded-lg  h-64 '>
            <div className='flex flex-col gap-2'>
              <h1 className='text-lg font-semibold'>
                How to automate your task using Interakt
              </h1>
              <p className='text-base'>
                Interakt templates to make quick automation, just in few click
                away to automate your tasks
              </p>
            </div>

            <div className='flex flex-col gap-2'>
              <h1 className='text-lg font-semibold'>viaSocket</h1>
              <p className='text-base'>01/03/2024</p>
            </div>
          </div>
          {/* 3 */}
          <div className='card bg-white border border-[#CCCCCC] p-5 justify-between rounded-lg  h-64 '>
            <div className='flex flex-col gap-2'>
              <h1 className='text-lg font-semibold'>
                How to automate your task using Interakt
              </h1>
              <p className='text-base'>
                Interakt templates to make quick automation, just in few click
                away to automate your tasks
              </p>
            </div>

            <div className='flex flex-col gap-2'>
              <h1 className='text-lg font-semibold'>viaSocket</h1>
              <p className='text-base'>01/03/2024</p>
            </div>
          </div>
        </div>
      </div>
      {/* blogg section starts here */}

      {/* abouttttt */}
      <div className='bg-[#F5F5F5] py-10'>
        <div className='flex lg:flex-row md:flex-row flex-col gap-10 container justify-between'>
          <div className='flex flex-1 flex-col justify-start gap-4'>
            <Image
              src={
                pluginOne?.iconurl
                  ? pluginOne?.iconurl
                  : "https://placehold.co/40x40"
              }
              width={34}
              height={34}
            />
            <h6 className='lg:text-[32px] md:text-2xl text-xl font-medium'>
              About {pluginOne?.name}
            </h6>
            <p className='md:text-xl text-base'>{pluginOne?.description}</p>
            <div>
              <Link href='/'>
                <button className='border border-black text-black bg-white px-4 py-2 rounded text-base '>
                  Learn more
                </button>
              </Link>
            </div>
          </div>
          <div className='flex flex-1 flex-col justify-start gap-4'>
            <Image
              src={
                pluginTwo?.iconurl
                  ? pluginTwo?.iconurl
                  : "https://placehold.co/40x40"
              }
              width={34}
              height={34}
            />
            <h6 className='lg:text-[32px] md:text-2xl text-xl font-medium'>
              About {pluginTwo?.name}
            </h6>
            <p className='md:text-xl text-base'>{pluginTwo?.description}</p>
            <div>
              <Link href='/'>
                <button className='border border-black text-black bg-white px-4 py-2 rounded text-base '>
                  Learn more
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------------------------------------------------------------------------------------ */}

      {/* footer */}

      <div className='bg-[#E6E6E6] py-10'>
        <div className='flex flex-row gap-4 justify-center items-center'>
          <h4 className='lg:text-[32px] md:text-xl text-lg font-semibold'>
            Integrations run at
          </h4>
          <Image
            src='../../../assets/brand/socket_fav_dark.svg'
            width={40}
            height={40}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------------------ */}
    </div>
  );
};

export default IntegrationSlugPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const pathArray = [params.appslugname, params.pageslug]; // Adjust based on your URL structure

  // Fetch data server-side here
  const combos = await fetchCombos(pathArray);
  const apps = await fetchApps("All", 25); // Example: fetching with default category "All" and 25 items
  console.log(combos?.combinations);

  return {
    props: {
      combos,
      apps,
      pathArray, // Pass other necessary data as props
    },
  };
}


async function fetchApps(selectedCategory, visibleItems) {
  const fetchUrl =
    selectedCategory && selectedCategory !== "All"
      ? `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?category=${
          selectedCategory && selectedCategory === "Other"
            ? null
            : selectedCategory
        }&limit=${visibleItems}`
      : `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=${visibleItems}`;

  const apiHeaders = {
    headers: {
      "auth-key": process.env.NEXT_PUBLIC_INTEGRATION_KEY,
    },
  };

  const response = await fetch(fetchUrl, apiHeaders);
  const responseData = await response.json();
  return responseData;
}

async function fetchCombos(pathArray) {
  const apiHeaders = {
    headers: {
      "auth-key": process.env.NEXT_PUBLIC_INTEGRATION_KEY,
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/recommend/integrations?service=${pathArray[0]}&service=${pathArray[1]}`,
    apiHeaders
  );
  console.log(response, "reso");
  const responseData = await response.json();
  return responseData;
}

