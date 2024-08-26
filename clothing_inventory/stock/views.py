from django.shortcuts import render
from rest_framework import viewsets
from .models import Product, Order
from .serializers import ProductSerializer, OrderSerializer
from rest_framework.views import APIView

class ProductView(APIView):
    def post(self, request):
        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():
            user_email = request.user.email  # Or however you identify the user
            user_db_name = user_email.replace('@', '_').replace('.', '_') + '_db'  # Convert email to db name

            # Use 'using()' to save to the specific user's database
            try:
                # Instead of serializer.save(), we manually create an instance and save it to the specific database
                product_instance = Product(**serializer.validated_data)
                product_instance.save(using=user_db_name)  # Save to the specific user's database

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer