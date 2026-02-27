'use client'

import { Badgetextwhite } from "../../common/badge"
import CardAnimation from "../../animations/CardAnimation"
import FadeIn from "../../animations/FadeIn"
import SlideIn from "../../animations/SlideIn"

export default function contactus() {
    return (
        <div>
            <div className="relative flex min-h-[60vh] lg:min-h-[80vh] items-center justify-center bg-black font-sans bg-primary flex flex-col gap-6 lg:gap-8 lg:gap-10 px-4">
                <SlideIn direction="bottom" duration={0.8} delay={0}>
                    <Badgetextwhite title="Reach Us " />
                </SlideIn>
                <FadeIn className="font-medium text-[32px] leading-[52px] tracking-[-1.18px] sm:text-[64px] sm:leading-[99px] sm:tracking-[-2.5px] text-center align-middle capitalize text-white w-full max-w-4xl" duration={0.4} delay={0}>
                    Contact Details
                </FadeIn>
            </div>

            {/* Let's Connect Section */}
            <div className="w-full px-4 lg:px-10 lg:px-20 py-12 lg:py-16 lg:py-20 bg-[#F5F5F5] leading-tight">
                {/* Header Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-6 mb-12 lg:mb-16 leading-tight">
                    <div>
                        <SlideIn direction="left" duration={0.9} >
                            <p className="uppercase text-[#FA6E43] text-xs lg:text-lg font-medium uppercase tracking-widest mb-3 lg:mb-4">Contact us</p>

                            <h2 className="font-primary font-medium text-[32px] lg:text-[62px] leading-[48px] lg:leading-[70px] tracking-[-1.86px] align-middle text-black">
                                Let's connect
                            </h2>
                        </SlideIn>
                    </div>
                    <SlideIn direction="right" duration={0.9} delay={0.2} >
                    <div className="flex items-start self-center">

                        <p className="text-gray-700 text-base leading-[28px] tracking-[-0.2px] lg:text-2xl lg:leading-relaxed max-w-[361px] lg:max-w-lg ml-auto">Whether you're ready to start or just curious, we'd love to hear from you.</p>
                    </div>
                    </SlideIn>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
                    {/* Left Column */}
                    <div className="hidden lg:block">
                        {/* Person Card */}
                        <CardAnimation index={0} className="bg-white rounded-lg p-4 lg:p-8 mb-8 lg:mb-12 group hover:shadow-xl hover:scale-105 transition-all duration-400">
                            <div className="flex items-start gap-3 lg:gap-6">
                                <img src="/person.png" alt="Team member" className="w-16 lg:w-40 h-16 lg:h-40 rounded-lg object-cover flex-shrink-0" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 text-sm lg:text-2xl mb-1 lg:mb-3">Hey there!</h3>
                                    <p className="text-gray-600 text-xs lg:text-base leading-tight lg:leading-relaxed mb-3 lg:mb-5">Whether you need quick answers or deep strategy talks, I'm here to make your journey smooth.</p>
                                    <a href="#" className="text-[#FA6E43] text-xs lg:text-sm font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
                                        Book a call directly with HR
                                        <span>→</span>
                                    </a>
                                </div>
                            </div>
                        </CardAnimation>

                        {/* Contact Details - 2x2 Grid */}
                        <div className="grid grid-cols-2 gap-3 lg:gap-2">
                            {/* Box 1: Connect */}
                            <CardAnimation index={1} className="bg-white rounded-lg p-3 lg:p-6 group hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                                <h4 className="text-gray-900 font-semibold text-xs lg:text-base mb-2 lg:mb-4">Connect</h4>
                                <div className="space-y-1">
                                    <a href="#" className="text-gray-700 text-xs lg:text-sm hover:text-[#FA6E43] transition-colors duration-300 block underline">Instagram</a>
                                    <a href="#" className="text-gray-700 text-xs lg:text-sm hover:text-[#FA6E43] transition-colors duration-300 block underline">LinkedIn</a>
                                    <a href="#" className="text-gray-700 text-xs lg:text-sm hover:text-[#FA6E43] transition-colors duration-300 block underline">Twitter</a>
                                </div>
                            </CardAnimation>

                            {/* Box 2: Fax */}
                            <CardAnimation index={2} className="flex flex-col justify-between bg-white rounded-lg p-3 lg:p-6 group hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                                <h4 className="text-gray-900 font-semibold text-xs lg:text-base mb-2 lg:mb-3">Fax</h4>
                                <p className="text-[#FA6E43] text-xs lg:text-sm font-semibold">+971 2 550 3240</p>
                            </CardAnimation>

                            {/* Box 3: Reach Out */}
                            <CardAnimation index={3} className="bg-white rounded-lg p-3 lg:p-6 flex flex-col justify-between group hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                                <h4 className="text-gray-900 font-semibold text-xs lg:text-base mb-2 lg:mb-4">Reach Out</h4>
                                <div className="space-y-2 lg:space-y-4">
                                    <a href="mailto:info@ucrccopper.ae" className="text-[#FA6E43] text-xs lg:text-sm font-semibold hover:text-orange-600 transition-colors duration-300 block">info@ucrccopper.ae</a>
                                    <a href="tel:+971255033240" className="text-[#FA6E43] text-xs lg:text-sm font-semibold hover:text-orange-600 transition-colors duration-300 block">+971 2 550 3240</a>
                                </div>
                            </CardAnimation>

                            {/* Box 4: Office */}
                            <CardAnimation index={4} className="flex flex-col justify-between bg-white rounded-lg p-3 lg:p-6 group hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                                <h5 className="text-gray-900 font-semibold text-xs lg:text-base mb-2 lg:mb-3">Office</h5>
                                <div className="space-y-1 text-gray-600 text-xs lg:text-sm leading-tight lg:leading-relaxed">
                                    <p>Mussafah,</p>
                                    <p>Industrial Area of AbuDhabi(ICAD1)</p>
                                    <p>P.O.Box 112231,</p>
                                    <p>Abu Dhabi, UAE</p>
                                </div>
                            </CardAnimation>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <CardAnimation index={5} className="bg-white rounded-lg p-4 lg:p-12 group hover:shadow-xl transition-all duration-300">
                        <h3 className="text-xl lg:text-4xl font-bold text-gray-900 mb-5 lg:mb-8">Contact us</h3>

                        <form className="space-y-3 lg:space-y-5">
                            {/* First Name */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="w-full px-0 py-2 lg:py-3 border-b border-gray-300 text-xs lg:text-sm focus:outline-none focus:border-[#FA6E43] focus:shadow-sm bg-white placeholder-gray-400 transition-all duration-300"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full px-0 py-2 lg:py-3 border-b border-gray-300 text-xs lg:text-sm focus:outline-none focus:border-[#FA6E43] focus:shadow-sm bg-white placeholder-gray-400 transition-all duration-300"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    className="w-full px-0 py-2 lg:py-3 border-b border-gray-300 text-xs lg:text-sm focus:outline-none focus:border-[#FA6E43] focus:shadow-sm bg-white placeholder-gray-400 transition-all duration-300"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <textarea
                                    placeholder="Message"
                                    rows="4"
                                    className="w-full px-0 py-2 lg:py-3 border-b border-gray-300 text-xs lg:text-sm focus:outline-none focus:border-[#FA6E43] focus:shadow-sm bg-white placeholder-gray-400 resize-none transition-all duration-300"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4 lg:pt-8">
                                <button
                                    type="submit"
                                    className="w-full bg-black hover:bg-[#FA6E43] text-white py-3 lg:py-4 rounded-full font-semibold text-xs lg:text-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>

                        {/* Privacy Notice */}
                        <p className="text-gray-600 text-xs lg:text-sm text-center mt-3 lg:mt-6 leading-tight lg:leading-relaxed">
                            By submitting, you agree to our <a href="#" className="underline hover:text-[#FA6E43] transition-colors duration-300">Terms & Privacy Policy</a>
                        </p>
                    </CardAnimation>
                </div>

                 <div className="mt-8 lg:hidden">
                        {/* Person Card */}
                        <CardAnimation index={0} className="bg-white rounded-lg p-4 lg:p-8 mb-8 lg:mb-12 group hover:shadow-xl hover:scale-105 transition-all duration-400">
                            <div className="flex justify-between items-start gap-3 lg:gap-6">
                                <img src="/person.png" alt="Team member" className="w-16 lg:w-40 h-16 lg:h-40 rounded-lg object-cover flex-shrink-0" />
                                <div className=" w-[50%]">
                                    <h3 className="font-semibold text-gray-900 text-sm lg:text-2xl mb-1 lg:mb-3">Hey there!</h3>
                                    <p className="text-gray-600 text-xs lg:text-base leading-tight lg:leading-relaxed mb-3 lg:mb-5">Whether you need quick answers or deep strategy talks, I'm here to make your journey smooth.</p>
                                    <a href="#" className="text-[#FA6E43] text-xs lg:text-sm font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
                                        Book a call directly with HR
                                        <span>→</span>
                                    </a>
                                </div>
                            </div>
                        </CardAnimation>

                        {/* Contact Details - 2x2 Grid */}
                        <div className="grid grid-cols-2 gap-3 lg:gap-2">
                            {/* Box 1: Connect */}
                            <CardAnimation index={1} className="bg-white rounded-lg p-3 lg:p-6 group hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                                <h4 className="text-gray-900 font-semibold text-xs lg:text-base mb-2 lg:mb-4">Connect</h4>
                                <div className="space-y-1">
                                    <a href="#" className="text-gray-700 text-xs lg:text-sm hover:text-[#FA6E43] transition-colors duration-300 block underline">Instagram</a>
                                    <a href="#" className="text-gray-700 text-xs lg:text-sm hover:text-[#FA6E43] transition-colors duration-300 block underline">LinkedIn</a>
                                    <a href="#" className="text-gray-700 text-xs lg:text-sm hover:text-[#FA6E43] transition-colors duration-300 block underline">Twitter</a>
                                </div>
                            </CardAnimation>

                            {/* Box 2: Fax */}
                            <CardAnimation index={2} className="flex flex-col justify-between bg-white rounded-lg p-3 lg:p-6 group hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                                <h4 className="text-gray-900 font-semibold text-xs lg:text-base mb-2 lg:mb-3">Fax</h4>
                                <p className="text-[#FA6E43] text-xs lg:text-sm font-semibold">+971 2 550 3240</p>
                            </CardAnimation>

                            {/* Box 3: Reach Out */}
                            <CardAnimation index={3} className="bg-white rounded-lg p-3 lg:p-6 flex flex-col justify-between group hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                                <h4 className="text-gray-900 font-semibold text-xs lg:text-base mb-2 lg:mb-4">Reach Out</h4>
                                <div className="space-y-2 lg:space-y-4">
                                    <a href="mailto:info@ucrccopper.ae" className="text-[#FA6E43] text-xs lg:text-sm font-semibold hover:text-orange-600 transition-colors duration-300 block">info@ucrccopper.ae</a>
                                    <a href="tel:+971255033240" className="text-[#FA6E43] text-xs lg:text-sm font-semibold hover:text-orange-600 transition-colors duration-300 block">+971 2 550 3240</a>
                                </div>
                            </CardAnimation>

                            {/* Box 4: Office */}
                            <CardAnimation index={4} className="flex flex-col justify-between bg-white rounded-lg p-3 lg:p-6 group hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                                <h5 className="text-gray-900 font-semibold text-xs lg:text-base mb-2 lg:mb-3">Office</h5>
                                <div className="space-y-1 text-gray-600 text-xs lg:text-sm leading-tight lg:leading-relaxed">
                                    <p>Mussafah,</p>
                                    <p>Industrial Area of AbuDhabi(ICAD1)</p>
                                    <p>P.O.Box 112231,</p>
                                    <p>Abu Dhabi, UAE</p>
                                </div>
                            </CardAnimation>
                        </div>
                    </div>
            </div>
        </div>
    )
}
