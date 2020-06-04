from rest_framework_json_api import serializers
from user_app.models import Paradigm , Language , Programmer 

class LanguageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Language
        fields = ('id', 'url', 'name' ,'paradigm')

class ParadigmSerializer(serializers.HyperlinkedModelSerializer):   
    class Meta:
        model = Paradigm
        fields = ('id','url','name')

class ProgrammerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Programmer
        fields = ('id','url','name','languages')


