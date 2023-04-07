from ast import Add
from django.contrib import admin
from reversion.admin import VersionAdmin
from django.contrib.auth import admin as auth_admin
from .models import *

# Register your models here.
@admin.register(User)
class UserAdmin(VersionAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_staff', 'groups_list')

    def groups_list(self, obj):
        return ", ".join([g.name for g in obj.groups.all()])
    groups_list.short_description = 'Groups'

    filter_horizontal = ('groups',)

@admin.register(Authentication)
class UserAdmin(VersionAdmin):

    pass

@admin.register(ChargeCode)
class ChargeCodeAdmin(VersionAdmin):

    pass

@admin.register(ChargeClass)
class ChargeClassAdmin(VersionAdmin):

    pass

@admin.register(Charge)
class ChargeAdmin(VersionAdmin):

    pass

@admin.register(Judge)
class JudgeAdmin(VersionAdmin):

    pass

@admin.register(CourtOfficial)
class CourtOfficialAdmin(VersionAdmin):

    pass

@admin.register(CaseSecurity)
class CaseSecurityAdmin(VersionAdmin):

    pass

@admin.register(CaseStatus)
class CaseStatusAdmin(VersionAdmin):

    pass

@admin.register(CaseLocation)
class CaseLocationAdmin(VersionAdmin):

    pass

@admin.register(CaseType)
class CaseTypeAdmin(VersionAdmin):

    pass

@admin.register(Case)
class CaseAdmin(VersionAdmin):

    pass

@admin.register(CaseNotes)
class CaseNotesAdmin(VersionAdmin):

    pass

@admin.register(EventType)
class EventTypeAdmin(VersionAdmin):

    pass

@admin.register(Event)
class EventAdmin(VersionAdmin):

    pass

@admin.register(EventNote)
class EventNoteAdmin(VersionAdmin):

    pass

@admin.register(DocumentType)
class DocumentTypeAdmin(VersionAdmin):

    pass

@admin.register(Document)
class DocumentAdmin(VersionAdmin):

    pass

@admin.register(Address)
class AddressAdmin(VersionAdmin):

    pass

@admin.register(Contact)
class ContactAdmin(VersionAdmin):

    pass

@admin.register(Attorney)
class AttorneyAdmin(VersionAdmin):

    pass

@admin.register(Participant)
class ParticipantAdmin(VersionAdmin):

    pass

@admin.register(FeeCode)
class FeeCodeAdmin(VersionAdmin):

    pass

@admin.register(Fee)
class FeeAdmin(VersionAdmin):

    pass

@admin.register(ParticipantFeeJoin)
class ParticipantFeeJoinAdmin(VersionAdmin):

    pass

@admin.register(Mover)
class MoverAdmin(VersionAdmin):

    pass

@admin.register(Responder)
class ResponderAdmin(VersionAdmin):

    pass

@admin.register(MoverCounsel)
class MoverCounselAdmin(VersionAdmin):

    pass

@admin.register(ResponderCounsel)
class ResponderCounselAdmin(VersionAdmin):

    pass

@admin.register(PaymentType)
class PaymentTypeAdmin(VersionAdmin):

    pass

@admin.register(Payment)
class PaymentAdmin(VersionAdmin):

    pass

@admin.register(Reports)
class ReportAdmin(VersionAdmin):

    pass

@admin.register(File)
class ReportAdmin(VersionAdmin):

    pass