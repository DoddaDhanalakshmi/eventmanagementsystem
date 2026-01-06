from django.db import models

# Create your models here.
class Customers(models.Model):
    customer_name=models.CharField(max_length=100)
    customer_email=models.EmailField(max_length=100)
    customer_password=models.CharField(max_length=50)
    def __str__(self):
        return self.customer_name
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
    package = models.ForeignKey('Packages', on_delete=models.CASCADE, null=True, blank=True)
    event_name=models.CharField(max_length=50)
    decoration = models.CharField(max_length=3, default="no")
    decoration_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    dj = models.CharField(max_length=3, default="no")
    dj_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    vip_service = models.CharField(max_length=3, default="no")
    vip_service_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    catering = models.CharField(max_length=3, default="no")
    catering_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    photography = models.CharField(max_length=3, default="no")
    photography_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    videography = models.CharField(max_length=3, default="no")
    videography_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    games = models.CharField(max_length=3, default="no")
    games_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    gifts = models.CharField(max_length=3, default="no")
    gifts_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    backup_generator = models.CharField(max_length=3, default="no")
    backup_generator_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    security = models.CharField(max_length=3, default="no")
    security_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    hall_ac_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    hall_non_ac_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    seating_capacity = models.IntegerField(default=0)
    total_price = models.DecimalField(max_digits=12, decimal_places=2, default=0)
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