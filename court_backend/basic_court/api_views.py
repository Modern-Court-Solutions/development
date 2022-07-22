from basic_court.serializers import *
from basic_court.models import *
from typing import List
from django.db.models.query import QuerySet
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.exceptions import ValidationError
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from basic_court.models import Case


class AttorneyList(ListAPIView):
    queryset = Attorney.objects.all()
    serializer_class = AttorneySerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id', 'f_name', 'l_name', 'barnum')
    search_fields = ('f_name', 'l_name', 'barnum')
    

class AttorneyCreate(CreateAPIView):
    serializer_class = CreateAttorneySerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

class AttorneyRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Attorney.objects.all()
    lookup_field = 'id'
    serializer_class = CreateAttorneySerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    

    def delete(self, request, *args, **kwargs):
        attorney_id = request.data.get('id')
        response = super().delete(request, *args, **kwargs)
        if response.status_code == 204:
            from django.core.cache import cache
            cache.delete('attorney_data_{}'.format(attorney_id))
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return response

class ParticipantList(ListAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id', 'f_name', 'l_name')
    search_fields = ('id', 'f_name', 'l_name')
    

class ParticipantCreate(CreateAPIView):
    serializer_class = CreateParticipantSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

class ParticipantRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Participant.objects.all()
    lookup_field = 'id'
    serializer_class = CreateParticipantSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    

    def delete(self, request, *args, **kwargs):
        participant_id = request.data.get('id')
        response = super().delete(request, *args, **kwargs)
        if response.status_code == 204:
            from django.core.cache import cache
            cache.delete('participant_data_{}'.format(participant_id))
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return response

class CaseList(ListAPIView):
    queryset = Case.objects.order_by('-date_filed')
    serializer_class = CaseSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id', 'status', 'title', 'case_type', 'judge', 'location', 'interpretor', 'pro_se_litigant', 'filing_enabled', 'movers', 'responders',)
    search_fields = ('title', 'file_number',)
    #   

class CalendarList(ListAPIView):
    queryset = Case.objects.order_by('-date_filed')
    serializer_class = CaseSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id', 'status', 'title', 'case_type', 'judge', 'location', 'interpretor', 'pro_se_litigant', 'filing_enabled', 'movers', 'responders',)
    search_fields = ('title', 'file_number',)

class CaseCreate(CreateAPIView):
    serializer_class = CreateCaseSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

class CaseRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Case.objects.all()
    lookup_field = 'id'
    serializer_class = CreateCaseSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    

    def delete(self, request, *args, **kwargs):
        case_id = request.data.get('id')
        response = super().delete(request, *args, **kwargs)
        if response.status_code == 204:
            from django.core.cache import cache
            cache.delete('case_data_{}'.format(case_id))
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return response

class CaseNotesList(ListAPIView):
    queryset = CaseNotes.objects.order_by('-date_created')
    serializer_class = CaseNotesSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id', 'case')
    search_fields = ('title', 'note')
      

class CaseNotesCreate(CreateAPIView):
    serializer_class = CaseNotesSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

class CaseNotesRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = CaseNotes.objects.all()
    lookup_field = 'id'
    serializer_class = CaseNotesSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    

    def delete(self, request, *args, **kwargs):
        response = super().delete(request, *args, **kwargs)
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return response

class JudgeList(ListAPIView):
    queryset = Judge.objects.all()
    serializer_class = JudgeSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id', 'f_name', 'l_name')
    search_fields = ('f_name', 'l_name')
    

class ChargeList(ListAPIView):
    queryset = Charge.objects.all()
    serializer_class = ChargeSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('code', 'case',)
    search_fields = ('title',)
    

class ChargeCreate(CreateAPIView):
    serializer_class = CreateChargeSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

class ChargeRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Charge.objects.all()
    lookup_field = 'id'
    serializer_class = CreateChargeSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    

    def delete(self, request, *args, **kwargs):
        response = super().delete(request, *args, **kwargs)
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return response

class EventList(ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('case', 'status', 'event_type',)
    search_fields = ('name', 'date',)
    

class EventCreate(CreateAPIView):
    serializer_class = CreateEventSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

class EventRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    lookup_field = 'id'
    serializer_class = CreateEventSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    

    def delete(self, request, *args, **kwargs):
        response = super().delete(request, *args, **kwargs)
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return response



# Ben's APIs
class CaseSecurityList(ListAPIView):
    queryset = CaseSecurity.objects.all()
    serializer_class = CaseSecuritySerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id',)
    search_fields = ('id', 'security')
    
    
class CaseStatusList(ListAPIView):
    queryset = CaseStatus.objects.all()
    serializer_class = CaseStatusSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id',)
    search_fields = ('id', 'status')
    
    
class CaseTypeList(ListAPIView):
    queryset = CaseType.objects.all()
    serializer_class = CaseTypeSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id',)
    search_fields = ('id', 'case_type')
    
    
class CaseLocationList(ListAPIView):
    queryset = CaseLocation.objects.all()
    serializer_class = CaseLocationSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id',)
    search_fields = ('id', 'location',) 
    
    
class EventStatusList(ListAPIView): 
    queryset = EventStatus.objects.all()
    serializer_class = EventStatusSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id',)
    search_fields = ('id', 'event_status',)
    
    
class EventTypeList(ListAPIView): 
    queryset = EventType.objects.all()
    serializer_class = EventTypeSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id',)
    search_fields = ('id', 'event_type')
    
 
class DocumentTypeList(ListAPIView): 
    queryset = DocumentType.objects.all()
    serializer_class = DocumentTypeSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id',)
    search_fields = ('id', 'document_type',)
    
    
class PaymentTypeList(ListAPIView): 
    queryset = PaymentType.objects.all()
    serializer_class = PaymentTypeSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id',)
    search_fields = ('id', 'payment_type',) 
    
    
    
class FeeCodeList(ListAPIView): 
    queryset = FeeCode.objects.all()
    serializer_class = FeeCodeSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id',)
    search_fields = ('id', 'code') 
    
class ReportList(ListAPIView):
    queryset = Reports.objects.all()
    serializer_class = ReportSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id', 'name', 'params', 'court', 'user',)
    search_fields = ('id', 'name', 'params', 'court', 'user',)
    

class ReportCreate(CreateAPIView):
    serializer_class = ReportSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

class ReportRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Reports.objects.all()
    lookup_field = 'id'
    serializer_class = ReportSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    

    def delete(self, request, *args, **kwargs):
        report_id = request.data.get('id')
        response = super().delete(request, *args, **kwargs)
        if response.status_code == 204:
            from django.core.cache import cache
            cache.delete('reports_data_{}'.format(report_id))
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return response