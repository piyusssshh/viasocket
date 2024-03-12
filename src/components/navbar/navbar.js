import { MdMenu } from "react-icons/md";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getDbdashData } from "@/pages/api";
import styles from "./navbar.module.scss";
import NotificationBar from "../notificationBar/notificationbar";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Navbar = ({productData, pathArray}) => {
  let pageData = productData && productData.find(
    (page) => page?.name?.toLowerCase() === pathArray[1]
  );

  const openChatWidget = () => {
    window.chatWidget.open();
  };

  const [data, setData] = useState(null);
  useEffect(() => {
    getDbdashDataa();
  }, []);

  const getDbdashDataa = async () => {
    const dbdashData = await getDbdashData("tbl7lj8ev");
    setData(dbdashData.data.rows);
  };
  var shorterData ;
  if (data?.length > 0) {
     shorterData = data?.sort((a, b) => {
      return parseInt(a.priority) - parseInt(b.priority);
    })
  }
  return (
    <>
      <div className={`${styles.navbar_cont} flex w-full flex-col`}>
        <NotificationBar />
        <div
          className={`${styles.navbar} flex justify-between items-center w-full py-4 container my-auto`}
        >
          <Image
          className="w-[120px]"
            src={pageData?.logo[0] ? pageData.logo[0] : './assets/brand/logo.svg'}
            width={1080}
            height={400}
            alt='viasocket'
          />

          <div className='gap-6 lg:flex hidden items-center'>
            {shorterData &&
              shorterData.map((option, index) => {
                if (
                  option.group_name === null &&
                  option.is_mininavonly === null
                ) {
                  return (
                    <>
                      {option.is_parent ? (
                        <>
                          <div className='dropdown dropdown-bottom' key={index}>
                            <div
                              tabIndex={0}
                              role='button'
                              className=' flex items-center gap-1 hover:underline'
                            >
                              <span>{option?.name}</span>
                             <MdOutlineKeyboardArrowDown size={20} />
                            </div>
                            <ul
                              tabIndex={0}
                              className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
                            >
                              <li>
                                <button onClick={openChatWidget}>Live Chat</button>
                              </li>
                              <li>
                                <Link href='https://calendly.com/rpaliwal71/15-mins'>
                                  Book a meeting
                                </Link>
                              </li>
                              <li>
                                <Link href='https://viasocket.com/faq'>
                                  Help Doc
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </>
                      ) : (
                        <>
                          <Link
                            key={index}
                            href={`${option.link ? option.link : "#"}`}
                            className='  hover:underline'
                          >
                            {option?.name}
                          </Link>
                        </>
                      )}
                    </>
                  );
                }
              })}
               <Link href='/experts' className='btn btn-primary btn-sm'>
             Hire a No-code builder
            </Link>
            {/* <Link href='/login' className='btn btn-outline btn-sm '>
              Login
            </Link>
            <Link href='/signup' className='btn btn-primary btn-sm'>
              Get Started for free
            </Link> */}
          </div>
          <div className='dropdown dropdown-end lg:hidden block'>
            <div tabIndex={0} role='button' className=''>
              <MdMenu className='w-[24px] h-[24px]' />
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content z-[1] menu p-2  bg-base-100 rounded-md w-52 shadow-lg'
            >
              {shorterData &&
                shorterData.map((option, index) => {
                  if (!option.is_parent) {
                    return (
                      <>
                        <li key={index}>
                          <Link href={`${option.link ? option.link : "#"}`}>
                            {" "}
                            {option?.name}
                          </Link>
                        </li>
                      </>
                    );
                  }
                })}
            </ul>
          </div>
        </div>
      </div>
      <button
        className={`${styles.expert_btn} btn btn-sm  text-white rounded-full  btn-ghost`}
      >
        Talk to an expert
      </button>
    </>
  );
};

export default Navbar;
