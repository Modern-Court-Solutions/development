from django.utils import timezone
import logging

logger = logging.getLogger(__name__)

class AnalyticsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.start_time = timezone.now()

        # Store the request body before processing the request
        request._request_data = request.body.decode('utf-8') if request.body else None

        response = self.get_response(request)
        self.process_response(request, response)
        return response

    def process_response(self, request, response):
        end_time = timezone.now()
        response_time = (end_time - request.start_time).total_seconds() * 1000

        log_data = {
            'user': request.user,
            'method': request.method,
            'path': request.path,
            'request_data': request._request_data,
            'response_time': response_time,
        }

        # Log the data
        logger.info(log_data)

        return response




