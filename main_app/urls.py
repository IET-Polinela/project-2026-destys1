from django.urls import path
from .views import (
    home,
    welcome,
    ReportListView,
    ReportDetailView,
    ReportCreateView,
    ReportUpdateView,
    ReportDeleteView,
    ReportUpdateStatusView
)

urlpatterns = [
    path('', home, name='home'),
    path('welcome/', welcome, name='welcome'),

    # CREATE
    path('reports/add/', ReportCreateView.as_view(), name='report_create'),

    # READ
    path('reports/', ReportListView.as_view(), name='report_list'),
    path('reports/<int:pk>/', ReportDetailView.as_view(), name='report_detail'),

    # UPDATE
    path('reports/update/<int:pk>/', ReportUpdateView.as_view(), name='report_update'),

    # DELETE
    path('reports/delete/<int:pk>/', ReportDeleteView.as_view(), name='report_delete'),

    # WORKFLOW STATUS (WAJIB)
    path('reports/update-status/<int:pk>/', ReportUpdateStatusView.as_view(), name='update_status'),
]