from rest_framework import serializers
from backend.models import User, Device, Consumption


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id',
                  'name',
                  'username',
                  'password',
                  'is_admin')


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ('id',
                  'description',
                  'address',
                  'max_cons_per_hour',
                  'user')


class ConsumptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consumption
        fields = ('id',
                  'cons_value',
                  'timestamp',
                  'device')
