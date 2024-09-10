from django.shortcuts import render
from rest_framework import viewsets
from .models import Product, Order ,Parties
from .serializers import ProductSerializer, OrderSerializer ,PartiesSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import F
import pymongo
from django.conf import settings
class ProductView(APIView):
    def post(self, request):
        print(request.data)
        print(request.FILES)
        print(request.data.get('design_no'))
        serializer = ProductSerializer(data={'design_no': request.data.get('design_no'),'total_pieces':0,'pieces_set':{'M': 0, 'L': 0, 'XL': 0, 'XXL': 0},'color': request.data.get('color'), 'price': int(request.data.get('price')),
                                             'image': request.FILES.get('image')})
        # print(settings.DATABASES)
        # print(serializer.data)
        print(serializer.is_valid())
        if serializer.is_valid():
            user_email = request.data.get('email')  # Or however you identify the user
            user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'  # Convert email to db name

            database_settings(user_db_name)

            try:
            # Instead of serializer.save(), we manually create an instance and save it to the specific database
                product_instance = Product(**serializer.validated_data)
                product_instance.save(using=user_db_name)  # Save to the specific user's database

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ViewStockView(APIView):
    def get(self, request):
        """
        Fetch all products from the specific user's database.
        """
        user_email = request.query_params.get('email')  # Get user email from query parameters
        if not user_email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Convert the email to a database name format
        user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'

        # Construct a new database configuration using settings
        database_settings(user_db_name)

        try:
            # Fetch all products from the specific user's database
            products = Product.objects.using(user_db_name).all()
            serializer = ProductSerializer(products, many=True)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class SearchItems(APIView):
    def post(self,request):
        print(request.data)
        user_email = request.data.get('email')
        design_no=request.data.get('design_no')
        if not user_email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Convert the email to a database name format
        user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'

        # Construct a new database configuration using settings
        database_settings(user_db_name)

        if not design_no:
            data=Product.objects.using(user_db_name).all()
        else:
            data=Product.objects.using(user_db_name).filter(design_no__startswith=design_no)
        print(data)
        serializer = ProductSerializer(data,many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AddParties(APIView):
    def post(self,request):
        serializer = PartiesSerializer(data={'party_name': request.data.get('party_name'),
                                             'mobile':request.data.get('mobile'),
                                             'gst_number': request.data.get('gst_number'),
                                             'address': request.data.get('address'),
                                             })
        # print(settings.DATABASES)
        # print(serializer.data)
        # print(serializer.is_valid())
        if serializer.is_valid():
            user_email = request.data.get('email')  # Or however you identify the user
            user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'  # Convert email to db name

            database_settings(user_db_name)

            try:
                # Instead of serializer.save(), we manually create an instance and save it to the specific database
                product_instance = Parties(**serializer.validated_data)
                product_instance.save(using=user_db_name)  # Save to the specific user's database

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddStock(APIView):
    def post(self,request):
            user_email = request.data.get('email')  # Or however you identify the user
            user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'  # Convert email to db name

            database_settings(user_db_name)
            try:
                product = Product.objects.using(user_db_name).filter(design_no=request.data.get('design_no'))
                serializer = ProductSerializer(product, many=True)
                print(serializer.data)
                # Calculate the new total_pieces value
                total_set = int(request.data.get('total_set', 0))
                serializer.data[0]['total_pieces'] += total_set  # Add the new total set to the existing total_pieces
                print(serializer.data[0]['pieces_set']['M'])
                serializer.data[0]['pieces_set']['M'] += int(request.data.get('set_m'))
                # print(serializer.data[0]['pieces_set']['M'])
                serializer.data[0]['pieces_set']['L'] += int(request.data.get('set_l'))
                serializer.data[0]['pieces_set']['XL'] += int(request.data.get('set_xl'))
                serializer.data[0]['pieces_set']['XXL'] += int(request.data.get('set_xxl'))

                Product.objects.using(user_db_name).filter(design_no=request.data.get('design_no')).update(total_pieces=serializer.data[0]['total_pieces'],pieces_set=serializer.data[0]['pieces_set'])
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ViewParties(APIView):
    def get(self, request):
        """
        Fetch all products from the specific user's database.
        """
        user_email = request.query_params.get('email')  # Get user email from query parameters
        if not user_email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Convert the email to a database name format
        user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'

        # Construct a new database configuration using settings
        database_settings(user_db_name)

        try:
            data = Parties.objects.using(user_db_name).all()
            print(data)
            serializer = PartiesSerializer(data, many=True)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def database_settings(user_db_name):
    settings.DATABASES[user_db_name] = {
        'ENGINE': 'djongo',
        'NAME': user_db_name,
        'CLIENT': {
            'host': settings.DATABASES['default']['CLIENT']['host'],
            'username': settings.DATABASES['default']['CLIENT']['username'],
            'password': settings.DATABASES['default']['CLIENT']['password'],
            'authMechanism': 'SCRAM-SHA-1',
        },
        'TIME_ZONE': settings.DATABASES['default'].get('TIME_ZONE', 'UTC'),
        'OPTIONS': settings.DATABASES['default'].get('OPTIONS', {}),
        'CONN_HEALTH_CHECKS': settings.DATABASES['default'].get('CONN_HEALTH_CHECKS', False),
        'CONN_MAX_AGE': settings.DATABASES['default'].get('CONN_MAX_AGE', 0),
        'AUTOCOMMIT': settings.DATABASES['default'].get('AUTOCOMMIT', True),
        'ATOMIC_REQUESTS': settings.DATABASES['default'].get('ATOMIC_REQUESTS', False),
    }