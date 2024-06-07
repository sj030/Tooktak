const Literals = {
    SERVICE: {
        ADD_SERVICE_SUCCESS: "Service added successfully",
        ADD_SERVICE_FAILED: "Failed to add new service",

        NO_SERVICE_ERROR: "No Service Found",
        SERVICE_FETCH_SUCCESS: "Services fetch successfully",
        SERVICE_FETCH_FAILED: "Failed to fetch services",
    },
    FILE: {
        ADD_FILE_SUCCESS: "File added successfully",
        ADD_FILE_FAILED: "Failed to add new file",

        NO_FILE_ERROR: "No File Found",
        FILE_FETCH_SUCCESS: "Files fetch successfully",
        FILE_FETCH_FAILED: "Failed to fetch files",

        ADD_PATIENT_SUCCESS: "Patient added successfully",
        ADD_PATIENT_FAILED: "Failed to add new patient",
    },
    ZIP: { // 다운로드 
        ZIP_SUCCESS: "Zip file created and sended successfully",
        ZIP_SEND_FAILED: "Send zip file failed",
        ZIP_FAILED: "Create zip file failed",
    },
    LOG: {
        USER_DATA_CORRUPTED: "User data is corrupted",
        AUTHENTICATION_ERROR: "Authentication required or incomplete user data",
        ACCESS_DENIED: "Access denied. Admins only.",

        NO_TOKEN: "No token is provided",
        INVALID_TOKEN: "Invalid token",
        NO_USER: "No user found",
        NO_USER_ERROR: "Authentication Error",
        SERVER_ERROR: "Server Error",

        FETCH_SUCCESS: "Log fetch successful",
        NO_MATCH: "No Log matched",
        SERVER_ERROR: "Server error during log fetch",
    },
    ACCOUNT: {
        NOT_FOUND: "User not found",
        AUTHENTICATION_ERROR: "Authentication failed. Invalid user or password.",
        AUTHENTICATION_SUCCESS: "Authentication successful",

        REFRESH_REQUIRED: "Refresh Token is required",
        INVALID_REFRESH_TOKEN: "Invalid Refresh Token",
        INTERNAL_SERVER_ERROR: "Internal Server Error",

        CREATE_ERROR_EXISTS: "User already exists",
        CREATE_ERROR: "Failed to create new user",

        DELETE_SUCCESS: "User deleted successfully",

        FETCH_SUCCESS: "Users fetch successfully",
    },
    SERVER_ERROR: "Server error: ",
};

module.exports = { Literals };