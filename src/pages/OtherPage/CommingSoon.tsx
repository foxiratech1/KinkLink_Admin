import { motion } from "framer-motion";

export default function ComingSoon() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#161950] via-[#28264D] to-black text-white">
            {/* Soft ambient background */}
            <div className="absolute inset-0">
                {[...Array(14)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/5"
                        initial={{
                            x: Math.random() * 100 + "vw",
                            y: Math.random() * 100 + "vh",
                            scale: Math.random() * 0.6 + 0.4,
                        }}
                        animate={{
                            x: Math.random() * 100 + "vw",
                            y: Math.random() * 100 + "vh",
                        }}
                        transition={{
                            duration: Math.random() * 14 + 12,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                        style={{
                            width: Math.random() * 20 + 12,
                            height: Math.random() * 20 + 12,
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-10"
                >
                    <img
                        src="/images/logo/Mainlogo.png"
                        alt="KinkLink"
                        className="mx-auto h-20 w-auto"
                    />
                </motion.div>

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-10 max-w-3xl"
                >
                    <h1 className="mb-5 text-4xl md:text-5xl font-semibold leading-tight">
                        A Safer Space for
                        <span className="block text-[#979ECA]">
                            Real Connections
                        </span>
                    </h1>

                    <p className="text-lg text-gray-300">
                        KinkLink is building a private, verified, and respectful platform
                        designed for authentic interactions.
                        We’re preparing something meaningful.
                    </p>
                </motion.div>

                {/* Divider */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "120px" }}
                    transition={{ delay: 0.6 }}
                    className="mb-10 h-[2px] bg-[#A50134]"
                />

                {/* Email capture */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="w-full max-w-md"
                >
                    <div className="flex overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur">
                        <input
                            type="email"
                            placeholder="Enter your email for early access"
                            className="flex-1 bg-transparent px-6 py-4 text-white placeholder-gray-400 outline-none"
                        />
                        <button className="bg-[#A50134] px-6 font-medium transition hover:bg-[#8c012c]">
                            Notify Me
                        </button>
                    </div>
                </motion.div>

                {/* Footer text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-10 text-xs text-gray-500"
                >
                    © KinkLink • Privacy-first • Launching soon
                </motion.p>
            </div>
        </div>
    );
}
