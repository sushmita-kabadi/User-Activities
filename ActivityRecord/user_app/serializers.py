from rest_framework_json_api import serializers
from user_app.models import UserModel , ActivityRecord

class UserModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'url', 'name' ,'location')

class ActivityRecordSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        start_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
        end_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
        model = ActivityRecord
        fields = ('id','url','location','start_time','end_time')
        #fields = ('id','url','name','languages')

