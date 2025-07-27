import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Transition } from "../Transition/Transition";
import { STEPPER_DIRECTION_NEXT, STEPPER_DIRECTION_PREVIOUS } from "../Constants";

import "./StepWrapper.css";

interface StepContentWrapperProps {
    direction: typeof STEPPER_DIRECTION_PREVIOUS | typeof STEPPER_DIRECTION_NEXT;
    currentStep: number;
    stepCount: number;
    children: ReactNode;
}

export function StepContentWrapper({ stepCount, currentStep, direction, children }: StepContentWrapperProps) {
    const [height, setHeight] = useState<number>(0);

    return (
        <motion.div className={"step-content-default"} style={{ position: "relative", overflow: "hidden" }} animate={{ height: currentStep > stepCount ? 0 : height }} transition={{ type: "spring", duration: 0.4 }}>
            <AnimatePresence initial={false} mode="sync" custom={direction}>
                {!(currentStep > stepCount) && (
                    <Transition key={currentStep} direction={direction} setHeight={(h) => setHeight(h)}>
                        {children}
                    </Transition>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
