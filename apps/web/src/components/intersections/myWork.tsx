'use client'
import { ArrowDown } from "lucide-react";
import { motion } from "motion/react";

export function MyWork() {
  return (
    <div className="border-b gap-14">
      <div className="flex items-center justify-center mr-17 ml-17.5 border-x px-8">
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <ArrowDown size={80} />
        </motion.div>
        <p className="text-9xl py-4">My work</p>
      </div>
    </div>
  )
}