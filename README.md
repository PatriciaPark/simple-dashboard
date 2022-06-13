# simple-dashboard

# Live Demo > https://simple-dashboard-pyjee8.herokuapp.com/index

# Story board > https://ovenapp.io/view/ceDKa3XTdMa3HjwRIahZWT8RT3jBSbtS/A9KTv

# Source code directory
![image](https://user-images.githubusercontent.com/14973104/173263977-7b8c76c7-30f0-4013-8503-53d6f49fdb56.png)

# Development Implementation List
1. Hosting : Heroku
2. Sign Up 
- email and user defined password
- Google OAuth
- Facebook OAuth
3. User Defined Password : The user defined password must be entered twice and match. In addition, the password must be validated by the following conditions.
- contains at least one lower character 
- contains at least one upper character 
- contains at least one digit character 
- contains at least one special character
- contains at least 8 characters
4. Email Verification : 
- For the user defined password, after the validated password is entered, back-end app send an verification email to the email address provided. The email contain a link, that if the user clicks the link, their email will be verified in the back-end and the user will be directed to a simple dashboard in a new browser.
- Only accounts that have email verified can access the simple dashboard. Users that have not verified email will only see a button or link that says “Resend Email Verification”, and clicking on this link will resend the same email verification.
- Only accounts created via email and password be verified with email verification. Facebook and Google OAuth sign up accounts do not need to send email verification, and can immediately access the simple dashboard.
5. Login 
- email and user defined password
- Google OAuth
- Facebook OAuth
6. User Profile 
- The user profile will display the user’s email and name (from Google or Facebook OAuth). In addition, the user can reset their name. Everytime the user goes to user profile, the user should see the name they have chosen.
7. Reset Password 
- The password must meet the same criterias as defined previously. In addition, the user must enter 3 text input boxes: Old password, New password, Re-enter new password
8. Cookies and Logout 
- Store cookies in the browser so that next time a logged in user returns to your site, the user will be automatically logged in. Add a logout feature in the user profile so that cookies can be cleared.
9. User Database Dashboard 
- You can check the data about Timestamp of user sign up, Number of times logged in, Timestamp of the last user session. For users with cookies, session and login may be different, since the user may not need to log in to start a new session.
10. User Statistics
- Total number of users who have signed up.
- Total number of users with active sessions today.
- Average number of active session users in the last 7 days rolling.

# API
![image](https://user-images.githubusercontent.com/14973104/173264024-926e1eeb-6ce6-490f-980d-3fa28ba1643f.png)
