export default function Validation2(values) {
    let errors = {};

    if (values.name === "") {
        errors.name = "Name should not be empty";
    } else if (values.name.length < 3 || values.name.length > 30) {
        errors.name = "Name must be between 3 and 30 characters";
    }

    if (values.statement === "") {
        errors.statement = "Problem statement should not be empty";
    }

    if (values.sampleInput === "") {
        errors.sampleInput = "Sample input should not be empty";
    }

    if (values.sampleOutput === "") {
        errors.sampleOutput = "Sample output should not be empty";
    }

    if (values.testCases.length === 0) {
        errors.testCases = "At least one test case is required";
    } else {
        errors.testCases = values.testCases.map((testCase, index) => {
            const testCaseErrors = {};
            if (testCase.input === "") {
                testCaseErrors.input = "Input should not be empty";
            }
            if (testCase.output === "") {
                testCaseErrors.output = "Output should not be empty";
            }
            return testCaseErrors;
        });
    }

    return errors;
}
