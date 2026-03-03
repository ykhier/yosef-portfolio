import { motion } from "framer-motion";

// Ready-to-use motion components (uppercase avoids ESLint no-unused-vars)
export const MotionDiv = motion.div;
export const MotionUl  = motion.ul;
export const MotionLi  = motion.li;

// Shared animation variants
const EASE = [0.22, 1, 0.36, 1];

// Section card slides up and fades in
export const fadeUp = {
    hidden: { opacity: 0, y: 52 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, ease: EASE },
    },
};

// Parent grid — staggers its children
export const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

// Individual card inside a stagger container
export const staggerCard = {
    hidden: { opacity: 0, y: 30, scale: 0.93 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.45, ease: EASE },
    },
};
