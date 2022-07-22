from django.urls import path
from . import views
import basic_court.api_views

app_name = 'basic_court'
urlpatterns=[
    path('api/cases/', basic_court.api_views.CaseList.as_view()),
    path('api/cases/new', basic_court.api_views.CaseCreate.as_view()),
    path('api/cases/<int:id>/', basic_court.api_views.CaseRetrieveUpdateDestroy.as_view()),
    path('api/attorneys/', basic_court.api_views.AttorneyList.as_view()),
    path('api/attorneys/new', basic_court.api_views.AttorneyCreate.as_view()),
    path('api/attorneys/<int:id>/', basic_court.api_views.AttorneyRetrieveUpdateDestroy.as_view()),
    path('api/participants/', basic_court.api_views.ParticipantList.as_view()),
    path('api/participants/new', basic_court.api_views.ParticipantCreate.as_view()),
    path('api/participants/<int:id>/', basic_court.api_views.ParticipantRetrieveUpdateDestroy.as_view()),
    path('api/casenotes/', basic_court.api_views.CaseNotesList.as_view()),
    path('api/casenotes/new', basic_court.api_views.CaseNotesCreate.as_view()),
    path('api/casenotes/<int:id>/', basic_court.api_views.CaseNotesRetrieveUpdateDestroy.as_view()),
    path('api/judges/', basic_court.api_views.JudgeList.as_view()),
    path('api/charges/', basic_court.api_views.ChargeList.as_view()),
    path('api/charges/new', basic_court.api_views.ChargeCreate.as_view()),
    path('api/charges/<int:id>/', basic_court.api_views.ChargeRetrieveUpdateDestroy.as_view()),
    path('api/events/', basic_court.api_views.EventList.as_view()),
    path('api/events/new', basic_court.api_views.EventCreate.as_view()),
    path('api/events/<int:id>/', basic_court.api_views.EventRetrieveUpdateDestroy.as_view()),
    path('api/casesecurities/', basic_court.api_views.CaseSecurityList.as_view()),
    path('api/casestatuses/', basic_court.api_views.CaseStatusList.as_view()),
    path('api/casetypes/', basic_court.api_views.CaseTypeList.as_view()),
    path('api/caselocations/', basic_court.api_views.CaseLocationList.as_view()),
    path('api/eventstatuses/', basic_court.api_views.EventStatusList.as_view()),
    path('api/eventtypes/', basic_court.api_views.EventTypeList.as_view()),
    path('api/documenttypes/', basic_court.api_views.DocumentTypeList.as_view()),
    path('api/paymenttypes/', basic_court.api_views.PaymentTypeList.as_view()),
    path('api/feecodes/', basic_court.api_views.FeeCodeList.as_view()),
    path('api/calendar/', basic_court.api_views.CalendarList.as_view()),
    path('api/reports/', basic_court.api_views.ReportList.as_view()),
    path('api/reports/new', basic_court.api_views.ReportCreate.as_view()),
    path('api/reports/<int:id>/', basic_court.api_views.ReportRetrieveUpdateDestroy.as_view()),
]