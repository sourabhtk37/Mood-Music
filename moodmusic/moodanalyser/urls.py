from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^recieve_url/$',views.sentiment_analyser)
]