import React, { useState, Children, HTMLAttributes, ReactNode, ButtonHTMLAttributes } from "react";
import { StepContentWrapper } from "./StepWrapper/StepWrapper";
import { StepConnector, StepIndicator } from "./Step/Step";
import { STEPPER_DIRECTION_NEXT, STEPPER_DIRECTION_PREVIOUS } from "./Constants";

import "./Stepper.css";

interface ButtonProps {
    onChange?: ButtonHTMLAttributes<HTMLButtonElement>;
    text?: string;
    disabled?: boolean;
}

interface StepIndicatorProps {
    step: number;
    currentStep: number;
    onClick: (clicked: number) => void;
}

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
    step?: number;
    children: ReactNode;
    onStepChange?: (step: number) => void;
    onCompletion?: () => void;
    nextButton?: ButtonProps;
    previousButton?: ButtonProps;
    stepIndicator?: (props: StepIndicatorProps) => ReactNode;
    disabledStepIndicator?: boolean;
}

export default function Stepper({
    children,
    step = 1,
    onStepChange = () => {},
    onCompletion = () => {},
    nextButton = { text: "Next", onChange: {}, disabled: false },
    previousButton = { text: "Back", onChange: {}, disabled: false },
    stepIndicator,
    disabledStepIndicator = false,
}: StepperProps) {
    const [direction, setDirection] = useState<typeof STEPPER_DIRECTION_PREVIOUS | typeof STEPPER_DIRECTION_NEXT>(STEPPER_DIRECTION_NEXT);
    const [currentStep, setCurrentStep] = useState<number>(step);
    const stepCount = Children.count(children);

    const updateStep = (update: number) => {
        setCurrentStep(update);
        update > stepCount ? onCompletion() : onStepChange(update);
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setDirection(STEPPER_DIRECTION_PREVIOUS);
            updateStep(currentStep - 1);
        }
    };

    const handleNext = () => {
        if (!(currentStep === stepCount)) {
            setDirection(STEPPER_DIRECTION_NEXT);
            updateStep(currentStep + 1);
        }
    };

    const handleComplete = () => {
        setDirection(STEPPER_DIRECTION_NEXT);
        updateStep(stepCount + 1);
    };

    return (
        <div className="stepper-container">
            <div className={"transition-container"}>
                <div className={"step-indicator-container"}>
                    {Children.toArray(children).map((_, index) => {
                        const step = index + 1;
                        return (
                            <React.Fragment key={step}>
                                {stepIndicator ? (
                                    stepIndicator({
                                        step,
                                        currentStep,
                                        onClick: (selectedStep) => {
                                            setDirection(selectedStep > currentStep ? STEPPER_DIRECTION_NEXT : STEPPER_DIRECTION_PREVIOUS);
                                            updateStep(selectedStep);
                                        },
                                    })
                                ) : (
                                    <StepIndicator
                                        step={step}
                                        disableStepIndicators={disabledStepIndicator}
                                        currentStep={currentStep}
                                        onClickStep={(selectedStep) => {
                                            setDirection(selectedStep > currentStep ? STEPPER_DIRECTION_NEXT : STEPPER_DIRECTION_PREVIOUS);
                                            updateStep(selectedStep);
                                        }}
                                    />
                                )}
                                {index < stepCount - 1 && <StepConnector isComplete={currentStep > step} />}
                            </React.Fragment>
                        );
                    })}
                </div>

                <StepContentWrapper direction={direction} currentStep={currentStep} stepCount={stepCount}>
                    {Children.toArray(children)[currentStep - 1]}
                </StepContentWrapper>

                {!(currentStep > stepCount) && (
                    <div className={`footer-container`}>
                        <div className={`footer-nav ${currentStep !== 1 ? "spread" : "end"}`}>
                            {currentStep !== 1 && (
                                <button onClick={handlePrevious} className={`previous-button-container ${currentStep === 1 ? "inactive" : ""}`} disabled={previousButton.disabled} {...previousButton.onChange}>
                                    {previousButton.text || "Back"}
                                </button>
                            )}
                            <button onClick={currentStep === stepCount ? handleComplete : handleNext} className="next_button-container" disabled={nextButton.disabled} {...nextButton.onChange}>
                                {currentStep === stepCount ? "Complete" : nextButton.text || "Next"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
