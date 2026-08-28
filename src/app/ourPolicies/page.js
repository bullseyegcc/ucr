'use client'

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import SlideIn from "../../animations/SlideIn";
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

function PolicyDetail({ policy, ctaLabel = "Download the Policy", className = "" }) {
    return (
        <div className={className}>
            <h2 className="font-primary text-[28px] lg:text-[42px] leading-[1.15] tracking-[-0.04em] font-medium text-black mb-5 lg:mb-6">
                {formatPolicyHeading(policy.title)}
            </h2>
            <p className="text-[#6B6B6B] text-sm lg:text-lg leading-relaxed lg:leading-[30px] max-w-3xl font-normal">
                {policy.intro}
            </p>

            <a
                href={policy.pdf}
                download={`${policy.title}.pdf`}
                className="inline-flex items-center gap-2.5 bg-primary hover:bg-[#e85409] text-white px-6 lg:px-7 py-3 rounded-full w-fit mt-8 lg:mt-10 transition-colors duration-300"
            >
                <span className="text-sm lg:text-base font-medium">{ctaLabel}</span>
                <ArrowRight size={16} strokeWidth={2.2} />
            </a>
        </div>
    );
}

export default function OurPolicies() {
    const [selectedPolicyId, setSelectedPolicyId] = useState(policies[0].id);
    const selectedPolicy =
        policies.find((policy) => policy.id === selectedPolicyId) || policies[0];

    const handleMobilePolicySelect = (policyId) => {
        setSelectedPolicyId((current) => (current === policyId ? null : policyId));
    };

    const handleDesktopPolicySelect = (policyId) => {
        setSelectedPolicyId(policyId);
    };

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
                    imageClassName: "object-center",
                }}
            />

            <div className="relative w-full overflow-hidden bg-[#F5F5F5] px-4 py-12 lg:px-20 lg:py-20">
                <div
                    className="pointer-events-none absolute top-[-60px] left-[40%] z-0 h-[420px] w-[420px] rounded-full bg-[#FA6E43]/22 blur-[140px] select-none lg:top-[-120px] lg:left-[48%] lg:h-[720px] lg:w-[720px] lg:bg-[#FA6E43]/24 lg:blur-[180px]"
                    aria-hidden="true"
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-12 lg:mb-20 leading-tight">
                    <SlideIn direction="left" duration={0.9}>
                        <p className="mb-3 lg:mb-4 text-primary uppercase text-sm lg:text-[1.125rem] font-medium tracking-[0.04em]">
                            Simple, Transparent, and Fair.
                        </p>
                        <h1 className="font-primary font-medium text-[32px] lg:text-[55px] leading-[48px] lg:leading-[70px] tracking-[-1.86px] text-black">
                            Built For Your Trust. Designed To Keep You Informed.
                        </h1>
                    </SlideIn>
                    <SlideIn direction="right" duration={0.9} delay={0.2} className="flex items-center lg:pt-10">
                        <p className="text-[#212225] text-base leading-7 tracking-[-0.2px] lg:text-xl lg:leading-[28px] max-w-[361px] lg:max-w-lg ml-auto font-medium">
                            We believe clarity creates confidence. These policies outline how we protect your data, support your experience, and operate with transparency—so you always know what to expect.
                        </p>
                    </SlideIn>
                </div>

                {/* Mobile accordion — matches Figma */}
                <div className="relative z-10 w-full overflow-hidden bg-gradient-to-b from-white to-transparent lg:hidden">
                    {policies.map((policy, index) => {
                        const isExpanded = policy.id === selectedPolicyId;
                        const isLast = index === policies.length - 1;

                        return (
                            <div
                                key={policy.id}
                                className={!isExpanded && !isLast ? 'border-b border-[#E8E8E8]' : ''}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleMobilePolicySelect(policy.id)}
                                    aria-expanded={isExpanded}
                                    className={`flex w-full items-center gap-3 px-5 py-4 text-left transition-colors duration-200 ${
                                        isExpanded
                                            ? 'bg-primary text-white'
                                            : 'bg-white text-[#2A2A2A]'
                                    }`}
                                >
                                    <PolicyIcon
                                        className={`h-5 w-5 flex-shrink-0 ${
                                            isExpanded ? 'text-white' : 'text-[#6B6B6B]'
                                        }`}
                                    />
                                    <span className="text-base font-medium leading-snug tracking-[-0.02em]">
                                        {policy.title}
                                    </span>
                                </button>

                                <div
                                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                                        isExpanded
                                            ? 'grid-rows-[1fr] opacity-100'
                                            : 'pointer-events-none grid-rows-[0fr] opacity-0'
                                    }`}
                                    aria-hidden={!isExpanded}
                                >
                                    <div className="overflow-hidden">
                                        <PolicyDetail
                                            policy={policy}
                                            ctaLabel="Download Policy"
                                            className="bg-gradient-to-b from-white to-transparent px-5 py-8"
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Desktop side-by-side layout */}
                <div className="relative z-10 hidden w-full lg:flex lg:flex-row lg:gap-12 lg:items-stretch">
                    <div className="w-[32%] flex flex-col bg-gradient-to-b from-white to-transparent">
                        {policies.map((policy) => {
                            const isSelected = policy.id === selectedPolicy.id;

                            return (
                                <button
                                    key={policy.id}
                                    type="button"
                                    onClick={() => handleDesktopPolicySelect(policy.id)}
                                    className={`flex w-full items-center gap-3 px-5 py-[18px] text-left transition-colors duration-200 ${
                                        isSelected
                                            ? 'bg-primary text-white'
                                            : 'bg-white text-[#2A2A2A] hover:bg-[#F5F5F5]'
                                    }`}
                                >
                                    <PolicyIcon
                                        className={`h-5 w-5 flex-shrink-0 ${
                                            isSelected ? 'text-white' : 'text-[#6B6B6B]'
                                        }`}
                                    />
                                    <span className="text-lg font-medium leading-snug tracking-[-0.02em]">
                                        {policy.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <PolicyDetail
                        policy={selectedPolicy}
                        className="w-[68%] flex flex-col justify-start bg-gradient-to-b from-white to-transparent rounded-xl px-14 py-14"
                    />
                </div>
            </div>
        </div>
    )
}
