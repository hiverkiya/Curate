"use client";

import { Poppins } from "next/font/google";
import { SquareTerminalIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const CHARS = "01アイウエオカキクケコABCDEF{}[]<>/\\";

const CodeStream = ({ x, delay }: { x: string; delay: number }) => {
  const [chars, setChars] = useState<string[]>([]);

  useEffect(() => {
    const generate = () =>
      Array.from(
        { length: 12 },
        () => CHARS[Math.floor(Math.random() * CHARS.length)],
      );
    setChars(generate());
    const interval = setInterval(() => {
      setChars((prev) => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * next.length);
        next[idx] = CHARS[Math.floor(Math.random() * CHARS.length)];
        return next;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute top-0 flex flex-col gap-3 font-mono text-[10px] text-blue-400/20 select-none pointer-events-none"
      style={{ left: x }}
      animate={{ y: ["-10%", "110%"] }}
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {chars.map((c, i) => (
        <span key={i} style={{ opacity: 1 - i * 0.07 }}>
          {c}
        </span>
      ))}
    </motion.div>
  );
};

const streams = [
  { x: "5%", delay: 0 },
  { x: "15%", delay: 3 },
  { x: "28%", delay: 7 },
  { x: "42%", delay: 1.5 },
  { x: "58%", delay: 5 },
  { x: "70%", delay: 2.5 },
  { x: "82%", delay: 8 },
  { x: "92%", delay: 4 },
];

const CornerBracket = ({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) => {
  const base = "absolute w-5 h-5";
  const border = "border-blue-500/40";
  const styles = {
    tl: `${base} top-3 left-3 border-t border-l ${border}`,
    tr: `${base} top-3 right-3 border-t border-r ${border}`,
    bl: `${base} bottom-3 left-3 border-b border-l ${border}`,
    br: `${base} bottom-3 right-3 border-b border-r ${border}`,
  };
  return <div className={styles[position]} />;
};

const BlinkingCursor = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);
  return (
    <span
      className="inline-block w-[2px] h-4 bg-blue-400 ml-1 align-middle"
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
};

export const UnauthenticatedView = () => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-sidebar overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {streams.map((s, i) => (
          <CodeStream key={i} x={s.x} delay={s.delay} />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-3xl"
          animate={{ x: [-80, 80, -80], y: [-40, 40, -40] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-blue-400/8 rounded-full blur-3xl"
          animate={{ x: [80, -80, 80], y: [40, -40, 40] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm mx-auto px-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.04, 1],
              filter: [
                "brightness(1.10)",
                "brightness(1.25)",
                "brightness(1.10)",
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/logo.svg"
              alt="Curate"
              width={32}
              height={32}
              className="brightness-110 contrast-125"
            />
          </motion.div>
          <h1 className={cn("text-4xl font-semibold", font.className)}>
            Curate
          </h1>
        </motion.div>

        <motion.div
          className="w-full h-px bg-border"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />

        <motion.div
          className="relative w-full rounded-lg border border-blue-500/25 bg-background/70 backdrop-blur-md p-8 flex flex-col items-center gap-6"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <CornerBracket position="tl" />
          <CornerBracket position="tr" />
          <CornerBracket position="bl" />
          <CornerBracket position="br" />

          <motion.div
            className="font-mono text-[10px] text-blue-400/50 self-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {">"} auth.status:{" "}
            <span className="text-blue-400">unauthenticated</span>
          </motion.div>

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.5,
              type: "spring",
              stiffness: 180,
              damping: 14,
            }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-400/15 blur-lg"
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.3, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative rounded-full bg-blue-500/10 border border-blue-500/25 p-4">
              <SquareTerminalIcon className="w-7 h-7 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            className="text-center space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h2
              className={cn(
                "text-lg font-semibold text-foreground uppercase flex items-center justify-center",
                font.className,
              )}
            >
              AI-Powered Cloud IDE
              <BlinkingCursor />
            </h2>
            <p className="text-sm text-muted-foreground font-mono">
              One step away from magic
            </p>
          </motion.div>

          <motion.div
            className="font-mono text-[10px] text-blue-400/40 self-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            session_id: <span className="text-blue-400/60">0x4A2F</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="w-full"
          >
            <SignInButton>
              <Button
                variant="outline"
                size="default"
                className="w-full border-blue-500/25 uppercase font-mono tracking-widest hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300"
              >
                {">"} Sign In
              </Button>
            </SignInButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
