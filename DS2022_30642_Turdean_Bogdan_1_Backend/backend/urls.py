from django.urls import re_path
from backend import views


urlpatterns = [
    re_path(r'^device/$', views.deviceApi),
    re_path(r'^device/([0-9]+)$', views.deviceApi),

    re_path(r'^user/$', views.userApi),
    re_path(r'^user/([0-9]+)$', views.userApi),
    re_path(r'^user/([0-9]+)/device/$', views.userApi),

    re_path(r'^consumption/$', views.consumptionApi),
    re_path(r'^consumption/([0-9]+)$', views.consumptionApi),

    re_path(r'^login/(.+)/(.+)$', views.loginApi),
    re_path(r'^register/$', views.loginApi)
]
