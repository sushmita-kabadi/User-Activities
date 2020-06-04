# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

# Create your models here.
class UserModel(models.Model):
    name = models.CharField(max_length = 200)
    location = models.CharField(max_length = 200)

    def __str__(self):
        return self.name

class ActivityRecord(models.Model):
    location = models.ManyToManyField(UserModel)
    start_time = models.DateTimeField(default = timezone.now)
    end_time = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return self.name


