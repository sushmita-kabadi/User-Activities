from django.conf.urls import url
from django.conf.urls import include
from practice_app import views
urlpatterns = [
    url(r'^$',views.index,name='index'),
    url(r'users/',views.user_info,name='user_info'),
    url(r'forms/',views.form_name_view,name="form_name_view"),
]
