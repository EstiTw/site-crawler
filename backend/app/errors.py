# app/errors.py

class BadCredentialsError(Exception):
    pass


class ExternalTokenExpiredError(Exception):
    pass


class ExternalServiceError(Exception):
    pass
