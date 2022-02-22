from django.urls import path

from user import api_views

urlpatterns = [
    path('create/', api_views.CreateUserView.as_view(), name='create'),
    path('token/', api_views.CreateTokenView.as_view(), name='token')
]