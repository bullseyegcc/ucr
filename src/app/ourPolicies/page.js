import { Check, ArrowRight } from 'lucide-react';

export default function OurPolicies() {
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-[50vh] lg:min-h-[60vh] lg:min-h-[70vh] font-medium bg-black font-sans dark:bg-black bg-[url('/policiesbg.png')] bg-cover bg-center bg-no-repeat">
                <div className="flex flex-col items-center gap-3 lg:gap-4 lg:gap-6 px-4">
                    <p className="text-primary text-xs lg:text-sm lg:text-base font-semibold tracking-widest uppercase">UCR  POLICIES</p>
                    <h1 className="text-4xl lg:text-5xl lg:text-6xl text-white font-bold">Our Policies</h1>
                </div>
            </div>

            <div className='w-full px-4 lg:px-10 lg:px-20 py-12 lg:py-16 lg:py-20 '>
                {/* Header */}
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





                    {/* Left Column */}
                    <div className="w-full lg:w-2/5 flex flex-col gap-4 lg:gap-6 lg:gap-8">


                        <button className="flex items-center gap-2 lg:gap-3 bg-primary hover:bg-orange-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full w-fit transition-all duration-300">
                            <div className="w-5 lg:w-6 h-5 lg:h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                <Check size={14} className="lg:w-4 lg:h-4" color="#FA6E43" strokeWidth={3} />
                            </div>
                            <span className="text-xs lg:text-sm font-semibold">UCR Responsible Supply Chain Policy</span>
                        </button>

                        <div className="flex flex-col gap-3 lg:gap-4 lg:gap-5">
                            <div className="flex items-center gap-3 lg:gap-4">
                                <Check size={20} className="lg:w-6 lg:h-6 flex-shrink-0" color="#FA6E43" strokeWidth={2.5} />
                                <span className="text-gray-900 text-base lg:text-lg font-medium">A Whistleblower Policy</span>
                            </div>

                            <div className="flex items-center gap-3 lg:gap-4">
                                <Check size={20} className="lg:w-6 lg:h-6 flex-shrink-0" color="#FA6E43" strokeWidth={2.5} />
                                <span className="text-gray-900 text-base lg:text-lg font-medium">E Supplier Code Of Conduct Policy</span>
                            </div>

                            <div className="flex items-center gap-3 lg:gap-4">
                                <Check size={20} className="lg:w-6 lg:h-6 flex-shrink-0" color="#FA6E43" strokeWidth={2.5} />
                                <span className="text-gray-900 text-base lg:text-lg font-medium">E Labor Rights Policy</span>
                            </div>

                            <div className="flex items-center gap-3 lg:gap-4">
                                <Check size={20} className="lg:w-6 lg:h-6 flex-shrink-0" color="#FA6E43" strokeWidth={2.5} />
                                <span className="text-gray-900 text-base lg:text-lg font-medium">E Environmental Policy</span>
                            </div>

                            <div className="flex items-center gap-3 lg:gap-4">
                                <Check size={20} className="lg:w-6 lg:h-6 flex-shrink-0" color="#FA6E43" strokeWidth={2.5} />
                                <span className="text-gray-900 text-base lg:text-lg font-medium">E Diversity Equity And Inclusion Policy</span>
                            </div>

                            <div className="flex items-center gap-3 lg:gap-4">
                                <Check size={20} className="lg:w-6 lg:h-6 flex-shrink-0" color="#FA6E43" strokeWidth={2.5} />
                                <span className="text-gray-900 text-base lg:text-lg font-medium">E Human Rights Policy</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-full lg:w-3/5 flex flex-col gap-4 lg:gap-5 lg:gap-6 bg-white rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl px-4 lg:px-8 lg:px-10 py-8 lg:py-10 lg:py-12">
                        <div>
                            <h2 className="text-2xl lg:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                                UCR responsible supply chain policy
                            </h2>
                            <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                                This focus on the supply chain policy outlines our commitment to maintaining transparent and ethical practices across our global operations. We prioritize quality, accountability, and sustainability at every step of our supply chain to ensure we deliver excellence to our partners and customers worldwide.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 lg:gap-5 mt-4 lg:mt-6">
                            <div>
                                <h3 className="text-gray-900 font-semibold mb-1 lg:mb-2 text-sm lg:text-base">1. Overview</h3>
                                <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                                    A comprehensive framework that establishes our expectations and commitments across all business relationships and supplier engagements.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-gray-900 font-semibold mb-1 lg:mb-2 text-sm lg:text-base">2. Scope</h3>
                                <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                                    Applies to all company employees, contractors, suppliers, agents and vendors who represent or conduct business on our behalf. Encompasses third-party interactions at all operational levels.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-gray-900 font-semibold mb-1 lg:mb-2 text-sm lg:text-base">3. Ethical Business Practices</h3>
                                <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                                    We maintain integrity through fair competition, honest communication, anti-bribery protocols, and zero tolerance for corruption. Compliance monitoring ensures accountability and reliable operations across all tiers.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-gray-900 font-semibold mb-1 lg:mb-2 text-sm lg:text-base">4. Human Rights & Labor Standards</h3>
                                <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">
                                    This policy applies to all suppliers regarding labor practices, free employment choice, fair wages, safe working conditions, and the prohibition against slavery and child labor in supply chains.
                                </p>
                            </div>
                        </div>

                        <button className="flex items-center gap-2 bg-primary hover:bg-orange-600 text-white px-5 lg:px-8 py-2 lg:py-3 rounded-full w-fit mt-4 lg:mt-6 transition-all duration-300">
                            <span className="text-xs lg:text-sm font-semibold">Read more</span>
                            <ArrowRight size={16} className="lg:w-5 lg:h-5" strokeWidth={2.5} />
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}
