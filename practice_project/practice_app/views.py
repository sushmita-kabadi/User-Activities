# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from practice_app.models import User
#from practice_app.forms import FormName
from . import forms

# Create your views here.

def index(request):
    dic = {'insert_val':"Please got to /users for user information"}
    return render(request,'practice_app/index.html',dic)

def user_info(request):
    list_user = User.objects.order_by('first_name')
    user_info_dict = {'user_info':list_user}
    print 'user_info_dict',user_info_dict
    return render(request,'practice_app/user_info.html',user_info_dict)

def  form_name_view(request):
    print'Coming here'
    print request.method
    form = forms.FormName()
    print form
    print request.method
    if request.method == 'POST':
        form = forms.FormName(request.POST)
        if form.is_valid():
            print("Form Validation")
            print("Name:"+form.cleaned_data['name'])
            print("Email:"+form.cleaned_data['email'])
            print("Verify Email:"+form.cleaned_data['verify_email'])
            print("Text:"+form.cleaned_data['text'])
    return render(request,'practice_app/form_page.html',{'form':form})

