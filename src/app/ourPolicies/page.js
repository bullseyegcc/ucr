'use client'

import { useEffect, useState } from 'react';
import { Check, ArrowRight, X } from 'lucide-react';
import FadeIn from "../../animations/FadeIn";
import SlideIn from "../../animations/SlideIn";
import { policies } from "../../assets/policies";

const headingFont = { fontFamily: 'Helvetica Now Display, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' };

function getSummary(policy) {
    return policy.content.find((block) => block.type === "p")?.text || "";
}

function getHighlights(policy) {
    const highlights = [];
    for (let i = 0; i < policy.content.length && highlights.length < 4; i += 1) {
        const block = policy.content[i];
        if (block.type !== "h2") continue;
        const next = policy.content.slice(i + 1).find((item) => item.type === "p" || item.type === "ul" || item.type === "ol");
        highlights.push({
            title: block.text,
            text: next?.type === "p" ? next.text : next?.items?.join("; ") || "",
        });
    }
    return highlights;
}

function PolicyContent({ content }) {
    return (
        <div>
            {content.map((block, index) => {
                if (block.type === "h2") {
                    return (
                        <h3
                            key={`${block.text}-${index}`}
                            className={`text-[24px] leading-[30px] tracking-[-0.45px] font-bold ${index === 0 ? "" : "mt-10 lg:mt-12"}`}
                            style={headingFont}
                        >
                            {block.text}
                        </h3>
                    );
                }

                if (block.type === "h3") {
                    return (
                        <h4
                            key={`${block.text}-${index}`}
                            className="mt-8 text-[18px] leading-[26px] tracking-[-0.3px] font-bold"
                            style={headingFont}
                        >
                            {block.text}
                        </h4>
                    );
                }

                if (block.type === "label") {
                    return (
                        <p
                            key={`${block.text}-${index}`}
                            className="mt-5 text-[17px] leading-[1.55] tracking-[-0.2px] font-semibold italic"
                        >
                            {block.text}
                        </p>
                    );
                }

                if (block.type === "p") {
                    return (
                        <p key={index} className="mt-4 text-[17px] leading-[1.55] tracking-[-0.2px]">
                            {block.text}
                        </p>
                    );
                }

                if (block.type === "ul") {
                    return (
                        <ul key={index} className="mt-4 space-y-1 lg:space-y-2 text-[17px] leading-[1.55] tracking-[-0.2px] pl-6 list-disc marker:text-[#2E3134]">
                            {block.items.map((item, itemIndex) => (
                                <li key={`${itemIndex}-${item.slice(0, 24)}`}>{item}</li>
                            ))}
                        </ul>
                    );
                }

                if (block.type === "ol") {
                    return (
                        <ol key={index} className="mt-4 space-y-1 lg:space-y-2 text-[17px] leading-[1.55] tracking-[-0.2px] pl-6 list-decimal marker:text-[#2E3134]">
                            {block.items.map((item, itemIndex) => (
                                <li key={`${itemIndex}-${item.slice(0, 24)}`}>{item}</li>
                            ))}
                        </ol>
                    );
                }

                return null;
            })}
        </div>
    );
}

export default function OurPolicies() {
    const [selectedPolicyId, setSelectedPolicyId] = useState(policies[0].id);
    const [isPolicyOpen, setIsPolicyOpen] = useState(false);

    const selectedPolicy = policies.find((policy) => policy.id === selectedPolicyId) || policies[0];
    const summary = getSummary(selectedPolicy);
    const highlights = getHighlights(selectedPolicy);

    useEffect(() => {
        const onEscape = (event) => {
            if (event.key === 'Escape') {
                setIsPolicyOpen(false);
            }
        };

        if (isPolicyOpen) {
            if (window.lenisInstance) window.lenisInstance.stop();
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            window.addEventListener('keydown', onEscape);
        } else {
            if (window.lenisInstance) window.lenisInstance.start();
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }

        return () => {
            if (window.lenisInstance) window.lenisInstance.start();
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            window.removeEventListener('keydown', onEscape);
        };
    }, [isPolicyOpen]);

    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-[50vh] lg:min-h-[60vh] lg:min-h-[70vh] font-medium bg-black dark:bg-black bg-[url('/policiesbg.png')] bg-cover bg-center bg-no-repeat">
                <div className="flex flex-col items-center gap-3 lg:gap-4 lg:gap-6 px-4">
                    <SlideIn direction="bottom" duration={0.8} delay={0}>
                        <p className="text-primary text-xs lg:text-sm lg:text-base font-semibold tracking-widest uppercase">UCR  POLICIES</p>
                    </SlideIn>
                    <FadeIn className="font-medium text-[32px] leading-[52px] tracking-[-1.18px] sm:text-[64px] sm:leading-[99px] sm:tracking-[-2.5px] text-center align-middle capitalize text-white" duration={0.4} delay={0}>
                        Our Policies
                    </FadeIn>
                </div>
            </div>

            <div className='w-full px-4 lg:px-10 lg:px-20 py-12 lg:py-16 lg:py-20 '>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-8 lg:gap-12 mb-12 lg:mb-16 lg:mb-20">
                    <div className="flex-1">
                        <h1 className='text-lg lg:text-xl lg:text-2xl text-primary'>Simple Transparent and Fare</h1>
                        <h1 className="text-3xl lg:text-4xl lg:text-5xl font-semibold text-black mt-4 lg:mt-5 lg:mt-6 leading-tight lg:leading-snug">Beyond copper, we build trust & reliability</h1>
                    </div>
                    <div className="flex-1 text-xs lg:text-sm text-gray-600 lg:pt-8 lg:pt-12">
                        <p className='w-4/5 text-xl'>We don't just produce copper — we shape reliability, innovation, and sustainability into every product we deliver.</p>
                    </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-10 lg:gap-16">
                    <div className="w-full lg:w-2/5 flex flex-col gap-4 lg:gap-6 lg:gap-8">
                        {policies.map((policy) => {
                            const isSelected = policy.id === selectedPolicy.id;

                            if (isSelected) {
                                return (
                                    <button
                                        key={policy.id}
                                        type="button"
                                        onClick={() => setSelectedPolicyId(policy.id)}
                                        className="flex items-center gap-2 lg:gap-3 bg-primary hover:bg-orange-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full w-fit transition-all duration-300 text-left"
                                    >
                                        <div className="w-5 lg:w-6 h-5 lg:h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                            <Check size={14} className="lg:w-4 lg:h-4" color="#FA6E43" strokeWidth={3} />
                                        </div>
                                        <span className="text-xs lg:text-sm font-semibold">{policy.title}</span>
                                    </button>
                                );
                            }

                            return (
                                <button
                                    key={policy.id}
                                    type="button"
                                    onClick={() => setSelectedPolicyId(policy.id)}
                                    className="flex items-center gap-3 lg:gap-4 text-left group"
                                >
                                    <Check size={20} className="lg:w-6 lg:h-6 flex-shrink-0" color="#FA6E43" strokeWidth={2.5} />
                                    <span className="text-gray-900 text-base lg:text-lg font-medium group-hover:text-primary transition-colors duration-200">
                                        {policy.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="w-full lg:w-3/5 flex flex-col gap-4 lg:gap-5 lg:gap-6 bg-white rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl px-4 lg:px-8 lg:px-10 py-8 lg:py-10 lg:py-12">
                        <div>
                            <h2 className="text-2xl lg:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                                {selectedPolicy.documentTitle}
                            </h2>
                            <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                                {summary}
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 lg:gap-5 mt-4 lg:mt-6">
                            {highlights.map((highlight) => (
                                <div key={highlight.title}>
                                    <h3 className="text-gray-900 font-semibold mb-1 lg:mb-2 text-sm lg:text-base">{highlight.title}</h3>
                                    <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                                        {highlight.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setIsPolicyOpen(true)}
                            className="flex items-center gap-2 bg-primary hover:bg-orange-600 text-white px-5 lg:px-8 py-2 lg:py-3 rounded-full w-fit mt-4 lg:mt-6 transition-all duration-300"
                        >
                            <span className="text-xs lg:text-sm font-semibold">Read more</span>
                            <ArrowRight size={16} className="lg:w-5 lg:h-5" strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>

            {isPolicyOpen && (
                <div
                    className="fixed inset-0 z-[200] flex items-start justify-center bg-black/52 backdrop-blur-[2px] px-3 py-4 lg:px-8 lg:py-6"
                    role="dialog"
                    aria-modal="true"
                    aria-label={selectedPolicy.documentTitle}
                    onClick={() => setIsPolicyOpen(false)}
                >
                    <div
                        className="relative w-full lg:w-[min(96vw,1460px)] h-[96vh] lg:h-[calc(100vh-48px)] rounded-2xl bg-[#F6F6F6] overflow-hidden shadow-[0_28px_95px_rgba(0,0,0,0.38)]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsPolicyOpen(false)}
                            className="absolute right-5 top-4 lg:right-6 lg:top-5 z-20 h-12 w-12 lg:h-16 lg:w-16 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-200 hover:scale-105"
                            aria-label="Close policy"
                        >
                            <X size={34} strokeWidth={3.2} />
                        </button>

                        <div className="h-full flex flex-col">
                            <div className="px-6 lg:px-12 pt-9 lg:pt-10 pb-6 border-b border-[#F2B7A2]">
                                <h2 className="pr-16 lg:pr-24 text-[32px] lg:text-[60px] font-medium leading-[1.06] tracking-[-1.4px] text-primary" style={headingFont}>
                                    {selectedPolicy.documentTitle}
                                </h2>
                            </div>

                            <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-8 lg:py-10 text-[#2E3134] [scrollbar-width:thin] [scrollbar-color:#FA6E43_#E2E2E2] [&::-webkit-scrollbar]:w-[10px] [&::-webkit-scrollbar-track]:bg-[#E2E2E2] [&::-webkit-scrollbar-thumb]:bg-[#FA6E43] [&::-webkit-scrollbar-thumb]:rounded-full">
                                <PolicyContent content={selectedPolicy.content} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
