# ab-test-app

## Information

This web application was built to log participant usage of either a QR code or URL to access a specific test code.  For the purpose of my IS4900 (Information Science Senior Project), the test code was either "participant" or "provided" though this application can handle many other test codes.

## Application Flow

* Receives web request
* Parses whether QR code or URL
* Parses test code
* Prepares data for inserting into database
* Insert data into database
* Respond to client request thanking them for participating
* Log results to console
