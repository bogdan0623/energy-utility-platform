from django.db import models


# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    is_admin = models.BooleanField(default=0)


class Device(models.Model):
    description = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    max_cons_per_hour = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Consumption(models.Model):
    cons_value = models.IntegerField()
    timestamp = models.DateTimeField()
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
