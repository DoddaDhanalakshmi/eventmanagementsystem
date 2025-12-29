from rest_framework import serializers
from .models import Owners,Packages,LowestPackage,MediumPackage,PremiumPackage
class OwnerSerilizers(serializers.ModelSerializer):
    class Meta:
        model=Owners
        fields="__all__"
class PackageSerilizer(serializers.ModelSerializer):
    class Meta:
        model=Packages
        fields=['owner', 'event_name', 'package_type']
    def validate_event_name(self,value):
        return value.lower().strip()
    def validate_package_type(self,value):
        return value.lower().strip()
class LowestPackageSerilizer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(queryset=Owners.objects.all())
    food_type = serializers.CharField(required=False, allow_blank=True)
    class Meta:
        model=LowestPackage
        fields="__all__"
class MediumPackageSerilizer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(queryset=Owners.objects.all())
    food_type = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model=MediumPackage
        fields="__all__"
class PremiumPackageSerilizer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(queryset=Owners.objects.all())
    food_type = serializers.CharField(required=False, allow_blank=True)
    class Meta:
        model=PremiumPackage
        fields="__all__"