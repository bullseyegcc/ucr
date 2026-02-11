import { Badgetextwhite } from "../common/badge"

export default function contactus() {
    return (
        <div>
            <div className="relative flex min-h-[80vh] items-center justify-center bg-black font-sans bg-primary flex flex-col gap-6 md:gap-8 lg:gap-10 px-4">
                <Badgetextwhite title="Reach Us " />
                <h1 className="w-full max-w-4xl text-center text-3xl md:text-5xl lg:text-7xl font-bold text-white font-inter">Contact Details</h1>
            </div>

            {/* Let's Connect Section */}
            <div className="w-full px-4 md:px-10 lg:px-20 py-12 md:py-16 lg:py-20 bg-[#F5F5F5] font-inter leading-tight">
                {/* Header Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-6 mb-12 md:mb-16 leading-tight">
                    <div>
                        <p className="uppercase text-[#FA6E43] text-xs md:text-lg font-semibold uppercase tracking-widest mb-3 md:mb-4 font-inter">Contact us</p>
                        <h2 className="text-3xl md:text-4xl font-bold lg:text-6xl font-bold text-black font-inter leading-tight">Let's connect</h2>
                    </div>
                    <div className="flex items-start self-center">
                        <p className="text-gray-700 text-sm md:text-2xl leading-relaxed  lg:text-left max-w-lg leading-tight ml-auto">Whether you're ready to start or just curious, we'd love to hear from you.</p>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-8">
                    {/* Left Column */}
                    <div>
                        {/* Person Card */}
                        <div className="bg-white rounded-lg p-4 md:p-8 mb-8 md:mb-12">
                            <div className="flex items-start gap-3 md:gap-6">
                                <img src="/person.png" alt="Team member" className="w-16 md:w-40 h-16 md:h-40 rounded-lg object-cover flex-shrink-0" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 text-sm md:text-2xl mb-1 md:mb-3">Hey there!</h3>
                                    <p className="text-gray-600 text-xs md:text-base leading-tight md:leading-relaxed mb-3 md:mb-5">Whether you need quick answers or deep strategy talks, I'm here to make your journey smooth.</p>
                                    <a href="#" className="text-[#FA6E43] text-xs md:text-sm font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
                                        Book a call directly with HR
                                        <span>→</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Details - 2x2 Grid */}
                        <div className="grid grid-cols-2 gap-3 md:gap-6">
                            {/* Box 1: Connect */}
                            <div className="bg-white rounded-lg p-3 md:p-6">
                                <h4 className="text-gray-900 font-semibold text-xs md:text-base mb-2 md:mb-4">Connect</h4>
                                <div className="space-y-1">
                                    <a href="#" className="text-gray-700 text-xs md:text-sm hover:text-[#FA6E43] transition-colors block underline">Instagram</a>
                                    <a href="#" className="text-gray-700 text-xs md:text-sm hover:text-[#FA6E43] transition-colors block underline">LinkedIn</a>
                                    <a href="#" className="text-gray-700 text-xs md:text-sm hover:text-[#FA6E43] transition-colors block underline">Twitter</a>
                                </div>
                            </div>

                            {/* Box 2: Fax */}
                            <div className="flex flex-col justify-between bg-white rounded-lg p-3 md:p-6">
                                <h4 className="text-gray-900 font-semibold text-xs md:text-base mb-2 md:mb-3">Fax</h4>
                                <p className="text-[#FA6E43] text-xs md:text-sm font-semibold">+971 2 550 3240</p>
                            </div>

                            {/* Box 3: Reach Out */}
                            <div className="bg-white rounded-lg p-3 md:p-6 flex flex-col justify-between">
                                <h4 className="text-gray-900 font-semibold text-xs md:text-base mb-2 md:mb-4">Reach Out</h4>
                                <div className="space-y-2 md:space-y-4">
                                    <a href="mailto:info@ucrccopper.ae" className="text-[#FA6E43] text-xs md:text-sm font-semibold hover:underline block">info@ucrccopper.ae</a>
                                    <a href="tel:+971255033240" className="text-[#FA6E43] text-xs md:text-sm font-semibold block">+971 2 550 3240</a>
                                </div>
                            </div>

                            {/* Box 4: Office */}
                            <div className="flex flex-col justify-between bg-white rounded-lg p-3 md:p-6">
                                <h5 className="text-gray-900 font-semibold text-xs md:text-base mb-2 md:mb-3">Office</h5>
                                <div className="space-y-1 text-gray-600 text-xs md:text-sm leading-tight md:leading-relaxed">
                                    <p>Mussafah,</p>
                                    <p>Industrial Area of AbuDhabi(ICAD1)</p>
                                    <p>P.O.Box 112231,</p>
                                    <p>Abu Dhabi, UAE</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="bg-white rounded-lg p-4 md:p-12">
                        <h3 className="text-xl md:text-4xl font-bold text-gray-900 mb-5 md:mb-8 font-inter">Contact us</h3>
                        
                        <form className="space-y-3 md:space-y-5">
                            {/* First Name */}
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="First Name"
                                    className="w-full px-0 py-2 md:py-3 border-b border-gray-300 text-xs md:text-sm focus:outline-none focus:border-[#FA6E43] bg-white placeholder-gray-400"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <input 
                                    type="email" 
                                    placeholder="Email"
                                    className="w-full px-0 py-2 md:py-3 border-b border-gray-300 text-xs md:text-sm focus:outline-none focus:border-[#FA6E43] bg-white placeholder-gray-400"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <input 
                                    type="tel" 
                                    placeholder="Phone"
                                    className="w-full px-0 py-2 md:py-3 border-b border-gray-300 text-xs md:text-sm focus:outline-none focus:border-[#FA6E43] bg-white placeholder-gray-400"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <textarea 
                                    placeholder="Message"
                                    rows="4"
                                    className="w-full px-0 py-2 md:py-3 border-b border-gray-300 text-xs md:text-sm focus:outline-none focus:border-[#FA6E43] bg-white placeholder-gray-400 resize-none"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4 md:pt-8">
                                <button 
                                    type="submit"
                                    className="w-full bg-black hover:bg-gray-900 text-white py-3 md:py-4 rounded-full font-semibold text-xs md:text-sm transition-colors duration-300"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>

                        {/* Privacy Notice */}
                        <p className="text-gray-600 text-xs md:text-sm text-center mt-3 md:mt-6 leading-tight md:leading-relaxed">
                            By submitting, you agree to our <a href="#" className="underline hover:text-gray-900">Terms & Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}