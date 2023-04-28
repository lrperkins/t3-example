import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  { name: "Services", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Contact", href: "#" },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gray-900">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/bespoke-ai#" className="-m-1.5 p-1.5">
              <span className="sr-only">Bespoke-AI</span>
              <img className="h-12 w-auto" src="/logo-symbol.webp" alt="" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/bespoke-ai#"
              className="text-sm font-semibold leading-6 text-white"
            >
              Log in <span aria-hidden="true">→</span>
            </Link>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
              <Link href="/bespoke-ai#" className="-m-1.5 p-1.5">
                <span className="sr-only">Bespoke-AI</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt=""
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/25">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href="/bespoke-ai#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <div className="relative isolate overflow-hidden pt-14">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
              Learn how our AI solutions can boost your business.
              <Link href="/bespoke-ai#" className="font-semibold text-white">
                <span className="absolute inset-0" aria-hidden="true" />
                Learn more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Bespoke-AI: Customized AI Solutions
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We provide personalized AI interfaces for companies looking to
              thrive in the age of AI. Our cutting-edge solutions are tailored
              to your unique needs and goals.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/bespoke-ai#"
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Try it out!
              </Link>
              <Link
                href="/bespoke-ai#"
                className="text-sm font-semibold leading-6 text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
      <section className="mb-12 p-10 ">
        <h2 className="mb-4 text-2xl font-semibold text-white">
          Why Choose Bespoke-AI
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div
            className="rounded-md p-6 text-white shadow-md"
            style={{ background: "#fff3" }}
          >
            <h3 className="mb-4 text-xl font-semibold">Expertise</h3>
            <p>
              Our chatbots are trained by experts in various fields, such as
              finance, health, education, and more. They can understand your
              customers’ needs and provide accurate and relevant answers.
            </p>
          </div>
          <div
            className="rounded-md  p-6 text-white shadow-md"
            style={{ background: "#fff3" }}
          >
            <h3 className="mb-4 text-xl font-semibold">Web Intelligence</h3>
            <p>
              Our bots can search the web for any information you need, from
              weather forecasts to stock prices. They can also analyze the
              results and present them in a concise and easy-to-understand way.
            </p>
          </div>
          <div
            className="rounded-md  p-6 text-white shadow-md"
            style={{ background: "#fff3" }}
          >
            <h3 className="mb-4 text-xl font-semibold">Training</h3>
            <p>
              We offer online and onsite training sessions for your team on how
              to use AI to boost their productivity and efficiency. We teach
              them how to leverage our platform and tools to automate tasks,
              optimize workflows, and generate insights.
            </p>
          </div>
          <div
            className="rounded-md  p-6 text-white shadow-md"
            style={{ background: "#fff3" }}
          >
            <h3 className="mb-4 text-xl font-semibold">Consulting</h3>
            <p>
              We provide strategic advice on how to implement AI solutions in
              your business. We help you identify the best opportunities,
              challenges, and risks of using AI. We also help you measure and
              improve the performance and impact of your AI projects.
            </p>
          </div>
          <div
            className="rounded-md  p-6 text-white shadow-md"
            style={{ background: "#fff3" }}
          >
            <h3 className="mb-4 text-xl font-semibold">Data Analysis</h3>
            <p>
              Our neural nets can process and analyze any type of data you have,
              from text to images to audio. They can answer complex questions,
              find patterns, and generate insights from your data. They can also
              learn from feedback and improve over time.
            </p>
          </div>
          <div
            className="rounded-md  p-6 text-white shadow-md"
            style={{ background: "#fff3" }}
          >
            <h3 className="mb-4 text-xl font-semibold">Voice Bots</h3>
            <p>
              Our voice bots are better than Siri. They can understand natural
              language, handle multiple requests, and converse with you in a
              friendly and engaging way. They can also switch between different
              languages and accents.
            </p>
          </div>
        </div>
      </section>
      <div className="mx-auto p-10">
        <div className="flex flex-col items-center justify-center p-6 md:flex-row">
          <div className="md:mr-4 md:w-1/2">
            <Image
              src="/trex-headset2.png"
              alt="AI CEO"
              className="m-auto h-auto w-full max-w-lg rounded-xl"
              width={500}
              height={500}
            />
          </div>
          <div className="text-white md:ml-4 md:w-1/2">
            <h2 className="mb-4 text-2xl font-bold">Talk to our AI CEO</h2>
            <p className="mb-4">
              Do you want to chat with our friendly AI based on our CEO? Do you
              want to negotiate a deal with the leader of Bespoke AI? Do you
              want to experience the future of business communication?
            </p>
            <p className="mb-4">
              If you answered yes to any of these questions, then you should
              call our hotline and talk to our AI powered CEO. He is ready to
              listen to your needs, answer your questions, and offer you the
              best solutions for your business.
            </p>
            <p className="mb-4">
              Don’t miss this opportunity to talk to the AI that is changing the
              world. Call now and see what you can negotiate!
            </p>
            <button className="rounded-md bg-blue-500 py-2 px-4 text-white">
              Call Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
