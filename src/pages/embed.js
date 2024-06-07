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

export default function Embed() {
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
        'usecases': [
            {
                'slug': 'supercharge-your-crm',
                'heading': 'Supercharge your CRM',
                'subheading':
                    "Running into limitations with your app's integrations? Use viaSocket to build custom integrations and automation to get even more out of your APP.",
                'content': [
                    {
                        'title': 'Go beyond standard integrations',
                        'des': "Does your CRM's integration feel underwhelming? If you need more flexibility, use viaSocket to build a custom integration that lets you exchange any data you wish.",
                    },
                    {
                        'title': 'More than just moving data',
                        'des': 'viaSocket is not your typical integration software - you can add additional calculations, and parameters and enrich data when connecting different apps and systems.',
                    },
                    {
                        'title': 'Custom notifications',
                        'des': 'Do you want a personalized notification system that meets the needs of your company? viaSocket lets you trigger notifications when custom events happen.',
                    },
                ],
            },

            {
                'slug': 'limit-validation',
                'heading': 'Limit validation',
                'subheading':
                    "Running into limitations with your app's integrations? Use viaSocket to build custom integrations and automation to get even more out of your APP.",
                'content': [
                    {
                        'title': 'Go beyond standard integrations',
                        'des': "Does your CRM's integration feel underwhelming? If you need more flexibility, use viaSocket to build a custom integration that lets you exchange any data you wish.",
                    },
                    {
                        'title': 'More than just moving data',
                        'des': 'viaSocket is not your typical integration software - you can add additional calculations, and parameters and enrich data when connecting different apps and systems.',
                    },
                    {
                        'title': 'Custom notifications',
                        'des': 'Do you want a personalized notification system that meets the needs of your company? viaSocket lets you trigger notifications when custom events happen.',
                    },
                ],
            },
            {
                'slug': 'save-engineering-resources',
                'heading': 'Save engineering resources',
                'subheading':
                    "Running into limitations with your app's integrations? Use viaSocket to build custom integrations and automation to get even more out of your APP.",
                'content': [
                    {
                        'title': 'Go beyond standard integrations',
                        'des': "Does your CRM's integration feel underwhelming? If you need more flexibility, use viaSocket to build a custom integration that lets you exchange any data you wish.",
                    },
                    {
                        'title': 'More than just moving data',
                        'des': 'viaSocket is not your typical integration software - you can add additional calculations, and parameters and enrich data when connecting different apps and systems.',
                    },
                    {
                        'title': 'Custom notifications',
                        'des': 'Do you want a personalized notification system that meets the needs of your company? viaSocket lets you trigger notifications when custom events happen.',
                    },
                ],
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
            <div className=" my">
                <div className="flex flex-col gap-10 w-4/5 my-16 container">
                    <div className="flex flex-col gap-1">
                        <span className="text-2xl">Embed</span>
                        <h1 className="text-6xl font-semibold lh-1">
                            Bring third-party app integration, marketplace or No-code automation into your SaaS
                        </h1>
                    </div>

                    <h2 className="text-2xl">
                        With Viasocket embedding, your users can easily connect third-party apps with your SaaS tool to
                        automate tasks without leaving your platform.
                    </h2>
                    <div className="flex gap-3">
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
                    <div className="flex items-center gap-8">
                        <span className="flex items-center gap-1 text-xl">
                            <MdOutlineTimer />
                            30 mins of code to bring embedding
                        </span>
                        <span className="flex items-center gap-1  text-xl">
                            <MdAutoGraph />
                            Higher retention rate
                        </span>
                        <span className="flex items-center gap-1  text-xl">
                            <MdBarChart />
                            Competitive benefits
                        </span>
                    </div>
                </div>

                <div className="flex flex-row container my-20 items-center">
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
                                        className={`${feature?.slug === selectedFeature ? 'text-black' : ' text-[#64869B]'} text-2xl text-start  py-2 px-8 border-b-2 flex  items-center justify-between font-semibold `}
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
                            <h2 className="text-4xl font-semibold">How it works</h2>
                            <p className="text-2xl">
                                20 Years in SaaS Taught Us: Integrations Are Vital & Often Tough. With Embed, We Made
                                Them Simple.
                            </p>
                        </div>
                        <div className="grid grid-cols-3 gap-8">
                            {emebed?.howItWorks.map((content, index) => {
                                return (
                                    <div className="flex flex-col gap-2" key={index}>
                                        <div className="rounded-full w-16 border aspect-square flex items-center justify-center  text-2xl font-semibold bg-base-100  ">
                                            {index + 1}
                                        </div>
                                        <h3 className="text-2xl font-semibold">{content?.name}</h3>
                                        <p>{content?.des}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className=" container py-20">
                    <div className="bg-white p-16">
                        <div>
                            <div className="flex flex-col gap-6">
                                <h2 className="text-4xl font-semibold">How it works</h2>
                                <p className="text-2xl">
                                    Start using viaSocket Embed lifetime free for any 5 apps of your choice. We will
                                    begin charging once you've found the tool beneficial and wish to extend its use to
                                    additional apps
                                </p>
                                <div className="flex gap-3">
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
                <div className="bg-white py-20">
                    <div className="container flex flex-col gap-6">
                        <h2 className="text-4xl font-semibold">Usecases</h2>
                        <div className="flex flex-col gap-24">
                            {emebed?.usecases.map((usecase, index) => {
                                return (
                                    <div key={index} className="flex flex-row gap-12 items-center justify-center">
                                        <div className="flex flex-col gap-4">
                                            {index === 0 && <MdOutlineSupportAgent fontSize={44} />}
                                            {index === 1 && <MdOutlineExtension fontSize={44} />}
                                            {index === 2 && <MdOutlineEngineering fontSize={44} />}
                                            <h3 className="text-2xl font-semibold">{usecase?.heading}</h3>
                                            <p className="text-xl">{usecase?.subheading}</p>
                                            {usecase?.content?.length &&
                                                usecase?.content.map((content, i) => {
                                                    return (
                                                        <div className="bg-base-100 flex flex-col p-6 gap-2">
                                                            <h4 className="text-xl font-bold">{content?.title}</h4>
                                                            <p>{content?.des}</p>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                        <div className="w-full flex items-center justify-center">
                                            <Image
                                                src={`/assets/img/pages/embed/usecase-${usecase?.slug}.svg`}
                                                className="w-9/12"
                                                width={1080}
                                                height={1080}
                                                alt={usecase?.heading}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
