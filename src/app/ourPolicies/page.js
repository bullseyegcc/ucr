'use client'

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import SlideIn from "../../animations/SlideIn";
import { Badge } from "../../common/badge";
import Hero from "@/components/shared/Hero";
import { policies } from "../../assets/policies";

function PolicyIcon({ className }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <path d="M12 3.2 5.4 6v5.4c0 4.4 2.9 8.4 6.6 9.4 3.7-1 6.6-5 6.6-9.4V6L12 3.2Z" />
            <circle cx="11.2" cy="11" r="2.6" />
            <path d="m13.1 13 2.1 2.1" />
        </svg>
    );
}

function formatPolicyHeading(title) {
    return title
        .split(' ')
        .map((word) => {
            if (word === 'UCR' || word === 'III') return word;
            return word.toLowerCase();
        })
        .join(' ');
}

export default function OurPolicies() {
    const [selectedPolicyId, setSelectedPolicyId] = useState(policies[0].id);
    const selectedPolicy = policies.find((policy) => policy.id === selectedPolicyId) || policies[0];

    return (
        <div>
            <Hero
                badge="UCR POLICIES"
                title="Our Policies"
                titleDirectFade
                titleInH1={false}
                minHeightClass="min-h-[50vh] lg:min-h-[70vh]"
                gapClass="gap-3 lg:gap-6"
                contentClassName="px-4 font-medium"
                background={{
                    type: "image",
                    src: "/policies/policiesbg.png",
                    imageClassName: "bg-center",
                }}
            />

            <div className="relative w-full overflow-hidden bg-[#F5F5F5] px-4 py-12 lg:px-20 lg:py-20">
                <Image
                    src="/shared/gradientcircle.png"
                    alt=""
                    width={900}
                    height={900}
                    className="pointer-events-none absolute -top-10 right-0 z-0 w-[70%] max-w-[720px] opacity-80 select-none lg:-top-16 lg:right-[-40px] lg:w-[48%]"
                    aria-hidden="true"
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-12 lg:mb-20 leading-tight">
                    <SlideIn direction="left" duration={0.9}>
                        <div className="mb-3 lg:mb-4">
                            <Badge title="Simple, Transparent, and Fair." />
                        </div>
                        <h1 className="font-primary font-medium text-[32px] lg:text-[62px] leading-[48px] lg:leading-[70px] tracking-[-1.86px] text-black">
                            Built For Your Trust. Designed To Keep You Informed.
                        </h1>
                    </SlideIn>
                    <SlideIn direction="right" duration={0.9} delay={0.2} className="flex items-center lg:pt-10">
                        <p className="text-[#212225] text-base leading-7 tracking-[-0.2px] lg:text-xl lg:leading-[28px] max-w-[361px] lg:max-w-lg ml-auto font-medium">
                            We believe clarity creates confidence. These policies outline how we protect your data, support your experience, and operate with transparency—so you always know what to expect.
                        </p>
                    </SlideIn>
                </div>

                <div className="relative z-10 w-full flex flex-col lg:flex-row gap-6 lg:gap-12 items-stretch">
                    <div className="w-full lg:w-[32%] flex flex-col bg-white">
                        {policies.map((policy) => {
                            const isSelected = policy.id === selectedPolicy.id;

                            return (
                                <button
                                    key={policy.id}
                                    type="button"
                                    onClick={() => setSelectedPolicyId(policy.id)}
                                    className={`flex w-full items-center gap-3 px-5 py-4 lg:py-[18px] text-left transition-colors duration-200 ${
                                        isSelected
                                            ? 'bg-primary text-white'
                                            : 'bg-white text-[#2A2A2A] hover:bg-[#F5F5F5]'
                                    }`}
                                >
                                    <PolicyIcon
                                        className={`h-5 w-5 flex-shrink-0 ${isSelected ? 'text-white' : 'text-[#6B6B6B]'}`}
                                    />
                                    <span className="text-base lg:text-lg font-medium leading-snug tracking-[-0.02em]">
                                        {policy.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="w-full lg:w-[68%] flex flex-col justify-start bg-white rounded-2xl lg:rounded-[32px] px-6 py-10 lg:px-14 lg:py-14">
                        <h2 className="font-primary text-[28px] lg:text-[42px] leading-[1.15] tracking-[-0.04em] font-medium text-black mb-5 lg:mb-6">
                            {formatPolicyHeading(selectedPolicy.title)}
                        </h2>
                        <p className="text-[#6B6B6B] text-sm lg:text-lg leading-relaxed lg:leading-[30px] max-w-3xl font-normal">
                            {selectedPolicy.intro}
                        </p>

                        <a
                            href={selectedPolicy.pdf}
                            download={`${selectedPolicy.title}.pdf`}
                            className="inline-flex items-center gap-2.5 bg-primary hover:bg-[#e85409] text-white px-6 lg:px-7 py-3 rounded-full w-fit mt-8 lg:mt-10 transition-colors duration-300"
                        >
                            <span className="text-sm lg:text-base font-medium">Download the Policy</span>
                            <ArrowRight size={16} strokeWidth={2.2} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
