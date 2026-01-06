from django.shortcuts import render
from django.forms.models import model_to_dict
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import *
from rest_framework import status
from .models import *

# Create your views here.
@api_view(["PUT"])
def update_services(request,event_name,package_type,id):
    package_type=package_type.lower()
    if package_type=="lowest":
        ModelClass=LowestPackage
        serializerClass=LowestPackageSerilizer
    elif package_type=="medium":
        ModelClass=MediumPackage
        serializerClass=MediumPackageSerilizer
    elif package_type=="premium":
        ModelClass=PremiumPackage
        serializerClass=PremiumPackageSerilizer
    else:
        return Response({"msg":"invalid package type"},status=status.HTTP_400_BAD_REQUEST)
    try:
        service=ModelClass.objects.get(id=id,event_name=event_name)
    except ModelClass.DoesNotExist:
        return Response({"msg":"services not found"},status=status.HTTP_404_NOT_FOUND)
    serializer=serializerClass(service,data=request.data,partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"msg":"pakage services are updated"},status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
def package_deletion(request,owner_id,package_type,event_type):
    try:
        package=Packages.objects.filter(owner_id=owner_id,package_type=package_type,event_name=event_type)
        print(package,"jdsjdhjsahdsadj")
        if package:
            package.delete()
            return Response({"msg":"package deleted sucessfully..."},status=status.HTTP_200_OK)
    except Packages.DoesNotExist:
        return Response({"msg":"package not found"},status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_services(request):
    owner_id=request.query_params.get("owner_id")
    package_type=request.query_params.get("package_type","").lower()
    if not owner_id or not package_type:
        return Response({"msg":"these are required fields"},status=status.HTTP_400_BAD_REQUEST)
    if package_type=="lowest":
        ModelClass=LowestPackage
        serializerClass=LowestPackageSerilizer
    elif package_type=="medium":
        ModelClass=MediumPackage
        serializerClass=MediumPackageSerilizer
    elif package_type=="premium":
        ModelClass=PremiumPackage
        serializerClass=PremiumPackageSerilizer
    else:
        return Response({"msg":"invalid packagetype"},status=status.HTTP_400_BAD_REQUEST)
    
    try:
        services = ModelClass.objects.filter(owner_id=int(owner_id))
        serializer =serializerClass(services, many=True)
        return Response({"services": serializer.data}, status=200)
    except Exception as e:
        return Response({"msg": str(e)}, status=500)

@api_view(["POST"])
def check_services(request):
    print("view reached")
    print(request.data)
    owner_id=request.data.get("owner_id")
    package_type=request.data.get("package_type")
    print(f"owner_id: {owner_id}, type: {type(owner_id)}")
    print(package_type)
    if   not owner_id or not package_type:
        return Response({"msg":"owner_id and package_type are required"},status=status.HTTP_400_BAD_REQUEST)
    try:
        owner=Owners.objects.get(id=owner_id)
    except Owners.DoesNotExist:
        return Response({"msg":"owner not found"},status=status.HTTP_404_NOT_FOUND)
    package_type=package_type.lower()
    if package_type=="lowest":
        ModelClass=LowestPackage
        seralizerClass=LowestPackageSerilizer
    elif package_type=="medium":
        ModelClass=MediumPackage
        seralizerClass=MediumPackageSerilizer
    elif package_type=="premium":
        ModelClass=PremiumPackage
        seralizerClass=PremiumPackageSerilizer
    else:
        return Response({"msg":"no valid package"},status=status.HTTP_400_BAD_REQUEST)
    servicexist=ModelClass.objects.filter(owner=owner).first()
    if servicexist:
        # service=ModelClass.objects.filter(owner=owner).first()
        serializer=seralizerClass(servicexist)
        return Response({ "exists": True,"data":serializer.data},status=status.HTTP_200_OK)
    return Response({"exists":False},status=status.HTTP_200_OK)
@api_view(["POST"])
def package_services(request,event_name,package_type):
    print("view reached")
    package_type=package_type.lower()
    if package_type=="lowest":
        selected_serilizer=LowestPackageSerilizer
        ModelClass=LowestPackage
    elif package_type=="medium":
        selected_serilizer=MediumPackageSerilizer
        ModelClass=MediumPackage
    elif package_type=="premium":
        selected_serilizer=PremiumPackageSerilizer
        ModelClass=PremiumPackage
    else:
        return Response({"error":"invalid package_type"},status=status.HTTP_400_BAD_REQUEST)
    gettingdatafromservicesform=request.data
    owner_id=gettingdatafromservicesform.get("owner")
    if ModelClass.objects.filter(owner_id=owner_id, event_name=event_name).exists():
        return Response({"msg": "Services for this event already exist"}, status=status.HTTP_409_CONFLICT)
    # print(gettingdatafromservicesform,"dtasdjadsghj")
    try:
        package = Packages.objects.get(owner_id=owner_id, event_name=event_name, package_type=package_type)
        gettingdatafromservicesform["package"] = package.id
    except Packages.DoesNotExist:
        return Response({"msg": "Package not found "}, status=status.HTTP_404_NOT_FOUND)
    serializer=selected_serilizer(data=gettingdatafromservicesform)
    if serializer.is_valid():
        serializer.save()
        print("data")
        return Response({"msg":"services added sucessfully"},status=status.HTTP_201_CREATED)
    else:
        print(serializer.errors)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    
@api_view(["POST"])
def packages(request):
    print(request.data)
    owner_id=request.data.get("owner_id")
    event_name=request.data.get("event_type")
    package_type=request.data.get("event_package")
    if not owner_id or not event_name or not package_type:
        return Response({"msg": "Missing data"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        Owner=Owners.objects.get(id=int(owner_id))
        print(Owner)
    except Owners.DoesNotExist:
        return Response({"msg": "Owner not found"}, status=status.HTTP_404_NOT_FOUND)
    data = {
        "owner": Owner.id,
        "event_name": event_name,
        "package_type": package_type
    }
    print(data)
    if Packages.objects.filter(owner=Owner, event_name=event_name, package_type=package_type).exists():
        return Response({"msg": "Package already selected"}, status=status.HTTP_409_CONFLICT)

    serializer=PackageSerilizer(data=data)
    if not serializer.is_valid():
        print("we get error here")
        return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )
    serializer.save()
    return Response({"msg": "Package stored successfully"}, status=status.HTTP_201_CREATED)
    # event_clean = serializer.validated_data["event_name"]
    # package_clean = serializer.validated_data['package_type']
    # if Packages.objects.filter(owner=Owner, event_name=event_clean, package_type=package_clean).exists():
    #     return Response({"msg": "Package already selected"},status=status.HTTP_409_CONFLICT)
    # serializer.save()
    # if Packages.objects.create(owner=Owner, event_name=event_clean, package_type=package_clean):
    #     return Response({"msg": "Package stored successfully"},status=status.HTTP_201_CREATED)

@api_view(["POST"])
def login(request):
    email=request.data.get("owneremail")
    password=request.data.get("ownerpassword")       
    owners=Owners.objects.filter(owneremail=email,ownerpassword=password)
    if owners.exists():
        owner=owners.first()
        return Response({"ms":"login in succeful","owner_id":owner.id},
            status=status.HTTP_200_OK)
    else:
        return Response({"ms":"login is failed"},
                        status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["POST"])
def register(request):
    registerdata=OwnerSerilizers(data=request.data)
    if registerdata.is_valid():
        print(registerdata)
        registerdata.save()
        return Response({
            "message": "Owner registered successfully",
            "data":registerdata.data

        },
        status=status.HTTP_200_OK)
    return Response(
        {"errors": registerdata.errors},
        status=status.HTTP_400_BAD_REQUEST
    )
@api_view(["POST"])
def customerregister(request):
    email=request.data.get("customer_email")
    if Customers.objects.filter(customer_email=email).exists():
        return Response({"msg":"you are already registered"},status=status.HTTP_400_BAD_REQUEST)
    customersdata=CustomerSerilizers(data=request.data)
    if customersdata.is_valid():
        customersdata.save()
        return Response({"msg":"customer registred successfully",
                        "data":customersdata.data},status=status.HTTP_200_OK)
    return Response({"msg":"invalid data"},status=status.HTTP_400_BAD_REQUEST)
@api_view(["POST"])
def customerlogin(request):
    email=request.data.get("customer_mail")
    password=request.data.get("customer_password")
    customer=Customers.objects.filter(customer_email=email,customer_password=password)
    if customer.exists():
        return Response({"msg":"customer logined successfully"},status=status.HTTP_200_OK)
    else:
        return Response({"msg":"customer login failed"},status=status.HTTP_400_BAD_REQUEST)
@api_view(["GET"])
def get_packages(request,eventype,package_type):
    package_type=package_type.lower()
    if package_type=="lowest":
        table=LowestPackage
    elif package_type=="medium":
        table=MediumPackage
    elif package_type=="premium":
        table=PremiumPackage
    else:
        print("package is not found")
    data=table.objects.filter(event_name=eventype)
    wholedata=[]
    services_list = [
        ("Decoration", "decoration", "decoration_price"),
        ("DJ", "dj", "dj_price"),
        ("VIP Service", "vip_service", "vip_service_price"),
        ("Catering", "catering", "catering_price"),
        ("Photography", "photography", "photography_price"),
        ("Videography", "videography", "videography_price"),
        ("Games", "games", "games_price"),
        ("Gifts", "gifts", "gifts_price"),
        ("Backup Generator", "backup_generator", "backup_generator_price"),
        ("Security", "security", "security_price"),
        
    ]
    
    for i in data:
        obj_i=model_to_dict(i)
        servies=[]
        for service_name,service_fields,service_price in services_list:
            if obj_i[service_fields]=="yes":
                servies.append({
                    "name":service_name,
                    "price":obj_i[service_price]
                })
                
        wholedata.append({
            "eventname":i.event_name,
            "service":servies,
            "owner":i.owner.ownername,
            "total":i.total_price
        })
    return Response(wholedata)
        



