import { useState } from "react";
import Stepper from "./components/Stepper/Stepper";
import "./App.css";
import { Step } from "./components/Stepper/Step/Step";

function App() {
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <div className="app" style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
            <h1>React Stepper Component</h1>
            <p>Current Step: {currentStep}</p>
            <Stepper step={1} onStepChange={(step) => setCurrentStep(step)} onCompletion={() => console.log("Stepper completed!")}>
                <Step>
                    <h2>Personal Information</h2>
                    <p>Enter your personal details here.</p>
                    <input type="text" placeholder="Full Name" style={{ backgroundColor: "#eeeeee", color: "#52525b" }} />
                    <input type="email" placeholder="Email" style={{ backgroundColor: "#eeeeee", color: "#52525b" }} />
                </Step>

                <Step>
                    <h2>Address Information</h2>
                    <p>Provide your address details.</p>
                    <input type="text" placeholder="Street Address" style={{ backgroundColor: "#eeeeee", color: "#52525b" }} />
                    <input type="text" placeholder="City" style={{ backgroundColor: "#eeeeee", color: "#52525b" }} />
                    <input type="text" placeholder="ZIP Code" style={{ backgroundColor: "#eeeeee", color: "#52525b" }} />
                </Step>

                <Step>
                    <h2>Confirmation</h2>
                    <p>Review and confirm your information.</p>
                    <div style={{ padding: "1rem", background: "#f0f0f0", borderRadius: "4px" }}>
                        <p>Please review all the information you've entered before proceeding.</p>
                    </div>
                </Step>
            </Stepper>
        </div>
    );
}

export default App;
