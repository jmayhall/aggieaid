const ValidationPaterns = {
    VALID_EMAIL: /\S+@\S+\.\S+/,
    VALID_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

export default ValidationPaterns