import { useRef, useLayoutEffect, ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { STEPPER_DIRECTION_NEXT, STEPPER_DIRECTION_PREVIOUS } from "../Constants";

import "./Transition.css";

const getSlideDirection = (direction: number) => ({
    enterFrom: direction >= 0 ? "-100%" : "100%",
    exitTo: direction >= 0 ? "50%" : "-50%",
});

const stepVariants: Variants = {
    enter: (d: number) => {
        const { enterFrom } = getSlideDirection(d);
        return {
            x: enterFrom,
            opacity: 0,
        };
    },
    center: {
        x: "0%",
        opacity: 1,
    },
    exit: (d: number) => {
        const { exitTo } = getSlideDirection(d);
        return {
            x: exitTo,
            opacity: 0,
        };
    },
};

interface TransitionProps {
    children: ReactNode;
    direction: typeof STEPPER_DIRECTION_PREVIOUS | typeof STEPPER_DIRECTION_NEXT;
    setHeight: (h: number) => void;
}

export function Transition({ children, direction, setHeight }: TransitionProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (containerRef.current) {
            setHeight(containerRef.current.offsetHeight);
        }
    }, [children, setHeight]);

    return (
        <motion.div ref={containerRef} custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }} style={{ position: "absolute", left: 0, right: 0, top: 0 }}>
            {children}
        </motion.div>
    );
}
