from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from backend.models import User, Device, Consumption
from backend.serializers import UserSerializer, DeviceSerializer, ConsumptionSerializer


# Create your views here.
@csrf_exempt
def deviceApi(request, id=0):
    if request.method == 'GET':
        if id == 0:
            devices = Device.objects.all()
            devices_serializer = DeviceSerializer(devices, many=True)
            return JsonResponse(devices_serializer.data, safe=False)
        else:
            device = Device.objects.get(id=id)
            device_serializer = DeviceSerializer(device)
            return JsonResponse(device_serializer.data, safe=False)

    elif request.method == 'POST':
        device_data = JSONParser().parse(request)
        device_serializer = DeviceSerializer(data=device_data)
        if device_serializer.is_valid():
            device_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to Add Device", safe=False)

    elif request.method == 'PUT':
        try:
            device_data = JSONParser().parse(request)
            device = Device.objects.get(id=device_data['id'])
            device_serializer = DeviceSerializer(device, data=device_data)
            if device_serializer.is_valid():
                device_serializer.save()
                return JsonResponse("Updated Successfully!!", safe=False)
        except Exception:
            return JsonResponse("Failed to update.", safe=False)

    elif request.method == 'DELETE':
        try:
            device = Device.objects.get(id=id)
            device.delete()
            return JsonResponse("Deleted Successfully!!", safe=False)
        except Exception:
            return JsonResponse("Id not found!", safe=False)


@csrf_exempt
def userApi(request, id=0):
    if request.method == 'GET':
        if id == 0:
            users = User.objects.all()
            users_serializer = UserSerializer(users, many=True)
            return JsonResponse(users_serializer.data, safe=False)
        else:
            devices = Device.objects.select_related().filter(user=id)
            devices_serializer = DeviceSerializer(devices, many=True)
            return JsonResponse(devices_serializer.data, safe=False)

    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to add.", safe=False)

    elif request.method == 'PUT':
        try:
            user_data = JSONParser().parse(request)
            user = User.objects.get(id=user_data['id'])
            user_serialize = UserSerializer(user, data=user_data)
            if user_serialize.is_valid():
                user_serialize.save()
                return JsonResponse("Updated Successfully!!", safe=False)
        except Exception:
            return JsonResponse("Failed to update.", safe=False)

    elif request.method == 'DELETE':
        try:
            user = User.objects.get(id=id)
            user.delete()
            return JsonResponse("Deleted Successfully!!", safe=False)
        except Exception:
            return JsonResponse("Id not found.", safe=False)


@csrf_exempt
def consumptionApi(request, id=0):
    if request.method == 'GET':
        consumptions = Consumption.objects.all()
        consumptions_serializer = ConsumptionSerializer(consumptions, many=True)
        return JsonResponse(consumptions_serializer.data, safe=False)

    elif request.method == 'POST':
        consumption_data = JSONParser().parse(request)
        consumption_serializer = ConsumptionSerializer(data=consumption_data)
        if consumption_serializer.is_valid():
            consumption_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to add.", safe=False)

    elif request.method == 'PUT':
        try:
            consumption_data = JSONParser().parse(request)
            consumption = Consumption.objects.get(id=consumption_data['id'])
            consumption_serialize = ConsumptionSerializer(consumption, data=consumption_data)
            if consumption_serialize.is_valid():
                consumption_serialize.save()
                return JsonResponse("Updated Successfully!!", safe=False)
        except Exception:
            return JsonResponse("Failed to update.", safe=False)

    elif request.method == 'DELETE':
        try:
            consumption = Consumption.objects.get(id=id)
            consumption.delete()
            return JsonResponse("Deleted Successfully!!", safe=False)
        except Exception:
            return JsonResponse("Id not found.", safe=False)


@csrf_exempt
def loginApi(request, username, password):
    print(request)
    if request.method == 'GET':
        # user_json = JSONParser().parse(request)
        # username = user_json['username']
        # password = user_json['password']
        try:
            user = User.objects.get(username=username, password=password)
            user_serializer = UserSerializer(user)
            return JsonResponse(user_serializer.data, safe=False)
        except Exception:
            return JsonResponse("User does not exist!!", safe=False)
    elif request.method == 'POST':
        user_data = JSONParser().parse(request)
        try:
            User.objects.get(username=user_data['username'])
            return JsonResponse("Username already exists!!", safe=False)
        except Exception:
            pass
        try:
            User.objects.get(password=user_data['password'])
            return JsonResponse("Password already exists!!", safe=False)
        except Exception:
            pass
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Account created!!", safe=False)
        return JsonResponse("Could not create account!!", safe=False)
