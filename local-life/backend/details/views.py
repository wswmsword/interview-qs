"""Read-only API views."""

from rest_framework.response import Response
from rest_framework.views import APIView

from .data import MERCHANT_DETAILS
from .serializers import MerchantDetailsSerializer


class DetailsView(APIView):
    """Return the single merchant used to generate the static detail page."""

    http_method_names = ["get", "head", "options"]

    def get(self, request):
        serializer = MerchantDetailsSerializer(instance=MERCHANT_DETAILS)
        return Response(serializer.data, status=200)
