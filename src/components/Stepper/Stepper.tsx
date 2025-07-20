import { ButtonHTMLAttributes, Children, HTMLAttributes, ReactNode, useState } from "react";
import "./Stepper.css";
import React from "react";

const STEPPER_DIRECTION_NEXT = "next";
const STEPPER_DIRECTION_PREVIOUS = "previous";

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

const Stepper = ({
    step = 1,
    children,
    onStepChange = () => {},
    onCompletion = () => {},
    nextButton = { text: "Next", disabled: false },
    previousButton = { text: "Previous", disabled: false },
    stepIndicator,
    disabledStepIndicator = false,
    ...props
}: StepperProps) => {
    const [direction, setDirection] = useState<typeof STEPPER_DIRECTION_PREVIOUS | typeof STEPPER_DIRECTION_NEXT>(STEPPER_DIRECTION_NEXT);
    const [currentStep, setCurrentStep] = useState<number>(step);
    const totalSteps = Children.count(children);
    const isCompleted = currentStep === totalSteps;

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            onStepChange(currentStep + 1);
            setDirection(STEPPER_DIRECTION_NEXT);
        } else {
            onCompletion();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            onStepChange(currentStep - 1);
            setDirection(STEPPER_DIRECTION_PREVIOUS);
        }
    };

    return (
        <div className="outer-container">
            <div className={`step-circle-containe`} style={{ border: "1px solid #222" }}>
                <div className={`step-indicator-row`}>
                    {Children.toArray(children).map((_, index) => {
                        const stepNumber = index + 1;
                        const isLastStep = index === totalSteps - 1;
                        return (
                            <React.Fragment key={stepNumber}>
                                {stepIndicator ? (
                                    stepIndicator({
                                        step: stepNumber,
                                        currentStep,
                                        onClick: (selectedStep) => {
                                            setDirection(selectedStep > currentStep ? STEPPER_DIRECTION_NEXT : STEPPER_DIRECTION_PREVIOUS);
                                            setCurrentStep(selectedStep);
                                        },
                                    })
                                ) : (
                                    // <StepIndicator
                                    //     step={stepNumber}
                                    //     disableStepIndicators={disableStepIndicators}
                                    //     currentStep={currentStep}
                                    //     onClickStep={(clicked) => {
                                    //         setDirection(clicked > currentStep ? 1 : -1);
                                    //         updateStep(clicked);
                                    //     }}
                                    // />
                                    <></>
                                )}
                                {/* {!isLastStep && <StepConnector isComplete={currentStep > stepNumber} />} */}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* <StepContentWrapper isCompleted={isCompleted} currentStep={currentStep} direction={direction} className={`step-content-default ${contentClassName}`}>
                    {stepsArray[currentStep - 1]}
                </StepContentWrapper> */}

                {!isCompleted && (
                    <div className={`footer-container`}>
                        <div className={`footer-nav ${currentStep !== 1 ? "spread" : "end"}`}>
                            {currentStep !== 1 && (
                                <button onClick={handlePrevious} className={`back-button ${currentStep === 1 ? "inactive" : ""}`} {...previousButton.onChange}>
                                    {previousButton.text}
                                </button>
                            )}
                            {/* <button onClick={isLastStep ? handleComplete : handleNext} className="next-button" {...nextButtonProps}>
                                {isLastStep ? "Complete" : nextButtonText}
                            </button> */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stepper;
