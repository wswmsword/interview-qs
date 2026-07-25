"""Response serializers for the hard-coded merchant data."""

from rest_framework import serializers


class AddressSerializer(serializers.Serializer):
    street = serializers.CharField()
    locality = serializers.CharField()
    region = serializers.CharField()
    postalCode = serializers.CharField()
    country = serializers.CharField()


class MerchantInfoSerializer(serializers.Serializer):
    location = serializers.CharField()
    category = serializers.CharField()
    companyName = serializers.CharField()
    address = AddressSerializer()
    website = serializers.URLField()
    services = serializers.ListField(child=serializers.CharField())
    contactName = serializers.CharField()
    phone = serializers.CharField()
    wechat = serializers.CharField()
    email = serializers.EmailField()


class FaqSerializer(serializers.Serializer):
    question = serializers.CharField()
    answer = serializers.CharField()


class MerchantImageSerializer(serializers.Serializer):
    url = serializers.URLField()
    alt = serializers.CharField()
    author = serializers.CharField()
    sourceUrl = serializers.URLField()


class MerchantDetailsSerializer(serializers.Serializer):
    name = serializers.CharField()
    slug = serializers.SlugField()
    info = MerchantInfoSerializer()
    images = MerchantImageSerializer(many=True)
    intro = serializers.CharField()
    faq = FaqSerializer(many=True)
