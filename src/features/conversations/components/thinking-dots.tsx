"use client";
import { motion } from "framer-motion";
export function ThinkingDots() {
  return (
    <div className="flex gap-1 items-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.25,
          }}
        />
      ))}
    </div>
  );
}
