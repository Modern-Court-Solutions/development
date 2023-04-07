from django.utils.deprecation import MiddlewareMixin
import json
import logging
from django.utils import timezone

logger = logging.getLogger(__name__)

class AnalyticsMiddleware(MiddlewareMixin):

    def process_request(self, request):
        request.start_time = timezone.now()

    def process_response(self, request, response):
        if hasattr(request, 'start_time'):
            duration = timezone.now() - request.start_time
            user = request.user if request.user.is_authenticated else 'Anonymous'

            log_data = {
                'user': str(user),
                'method': request.method,
                'url': request.get_full_path(),
                'status_code': response.status_code,
                'duration': duration.microseconds / 1000,
                'timestamp': request.start_time.strftime("%Y-%m-%d %H:%M:%S"),
            }

            if request.method in ['POST', 'PUT', 'PATCH']:
                try:
                    log_data['data'] = json.loads(request.body.decode())
                except Exception as e:
                    logger.error(f"AnalyticsMiddleware - Error parsing request body: {e}")

            logger.info(json.dumps(log_data))

        return response