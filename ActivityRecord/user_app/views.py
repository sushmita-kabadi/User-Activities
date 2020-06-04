# Create your views here.
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from user_app.models import UserModel , ActivityRecord
from user_app.serializers import UserModelSerializer , ActivityRecordSerializer
from rest_framework import viewsets


# Create your views here.

class UserModelViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserModelSerializer

class ActivityRecordViewSet(viewsets.ModelViewSet):
    queryset = ActivityRecord.objects.all()
    serializer_class = ActivityRecordSerializer

