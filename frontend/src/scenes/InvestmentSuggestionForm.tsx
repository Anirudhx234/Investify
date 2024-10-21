import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import FormTextInput from "../components/FormTextInput";
import Modal from "../components/Modal";

type InvestmentSuggestionRequest = {
    age: number;
    salary: number;
};

export default function InvestmentSuggestionForm() {
    const form = useForm<InvestmentSuggestionRequest>();
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDialogElement>(null);

    const generateSuggestions = (age: number, salary: number): string[] => {
        const suggestionList: string[] = [];

        if (age < 30) {
            suggestionList.push("High-risk stocks or ETFs with growth potential");
            suggestionList.push("Cryptocurrency (Bitcoin, Ethereum)");
        } else if (age < 50) {
            suggestionList.push("Balanced mutual funds or index funds");
            suggestionList.push("Real estate investment trusts (REITs)");
        } else {
            suggestionList.push("Low-risk bonds or dividend-paying stocks");
            suggestionList.push("Annuities or retirement funds");
        }

        if (salary > 100000) {
            suggestionList.push("Consider diversifying into private equity");
            suggestionList.push("Luxury real estate or vacation properties");
        } else if (salary > 50000) {
            suggestionList.push("Look into tax-efficient investment options");
            suggestionList.push("Explore additional retirement accounts like IRAs");
        } else {
            suggestionList.push("Focus on low-cost index funds");
            suggestionList.push("Consider increasing your emergency savings");
        }

        return suggestionList;
    };

    const onSubmit: SubmitHandler<InvestmentSuggestionRequest> = (data) => {
        const { age, salary } = data;
        const generatedSuggestions = generateSuggestions(age, salary);
        setSuggestions(generatedSuggestions);
        setIsModalOpen(true);
        modalRef.current?.showModal();
    };

    const onModalExit = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex w-full flex-col gap-4">
            <h1 className="text-center font-bold ~text-2xl/3xl">
                Investment Suggestions
            </h1>
            <p className="text-center">Get personalized investment advice!</p>

            <form
                className="flex flex-col"
                onSubmit={form.handleSubmit(onSubmit)}
                aria-label="investment-form"
            >
                {/* Age input */}
                <FormTextInput
                    name="age"
                    labelText="Age"
                    registerInputProps={form.register("age", {
                        required: "Age is required",
                        min: { value: 18, message: "You must be at least 18 years old" },
                        max: { value: 100, message: "Please enter a valid age" },
                    })}
                    errors={form.formState.errors}
                    autoComplete="age"
                    type="number"
                />

                <FormTextInput
                    name="salary"
                    labelText="Annual Salary"
                    registerInputProps={form.register("salary", {
                        required: "Salary is required",
                        min: { value: 10000, message: "Please enter a valid salary" },
                    })}
                    errors={form.formState.errors}
                    autoComplete="salary"
                    type="number"
                />

                <button className="btn btn-primary mt-4" type="submit">
                    Get Suggestions
                </button>
            </form>

            <Modal
                ref={modalRef}
                title="Investment Suggestions"
                isOpen={isModalOpen}
                onExit={onModalExit}
            >
                <ul className="py-4">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} className="py-2">
                            {suggestion}
                        </li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
}
