'use client'

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import FadeIn from "../../animations/FadeIn";
import SlideIn from "../../animations/SlideIn";
import { Badge, Badgetextwhite } from "../../common/badge";
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

export default function OurPolicies() {
    const [selectedPolicyId, setSelectedPolicyId] = useState(policies[0].id);
    const selectedPolicy = policies.find((policy) => policy.id === selectedPolicyId) || policies[0];

    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-[50vh] lg:min-h-[70vh] font-medium bg-black bg-[url('/policiesbg.png')] bg-cover bg-center bg-no-repeat">
                <div className="flex flex-col items-center gap-3 lg:gap-6 px-4">
                    <SlideIn direction="bottom" duration={0.8} delay={0}>
                        <Badgetextwhite title="UCR POLICIES" />
                    </SlideIn>
                    <FadeIn className="font-medium text-[32px] leading-[52px] tracking-[-1.18px] sm:text-[64px] sm:leading-[99px] sm:tracking-[-2.5px] text-center align-middle capitalize text-white" duration={0.4} delay={0}>
                        Our Policies
                    </FadeIn>
                </div>
            </div>

            <div className="relative w-full overflow-hidden bg-[#F5F5F5] px-4 py-12 lg:px-20 lg:py-20">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,_rgba(254,93,10,0.12)_0%,_transparent_70%)]" />

                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-12 lg:mb-20 leading-tight">
                    <SlideIn direction="left" duration={0.9}>
                        <div className="mb-3 lg:mb-4">
                            <Badge title="Simple, Transparent, and Fair." />
                        </div>
                        <h1 className="font-primary font-medium text-[32px] lg:text-[62px] leading-[48px] lg:leading-[70px] tracking-[-1.86px] text-black">
                            Built For Your Trust. Designed To Keep You Informed.
                        </h1>
                    </SlideIn>
                    <SlideIn direction="right" duration={0.9} delay={0.2} className="flex items-center lg:pt-10">
                        <p className="text-gray-700 text-base leading-7 tracking-[-0.2px] lg:text-xl lg:leading-[28px] max-w-[361px] lg:max-w-lg ml-auto font-medium">
                            We believe clarity creates confidence. These policies outline how we protect your data, support your experience, and operate with transparency—so you always know what to expect.
                        </p>
                    </SlideIn>
                </div>

                <div className="relative w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
                    <div className="w-full lg:w-[38%] flex flex-col gap-2">
                        {policies.map((policy) => {
                            const isSelected = policy.id === selectedPolicy.id;

                            return (
                                <button
                                    key={policy.id}
                                    type="button"
                                    onClick={() => setSelectedPolicyId(policy.id)}
                                    className={`flex w-full items-center gap-3 px-4 lg:px-5 py-3.5 lg:py-4 text-left transition-colors duration-200 ${
                                        isSelected
                                            ? 'bg-primary text-white'
                                            : 'bg-transparent text-[#2A2A2A] hover:bg-white/70'
                                    }`}
                                >
                                    <PolicyIcon
                                        className={`h-5 w-5 flex-shrink-0 ${isSelected ? 'text-white' : 'text-[#6B6B6B]'}`}
                                    />
                                    <span className="text-base lg:text-lg font-medium leading-snug">
                                        {policy.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="w-full lg:w-[62%] flex flex-col justify-start bg-white rounded-2xl lg:rounded-3xl px-6 py-10 lg:px-12 lg:py-14 min-h-[420px] lg:min-h-[560px]">
                        <h2 className="font-primary text-[28px] lg:text-[42px] leading-tight tracking-[-0.04em] font-semibold text-black mb-5 lg:mb-6">
                            {selectedPolicy.title}
                        </h2>
                        <p className="text-[#6B6B6B] text-sm lg:text-lg leading-relaxed max-w-3xl">
                            {selectedPolicy.intro}
                        </p>

                        <a
                            href={selectedPolicy.pdf}
                            download={`${selectedPolicy.title}.pdf`}
                            className="inline-flex items-center gap-2 bg-primary hover:bg-[#e85409] text-white px-6 lg:px-7 py-3 rounded-full w-fit mt-8 lg:mt-10 transition-colors duration-300"
                        >
                            <span className="text-sm font-medium">Download the Policy</span>
                            <ArrowRight size={16} strokeWidth={2.2} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
