from re import search
from typing import SupportsRound
from django.db.models import fields
from rest_framework import serializers
from .models import *

class PaymentSerializer(serializers.ModelSerializer):
    fee = serializers.CharField(source='fee.fee.name')
    payment_type = serializers.CharField(source='payment_type.payment_type')
    class Meta:
        model = Payment
        fields = ('id', 'amount', 'date', 'payment_type', 'fee')

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('id', 'line_one', 'line_two', 'city', 'state', 'zip1', 'zip2')

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('id', 'home_phone', 'cellphone', 'email', 'secondary_email')

class AttorneySerializer(serializers.ModelSerializer):
    contact = ContactSerializer()
    primary_address = AddressSerializer()
    class Meta:
        model = Attorney
        fields = ('id', 'f_name', 'l_name', 'm_name', 'barnum', 'contact', 'primary_address')

class CreateAttorneySerializer(serializers.ModelSerializer):
    class Meta:
        model = Attorney
        fields = ('id', 'f_name', 'l_name', 'm_name', 'barnum', 'contact', 'primary_address')

class CreateParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = ('id', 'f_name', 'l_name', 'm_name', 'contact', 'primary_address')

class ParticipantSerializer(serializers.ModelSerializer):
    primary_address = AddressSerializer()
    contact = ContactSerializer()
    class Meta:
        model = Participant
        fields = ('id', 'f_name', 'l_name', 'm_name', 'primary_address', 'contact')

class MoverSerializer(serializers.ModelSerializer):
    case = serializers.CharField(source='case.title')
    f_name = serializers.CharField(source='participant.f_name')
    l_name = serializers.CharField(source='participant.l_name')
    participant_id = serializers.CharField(source='participant.id')
    class Meta:
        model = Mover
        fields = ('id', 'case', 'f_name', 'l_name', 'participant_id')

class ResponderSerializer(serializers.ModelSerializer):
    case = serializers.CharField(source='case.title')
    f_name = serializers.CharField(source='participant.f_name')
    l_name = serializers.CharField(source='participant.l_name')
    participant_id = serializers.CharField(source='participant.id')
    class Meta:
        model = Responder
        fields = ('id', 'case', 'f_name', 'l_name', 'participant_id')

class MoverCounselSerializer(serializers.ModelSerializer):
    case = serializers.CharField(source='case.title')
    f_name = serializers.CharField(source='attorney.f_name')
    l_name = serializers.CharField(source='attorney.l_name')
    barnum = serializers.CharField(source='attorney.barnum')
    attorney_id = serializers.CharField(source='attorney.id')
    class Meta:
        model = MoverCounsel
        fields = ('id', 'case', 'f_name', 'l_name', 'barnum', 'attorney_id')

class ResponderCounselSerializer(serializers.ModelSerializer):
    case = serializers.CharField(source='case.title')
    f_name = serializers.CharField(source='attorney.f_name')
    l_name = serializers.CharField(source='attorney.l_name')
    barnum = serializers.CharField(source='attorney.barnum')
    attorney_id = serializers.CharField(source='attorney.id')
    class Meta:
        model = ResponderCounsel
        fields = ('id', 'case', 'f_name', 'l_name', 'barnum', 'attorney_id')

class FeeSerializer(serializers.ModelSerializer):
    code = serializers.CharField(source='code.code')
    payments = PaymentSerializer(many=True)
    class Meta:
        model = Fee
        fields = ('id', 'name', 'code', 'amount', 'payments')

class ParticipantFeeSerializer(serializers.ModelSerializer):
    case = serializers.CharField(source='case.title')
    f_name = serializers.CharField(source='participant.f_name')
    l_name = serializers.CharField(source='participant.l_name')
    fee_name = serializers.CharField(source='fee.name')
    fee_amount = serializers.CharField(source='fee.amount')
    payments = PaymentSerializer(many=True)
    class Meta:
        model = ParticipantFeeJoin
        fields = ('id', 'case','f_name','l_name','fee_name','fee_amount', 'payments')

class DocumentSerializer(serializers.ModelSerializer):
    document_type = serializers.CharField(source='document_type.document_type')
    case = serializers.CharField(source='case.title')
    class Meta:
        model = Document
        fields = ('id', 'name', 'document_type', 'date_submitted', 'case')

class EventNotesSerializer(serializers.ModelSerializer):
    event = serializers.CharField(source='event.name')
    class Meta:
        model = EventNote
        fields = ('id', 'event', 'note', 'date_created', 'title')

class EventStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventStatus
        fields = ('id', 'event_status')

class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventType
        fields = ('id', 'event_type')

class EventSerializer(serializers.ModelSerializer):
    case = serializers.CharField(source='case.title')
    event_notes = EventNotesSerializer(many=True)
    status = EventStatusSerializer()
    event_type = EventTypeSerializer()
    class Meta:
        model = Event
        fields = ('id', 'name', 'event_type', 'start', 'end', 'case', 'status', 'event_notes',)

class CreateEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'name', 'event_type', 'start', 'end', 'case', 'status')

class ChargeSerializer(serializers.ModelSerializer):
    case = serializers.CharField(source='case.title')
    code = serializers.CharField(source='code.code')
    charge_class = serializers.CharField(source='charge_class.charge_class')
    class Meta:
        model = Charge
        fields = ('id', 'case', 'title','code','charge_class')

class CreateChargeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Charge
        fields = ('id', 'case', 'title','code','charge_class')

class CaseNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseNotes
        fields = ('id', 'case', 'note', 'date_created', 'title')

class JudgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Judge
        fields = ('id', 'f_name', 'l_name')

class CaseSecuritySerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseSecurity
        fields = ('id', 'security')

class CaseStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseStatus
        fields = ('id', 'status')

class CaseTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseType
        fields = ('id', 'case_type')

class CaseLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseLocation
        fields = ('id', 'location')

class CaseSerializer(serializers.ModelSerializer):
    security = CaseSecuritySerializer()
    status = CaseStatusSerializer()
    case_type = CaseTypeSerializer()
    judge = JudgeSerializer()
    location = CaseLocationSerializer()
    case_notes = CaseNotesSerializer(many=True)
    case_charges = ChargeSerializer(many=True) 
    events = EventSerializer(many=True)
    documents = DocumentSerializer(many=True)
    movers = MoverSerializer(many=True)
    responders = ResponderSerializer(many=True)
    mover_counsel = MoverCounselSerializer(many=True)
    responder_counsel = ResponderCounselSerializer(many=True)
    fees = ParticipantFeeSerializer(many=True)
    class Meta:
        model = Case
        fields = ('id', 'title', 'file_number', 'security', 'status', 'status_date', 'case_type', 'judge', 'location', 'date_filed', 'interpretor', 'pro_se_litigant', 'filing_enabled', 'case_notes', 'case_charges', 'events', 'documents', 'movers', 'responders', 'mover_counsel', 'responder_counsel', 'fees')


class CreateCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = ('id', 'title', 'file_number', 'security', 'status', 'status_date', 'case_type', 'judge', 'location', 'date_filed', 'interpretor', 'pro_se_litigant', 'filing_enabled')


class DocumentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentType
        fields = ('id', 'document_type')
        
class PaymentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentType
        fields = ('id', 'payment_type')
        
class FeeCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeCode
        fields = ('id', 'code')