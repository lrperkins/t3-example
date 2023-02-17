import React from "react";
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ArrowTrendingUpIcon,
  VariableIcon,
  WrenchScrewdriverIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import Head from "next/head";

const features = [
  {
    name: "Increase speed, efficiency, and productivitiy",
    description:
      "Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.",
    icon: ArrowTrendingUpIcon,
  },
  {
    name: "Reduce technical complexity",
    description:
      "Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.",
    icon: VariableIcon,
  },
  {
    name: "Empower non-technical users",
    description:
      "Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.",
    icon: WrenchScrewdriverIcon,
  },
  {
    name: "AI/ML for everyone",
    description:
      "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    icon: CpuChipIcon,
  },
];

export default function DataScience() {
  return (
    <>
      <Head>
        <title>Harmony Analytics</title>
        <meta name="description" content="Created for Harmony Analytics" />
      </Head>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
              Data Science Empowerment
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Vision for the future
            </p>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              Unleash the power of data science -{" "}
              <b>
                conquer challenges, leverage your strengths, and amplify your
                capabilities.
              </b>
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      {/* ==================== */}
      <div className="mb-10 overflow-hidden bg-white py-8">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
            <div className="px-6 md:px-0 lg:pt-4 lg:pr-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
                  Latest AI Tools
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  AI Data Enrichment
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Our expertise is real, but our{" "}
                  <i>
                    <b>intelligence is artificial</b>
                  </i>
                  .
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <feature.icon
                          className="absolute top-1 left-1 h-5 w-5 text-indigo-600"
                          aria-hidden="true"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className=" h-full sm:px-6 lg:px-0">
              <div className="flex text-white">
                {/* Your code example */}
                <img
                  src="/harmony_openai.png"
                  className="mt-12 inline-block pt-12 align-middle"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
