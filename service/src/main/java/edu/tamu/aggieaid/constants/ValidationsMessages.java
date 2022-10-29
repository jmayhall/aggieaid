package edu.tamu.aggieaid.constants;

public class ValidationsMessages {
    

    // User validation messages
    public static final String NAME_NULL = "The 'name' field cannot be blank";
    public static final String USERNAME_NULL = "The 'username' field cannot be blank";
    public static final String EMAIL_NOT_VALID = "The 'email' field must be a valid email address";
    public static final String EMAIL_NULL = "The 'email' field cannot be blank";
    public static final String PASSWORD_NOT_VALID = "Passwords must have at least one uppercase letter, one lowercase letter, one number and one special character";
    public static final String PASSWORD_NULL = "The 'password' field cannot be blank";

    // Event validation messages
    public static final String TITLE_NULL = "The 'title' field cannot be blank";
    public static final String DESCRIPTION_NULL = "The 'username' field cannot be blank";
    public static final String DATE_NULL = "The 'date' field cannot be null";
    public static final String THUMBNAIL_FILENAME_NULL = "The 'thumbnailFileName' field cannot be null";
    public static final String VOLUNTEER_MIN = "The 'volunteerCount' must be greater then 5";
    public static final String START_TIME_NULL = "The 'startTime' field cannot be null";
    public static final String END_TIME_NULL = "The 'endTime' field cannot be null";
    public static final String OWNER_NULL = "The 'owner' field cannot be null";
    public static final String OWNER_NOT_VALID_UUID = "The 'owner' field must be a valud UUID";

    // Token validation messages
    public static final String JWT_NULL = "The 'token' field cannot be blank";
    public static final String JWT_NOT_VALID = "The 'token' field must be a valid JWT";
    public static final String TOKEN_TYPE_NOT_VALID = "The 'type' field must either be 'Bearer' or 'Refresh'";
    public static final String ID_NOT_VALID_UUID = "The 'id' field must be a valid UUID";
    public static final String TOKEN_TYPE_NULL = "The 'type' field cannot be blank";
    public static final String ID_NULL = "The 'id' field cannot be blank";
    public static final String URL_NULL = "The 'url' field cannot be blank";

}
