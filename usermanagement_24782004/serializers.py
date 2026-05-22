from rest_framework import serializers

from .models import CustomUser


class RegisterSerializer(
        serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = CustomUser

        fields = [
            'username',
            'email',
            'password',
            'is_member',
        ]

    def create(self, validated_data):

        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_member=validated_data.get(
                'is_member',
                True
            )
        )

        return user