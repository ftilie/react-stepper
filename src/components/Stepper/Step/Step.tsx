import React, { ReactNode, type JSX } from "react";
import { motion, Variants } from "framer-motion";

import "./Step.css";

interface StepProps {
    children: ReactNode;
}

export function Step({ children }: StepProps): JSX.Element {
    return <div className="step-default">{children}</div>;
}

interface StepIndicatorProps {
    step: number;
    currentStep: number;
    onClickStep: (step: number) => void;
    disableStepIndicators?: boolean;
}

export function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators }: StepIndicatorProps) {
    const status = currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";

    const handleClick = () => {
        if (step !== currentStep && !disableStepIndicators) {
            onClickStep(step);
        }
    };

    return (
        <motion.div onClick={handleClick} className="step-indicator" animate={status} initial={false}>
            <motion.div
                variants={{
                    inactive: { scale: 1, backgroundColor: "#52525b", color: "#ffffff" },
                    active: { scale: 1, backgroundColor: "#0A66C2", color: "#0A66C2" },
                    complete: { scale: 1, backgroundColor: "#0A66C2", color: "#0A66C2" },
                }}
                transition={{ duration: 0.3 }}
                className="step-indicator-inner"
            >
                {status === "complete" ? <CheckIcon className="check-icon" /> : status === "active" ? <div className="active-dot" /> : <span className="step-number">{step}</span>}
            </motion.div>
        </motion.div>
    );
}

interface StepConnectorProps {
    isComplete: boolean;
}

export function StepConnector({ isComplete }: StepConnectorProps) {
    const lineVariants: Variants = {
        incomplete: { width: 0, backgroundColor: "transparent" },
        complete: { width: "100%", backgroundColor: "#0A66C2" },
    };

    return (
        <div className="step-connector">
            <motion.div className="step-connector-inner" variants={lineVariants} initial={false} animate={isComplete ? "complete" : "incomplete"} transition={{ duration: 0.4 }} />
        </div>
    );
}

interface CheckIconProps extends React.SVGProps<SVGSVGElement> {}

function CheckIcon(props: CheckIconProps) {
    return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.1, type: "tween", ease: "easeOut", duration: 0.3 }} strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    );
}
