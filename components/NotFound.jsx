import Link from 'next/link';
export default function NotFound() {


    return (
        <>
            <div className={`relative`}>
                <div className=" -z-30 absolute top-0 rounded-full bg-violet-300 right-12 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className=" -z-30 absolute rounded-full bg-fuchsia-300 -bottom-24 left-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                <main className="text-center my-8 h-screen flex flex-col justify-evenly w-full">
                    <div>
                        <h2 className="text-4xl font-bold mb-8">NOT FOUND</h2>
                        <p className="text-lg mb-12 text-gray-600">Showcase your brand, connect instantly with a tap and generate profitable leads.</p>
                        <Link href="/" className="relative inline-flex items-center justify-center gap-4 group">
                            <div
                                className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200">
                            </div>
                            <p title="Go Home"
                                className="group relative inline-flex items-center justify-center text-base rounded-xl bg-gray-900 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
                                role="button">Go Home<svg className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2" fill="none" width="10"
                                    height="10" viewBox="0 0 10 10" aria-hidden="true">
                                    <path className="transition opacity-0 group-hover:opacity-100" d="M0 5h7"></path>
                                    <path className="transition group-hover:translate-x-[3px]" d="M1 1l4 4-4 4"></path>
                                </svg>
                            </p>
                        </Link>
                    </div>
                    <footer className="text-center my-8">
                        <p className="text-gray-600">Go Green with Digital Business Cards - Save trees and make connections!</p>
                    </footer>
                </main>
            </div>
        </>
    );
}

