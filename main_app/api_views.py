from rest_framework import (
    viewsets,
    permissions,
    pagination
)

from .models import Report
from .serializers import ReportSerializer
from .permissions import *


class ReportPagination(
    pagination.PageNumberPagination
):

    page_size = 10

    page_size_query_param = (
        'page_size'
    )

    max_page_size = 100


class ReportViewSet(
    viewsets.ModelViewSet
):

    serializer_class = (
        ReportSerializer
    )

    pagination_class = (
        ReportPagination
    )

    def get_queryset(self):

        user = self.request.user

        queryset = (
            Report.objects
            .all()
            .order_by(
                '-updated_at'
            )
        )

        tab = (
            self.request
            .query_params
            .get('tab')
        )

        if tab == 'my_reports':

            return queryset.filter(
                reporter=user
            )

        elif tab == 'feed':

            return (
                queryset
                .exclude(
                    reporter=user
                )
                .exclude(
                    status='DRAFT'
                )
            )

        if user.is_admin:

            return queryset.exclude(
                status='DRAFT'
            )

        return (
            queryset
            .exclude(
                status='DRAFT'
            )
            |
            queryset.filter(
                reporter=user
            )
        )

    def get_permissions(self):

        if self.action in [
            'update',
            'partial_update',
            'destroy'
        ]:

            return [
                permissions
                .IsAuthenticated(),

                IsOwnerAndDraftOrReadOnly()
            ]

        return [
            permissions
            .IsAuthenticated()
        ]

    def perform_create(
        self,
        serializer
    ):

        serializer.save(
            reporter=self.request.user
        )