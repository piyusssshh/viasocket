import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
    MdChevronRight,
    MdOutlineTimer,
    MdAutoGraph,
    MdBarChart,
    MdOutlineSupportAgent,
    MdOutlineExtension,
    MdOutlineEngineering,
    MdBrightness1,
} from 'react-icons/md';
import { getDbdashData } from './api';
export async function getServerSideProps() {
    const IDs = ['tbld6tbln'];

    const dataPromises = IDs.map((id) => getDbdashData(id));
    const results = await Promise.all(dataPromises);

    return {
        props: {
            usecase: results[0]?.data?.rows,
        },
    };
}

export default function Embed({ usecases }) {
    console.log(usecase, 'results');
    const [selectedFeature1, setSelectedFeature1] = useState('conditional-logic');

    const emebed = {
        'howItWorks': [
            {
                'name': 'Implement our code',
                'des': '       Set up triggers for app events or specific times to fetch data across your app stack Set up triggers for app events or specific times to fetch data across your app stack  Set up triggers for app events or specific times to fetch data across your app stack ',
            },
            {
                'name': "Style it to match your product's branding",
                'des': 'Override our design system styles without forking the codebase Override our design system styles without forking the codebase Override our design system styles without forking the codebase Override our design system styles without forking the codebase .',
            },
            {
                'name': 'Allow your users to create automated workflows',
                'des': 'Set up triggers for app events or specific times to fetch data across your app stack Set up triggers for app events or specific times to fetch data across your app stack  Set up triggers for app events or specific times to fetch data across your app stack ',
            },
        ],

        'features': [
            {
                'slug': 'conditional-logic',
                'name': 'Conditional Logic',
            },
            {
                'slug': 'webhook-response',
                'name': 'Webhook Response',
            },
            {
                'slug': 'team-collaboration',
                'name': 'Team Collaboration',
            },
            {
                'slug': 'multi-step-flow',
                'name': 'Multi Step flow',
            },
            {
                'slug': 'schedule-task',
                'name': 'Schedule Task',
            },
            {
                'slug': 'metrics',
                'name': 'Metrics',
            },
        ],
    };

    const [selectedFeature, setSelectedFeature] = useState(emebed?.features[0].slug);
    return (
        <>
            <div className=" ">
                <div className="flex flex-col lg:gap-10 gap-4  my-4 container">
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl">Embed</span>
                        <h1 className="lg:text-6xl text-4xl font-semibold lh-1 md:w-4/5 w-full">
                            Bring third-party app integration, marketplace or No-code automation into your SaaS
                        </h1>
                    </div>

                    <h2 className="lg:text-2xl text-xl md:w-4/5 w-full">
                        With Viasocket embedding, your users can easily connect third-party apps with your SaaS tool to
                        automate tasks without leaving your platform.
                    </h2>
                    <div className="flex gap-3 flex-wrap">
                        <Link href={'/'}>
                            <button className="btn btn-accent btn-md">
                                Talk to us <MdChevronRight />{' '}
                            </button>
                        </Link>
                        <Link href={'/'}>
                            <button className="btn btn-accent btn-outline btn-md">
                                See how it works <MdChevronRight />{' '}
                            </button>
                        </Link>
                    </div>
                    <div className="flex items-center lg:gap-8 md:gap-6 gap-4 flex-wrap">
                        <span className="flex items-center gap-1  md-text-xl text-sm">
                            <MdOutlineTimer fontSize={22} />
                            30 mins of code to bring embedding
                        </span>
                        <span className="flex items-center gap-1  md-text-xl text-sm">
                            <MdAutoGraph fontSize={22} />
                            Higher retention rate
                        </span>
                        <span className="flex items-center gap-1  md-text-xl text-sm">
                            <MdBarChart fontSize={22} />
                            Competitive benefits
                        </span>
                    </div>
                </div>

                <div className=" container my-20 items-center md:hidden grid sm:grid-cols-2 grid-cols-1 gap-6">
                    {emebed.features.map((feature, i) => {
                        return (
                            <div className="w-full p-6 rounded flex flex-col gap-6 bg-white">
                                <h2 className="text-2xl font-semibold">{feature?.name}</h2>
                                <Image
                                    src={`/assets/img/pages/embed/feature-${feature?.slug}.svg`}
                                    className="w-full"
                                    width={1080}
                                    height={1080}
                                    alt={'hello'}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="md:flex hidden flex-row container my-20 items-center">
                    <div className="w-full flex items-center justify-center">
                        <Image
                            src={`/assets/img/pages/embed/feature-${selectedFeature}.svg`}
                            className="w-full"
                            width={1080}
                            height={1080}
                            alt={'hello'}
                        />
                    </div>
                    <div className="w-full flex flex-col ">
                        {emebed.features.map((feature, i) => {
                            return (
                                <>
                                    <button
                                        onClick={() => setSelectedFeature(feature?.slug)}
                                        className={`${feature?.slug === selectedFeature ? 'text-black' : ' text-[#64869B]'} lg:text-2xl text-start  py-2 md:px-8 px-4 border-b-2 flex  items-center justify-between font-semibold `}
                                    >
                                        {feature?.name}{' '}
                                        {feature?.slug === selectedFeature && (
                                            <MdBrightness1 color="#64869B" fontSize={16} />
                                        )}
                                    </button>
                                </>
                            );
                        })}
                    </div>
                </div>
                <div className="bg-white py-20">
                    <div className="container flex flex-col gap-20">
                        <div className="flex flex-col gap-2">
                            <h2 className="lg:text-4xl text-3xl font-semibold">How it works</h2>
                            <p className="lg:text-2xl text-xl">
                                20 Years in SaaS Taught Us: Integrations Are Vital & Often Tough. With Embed, We Made
                                Them Simple.
                            </p>
                        </div>
                        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 flex-wrap">
                            {emebed?.howItWorks.map((content, index) => {
                                return (
                                    <div className="flex flex-col gap-2" key={index}>
                                        <div className="rounded-full w-16 border aspect-square flex items-center justify-center  lg:text-2xl text-xl font-semibold bg-base-100  ">
                                            {index + 1}
                                        </div>
                                        <h3 className="lg:text-2xl text-xl font-semibold">{content?.name}</h3>
                                        <p className="lg:text-xl ">{content?.des}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="bg-container py-20">
                    <div className="md:bg-white lg:p-16 md:p-8 p-2">
                        <div>
                            <div className="flex flex-col gap-6">
                                <h2 className="lg:text-4xl text-3xl font-semibold">
                                    Upgrade your SaaS today, 100% free{' '}
                                </h2>
                                <p className="lg:text-2xl text-xl">
                                    Start using viaSocket Embed lifetime free for any 5 apps of your choice. We will
                                    begin charging once you've found the tool beneficial and wish to extend its use to
                                    additional apps
                                </p>
                                <div className="flex gap-3 flex-wrap">
                                    <Link href={'/'}>
                                        <button className="btn btn-accent btn-md">
                                            Talk to us <MdChevronRight />{' '}
                                        </button>
                                    </Link>
                                    <Link href={'/'}>
                                        <button className="btn btn-accent btn-outline btn-md">
                                            See how it works <MdChevronRight />{' '}
                                        </button>
                                    </Link>
                                    <Link href={'/'}>
                                        <button className="btn btn-link no-underline  btn-md">
                                            FAQs <MdChevronRight />{' '}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <dvi className="bg-white py-20">
                    <div className="bg-container flex flex-col gap-6">
                        <h2 className="lg:text-4xl text-3xl font-semibold md:px-0 px-2">Usecases</h2>
                        <div className="flex flex-col gap-24">
                            {transformedUsecases.map((group, index) => {
                                const { main, sub } = group;
                                if (!main) return null;

                                const IconComponent =
                                    index === 0
                                        ? MdOutlineSupportAgent
                                        : index === 1
                                            ? MdOutlineExtension
                                            : MdOutlineEngineering;

                                return (
                                    <div
                                        key={main.slug}
                                        className="flex md:flex-row md:gap-6 lg:gap-12 gap-6 md items-center justify-center flex-col"
                                    >
                                        <div className="flex flex-col gap-4">
                                            <IconComponent fontSize={44} className="md:mx-0 mx-2" />
                                            <h3 className="lg:text-2xl text-xl font-semibold md:px-0 px-2">
                                                {main.heading?main.heading:''}
                                            </h3>
                                            <p className="lg:text-xl md:px-0 px-2">{main.subheading?main.subheading:''}</p>
                                            {main.content?.length && main.content.map((content, i) => (
                                                <div
                                                    className="bg-base-100 flex flex-col md:p-6 p-4 gap-2"
                                                    key={i}
                                                >
                                                    <h4 className="text-xl font-bold">{content.title?content.title:''}</h4>
                                                    <p>{content.des?content.des:''}</p>
                                                </div>
                                            ))}
                                            {sub.map((content, i) => (
                                                <div
                                                    className="bg-base-100 flex flex-col md:p-6 p-4 gap-2"
                                                    key={i}
                                                >
                                                    <h4 className="text-xl font-bold">{content.content.title?content.content.title:''}</h4>
                                                    <p>{content.content.des?content.content.des:''}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="w-full flex items-center justify-center">
                                            <Image
                                                src={`/assets/img/pages/embed/usecase-${main.slug?main.slug:''}.svg`}
                                                className="xl:w-9/12 w-full md:p-0 p-2"
                                                width={1080}
                                                height={1080}
                                                alt={main.heading?main.heading:''}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </dvi>
            </div>
        </>
    );
}
a