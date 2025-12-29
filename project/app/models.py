from django.db import models

# Create your models here.
class Owners(models.Model):
    ownername=models.CharField(max_length=100)
    owneremail=models.EmailField(max_length=100)
    ownerpassword=models.CharField(max_length=50)
    def __str__(self):
        return self.ownername
class Packages(models.Model):
    owner = models.ForeignKey(Owners, on_delete=models.CASCADE)
    event_name = models.CharField(max_length=50)
    package_type = models.CharField(max_length=30)
    class Meta:
        unique_together = ('owner', 'event_name', 'package_type')
    def __str__(self):
        return f"{self.owner.ownername} - {self.event_name} - {self.package_type}"
class BasePackage(models.Model):
    owner=models.ForeignKey(Owners, on_delete=models.CASCADE)
    event_name=models.CharField(max_length=50)
    decoration=models.CharField(max_length=3)
    stage_setup=models.CharField(max_length=3)
    sound_system=models.CharField(max_length=3)
    dj=models.CharField(max_length=3)
    catering=models.CharField(max_length=3)
    photography=models.CharField(max_length=3)
    videography=models.CharField(max_length=3)
    games=models.CharField(max_length=3)
    gifts=models.CharField(max_length=3)
    backup_generator=models.CharField(max_length=3)
    security=models.CharField(max_length=3)
    vip_service=models.CharField(max_length=3)
    seating_capacity=models.IntegerField()
    lighting=models.CharField(max_length=3)
    food_type=models.CharField(max_length=20)
    staff_count=models.IntegerField()
    price=models.DecimalField(max_digits=10,decimal_places=2)
    class Meta:
        abstract=True
class LowestPackage(BasePackage):
    class Meta:
        db_table="lowest_package"
    def __str__(self):
        return f"{self.event_name}"
class MediumPackage(BasePackage):
    class Meta:
        db_table="medium_package"
    def __str__(self):
        return f"{self.event_name}"
class PremiumPackage(BasePackage):
    class Meta:
        db_table="premium_package"
    def __str__(self):
        return f"{self.event_name}"

