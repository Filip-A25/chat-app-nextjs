export const validation = {
    username: {
        required: {
            value: true,
            message: "Please enter a username."
        },
        minLength: {
            value: 4,
            message: "Username cannot be shorter than 4 characters."
        },
        maxLength: {
            value: 14,
            message: "Username cannot be longer than 14 characters."
        }
    },
    email: {
        required: {
            value: true,
            message: "Please enter an e-mail address."
        }
    },
    password: {
        required: {
            value: true,
            message: "Please enter a password."
        },
        minLength: {
            value: 6,
            message: "Password must be atleast 6 characters long."
        },
        maxLength: {
            value: 24,
            message: "Password cannot be longer than 24 characters"
        },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).{8,}$/,
            message: "Password must contain atleast one uppercase letter, one lowercase letter and a number or a special character."
        }
    }
}