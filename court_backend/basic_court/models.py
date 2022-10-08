from enum import unique
import re
from tracemalloc import is_tracing
from django.db import models

from django.db import models

from django.db import models
import datetime
import os
from django.dispatch import receiver

from django.db.models.deletion import CASCADE
from django.db.models.fields import CharField, DateTimeField

from django.db.models.fields.related import ForeignKey
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


#User model
class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        """Creates and saves a new user"""
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password, **extra_fields):
        """Creates a new superuser"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save()

        return user

class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model that uses email instead username"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

class Authentication(models.Model):
    CLERK = 'Clerk'
    JUDGE = 'Judge'
    AUTH_CHOICES = [
        (CLERK, 'Clerk'),
        (JUDGE, 'Judge')
    ]
    authorization = models.CharField(max_length=25, choices=AUTH_CHOICES, default=CLERK)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1, related_name="authorization")

#File Model
class File(models.Model):
    title = models.CharField(max_length=128, blank=True)
    file = models.FileField(upload_to = 'uploads')
    def __str__(self):
        return f"{self.title}"

@receiver(models.signals.post_delete, sender=File)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `File` object is deleted.
    """
    if instance.file:
        if os.path.isfile(instance.file.path):
            os.remove(instance.file.path)

@receiver(models.signals.pre_save, sender=File)
def auto_delete_file_on_change(sender, instance, **kwargs):
    """
    Deletes old file from filesystem
    when corresponding `File` object is updated
    with new file.
    """
    if not instance.pk:
        return False

    try:
        old_file = File.objects.get(pk=instance.pk).file
    except File.DoesNotExist:
        return False

    new_file = instance.file
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)


#Court Offical Models
class Judge(models.Model):
    f_name = models.CharField(max_length=25)
    l_name = models.CharField(max_length=25)
    active = models.BooleanField()
    def __str__(self):
        return f"{self.f_name, self.l_name}"

class CourtOfficial(models.Model):
    f_name = models.CharField(max_length=25)
    l_name = models.CharField(max_length=25)
    CLERK = 'Clerk'
    RECORDER = 'Recorder'
    POSITION_CHOICES = [
        (CLERK, 'Clerk'),
        (RECORDER, 'Recorder')
    ]
    position = models.CharField(max_length=25, choices=POSITION_CHOICES, default=CLERK)
    def __str__(self):
        return f"{self.f_name, self.l_name, self.position}"



#Case Models
class CaseSecurity(models.Model):
    PUBLIC = 'Public'
    CONFIDENTIAL = 'Confidential'
    SEALED = 'Sealed'
    SECURITY_CHOICES = [
        (PUBLIC, 'Public'),
        (CONFIDENTIAL, 'Confidential'),
        (SEALED, 'Sealed')
    ]
    security = models.CharField(max_length=20, choices=SECURITY_CHOICES, default=CONFIDENTIAL)
    def __str__(self):
        return f"{self.security}"

class CaseStatus(models.Model):
    CLOSED = 'Closed'
    ACTIVE = 'Active'
    INACTIVE = 'Inactive'
    STATUS_CHOICES = [
        (CLOSED, 'Closed'),
        (ACTIVE, 'Active'),
        (INACTIVE, 'Inactive')
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=ACTIVE)
    def __str__(self):
        return f"{self.status}"

class CaseLocation(models.Model):
    LOCONE = 'Location 1'
    LOCTWO = 'Location 2'
    LOCTHREE = 'Location 3'
    LOCATION_CHOICES = [
        (LOCONE, 'Location 1'),
        (LOCTWO, 'Location 2'),
        (LOCTHREE, 'Location 3')
    ]
    location = models.CharField(max_length=25, choices=LOCATION_CHOICES, default=LOCTWO)
    def __str__(self):
        return f"{self.location}"


class CaseType(models.Model):
    CRIMINAL = 'Criminal'
    CIVIL = 'Civil'
    JUVENILE = 'Juvenile'
    LOCATION_CHOICES = [
        (CRIMINAL, 'Criminal'),
        (CIVIL, 'Civil'),
        (JUVENILE, 'Juvenile')
    ]
    case_type = models.CharField(max_length=25, choices=LOCATION_CHOICES, default=CIVIL)
    def __str__(self):
        return f"{self.case_type}"


class Case(models.Model):
    title = models.CharField(max_length=50)
    file_number = models.CharField(max_length=50)
    security = models.ForeignKey(CaseSecurity, on_delete=models.CASCADE, default=1)
    status = models.ForeignKey(CaseStatus, on_delete=models.CASCADE, default=1)
    status_date = models.DateTimeField(default=datetime.datetime.now())
    case_type = models.ForeignKey(CaseType, on_delete=models.CASCADE, default=1)
    judge = models.ForeignKey(Judge, on_delete=models.CASCADE, default=1)
    location = models.ForeignKey(CaseLocation, on_delete=models.CASCADE, default = 1)
    date_filed = models.DateTimeField(default=datetime.datetime.now())
    interpretor = models.BooleanField(default=False)
    pro_se_litigant = models.BooleanField(default=False)
    filing_enabled = models.BooleanField(default=True)
    def __str__(self):
        return f"{self.title}"

class CaseNotes(models.Model):
    note = models.CharField(default = "NA", max_length = 2000)
    case = ForeignKey(Case, on_delete=models.CASCADE, default=1, related_name="case_notes")
    date_created = DateTimeField(default=datetime.datetime.now())
    title = models.CharField(default="NA", max_length=50)
    def __str__(self):
        return f"{self.title}"

#Charge Models
class ChargeCode(models.Model):
    ASSAULT = 'ASL'
    BATTERY = 'BAT'
    POSSESION = 'POS'
    POSITION_CHOICES = [
        (ASSAULT, 'Assault'),
        (BATTERY, 'Battery'),
        (POSSESION, 'Possesion')
    ]
    code = models.CharField(max_length=10)
    def __str__(self):
        return f"{self.code}"

class ChargeClass(models.Model):
    MISDEMEANOR = 'MIS'
    FELONY = 'FEL'
    POSITION_CHOICES = [
        (MISDEMEANOR, 'Misdemeanor'),
        (FELONY, 'Felony')
    ]
    charge_class = models.CharField(max_length=3)
    def __str__(self):
        return f"{self.charge_class}"

class Charge(models.Model):
    title = models.CharField(max_length=25)
    code = models.ForeignKey(ChargeCode, on_delete=models.CASCADE)
    charge_class = models.ForeignKey(ChargeClass, on_delete=models.CASCADE)
    case = models.ForeignKey(Case, on_delete=models.CASCADE, related_name='case_charges')
    def __str__(self):
        return f"{self.title}"

#Event Models
class EventType(models.Model):
    HR = 'HR'
    PHR = 'PHR'
    VHR = 'VHR'
    TYPE_CHOICES = [
        (HR, 'Hearing'),
        (PHR, 'Phone Hearing'),
        (VHR, 'Video Hearing'),
    ]
    event_type = models.CharField(max_length=25, choices=TYPE_CHOICES, default=HR)
    def __str__(self):
        return f"{self.event_type}"

class EventStatus(models.Model):
    CANCELED = 'Canceled'
    ACTIVE = 'Active'
    STATUS_CHOICES = [
        (CANCELED, 'Canceled'),
        (ACTIVE, 'Active')
    ]
    event_status = models.CharField(max_length=15, choices = STATUS_CHOICES, default=ACTIVE)

class Event(models.Model):
    name = models.CharField(max_length=30)
    event_type = models.ForeignKey(EventType, on_delete=models.CASCADE, default=1, related_name='type')
    start = models.DateTimeField(default=datetime.datetime.now())
    end = models.DateTimeField(default=datetime.datetime.now() + datetime.timedelta(minutes = 30))
    case = models.ForeignKey(Case, on_delete=models.CASCADE, related_name='events')
    status = models.ForeignKey(EventStatus, on_delete=models.CASCADE, related_name='status')
    def __str__(self):
        return f"{self.name}"

class EventNote(models.Model):
    note = models.CharField(default = "NA", max_length = 2000)
    event = ForeignKey(Event, on_delete=models.CASCADE, default=1, related_name="event_notes")
    date_created = DateTimeField(default=datetime.datetime.now())
    title = models.CharField(default="NA", max_length=50)
    def __str__(self):
        return f"{self.title}"


#Document Models
class DocumentType(models.Model):
    MOTION = 'MT'
    ORDER = 'OR'
    NOTICE = 'NT'
    TYPE_CHOICES = [
        (MOTION, 'Motion'),
        (ORDER, 'Order'),
        (NOTICE, 'Notice'),
    ]
    document_type = models.CharField(max_length=2, choices=TYPE_CHOICES, default=MOTION)
    def __str__(self):
        return f"{self.document_type}"

class Document(models.Model):
    name = models.CharField(max_length=25)
    document_type = models.ForeignKey(DocumentType, on_delete=models.CASCADE, default=1)
    date_submitted = models.DateTimeField(default=datetime.datetime.now())
    case = models.ForeignKey(Case, on_delete=models.CASCADE, related_name='documents')
    def __str__(self):
        return f"{self.name}"

#Address and Contact models
class Address(models.Model):
    line_one = models.CharField(max_length=25)
    line_two = models.CharField(max_length=25, null=True, blank=True)
    city = models.CharField(max_length=25)
    state = models.CharField(max_length=2)
    zip1 = models.IntegerField()
    zip2 = models.IntegerField(null=True, blank=True)


class Contact(models.Model):
    home_phone = models.CharField(max_length=15)
    cellphone = models.CharField(max_length=15)
    email = models.CharField(max_length = 50)
    secondary_email = models.CharField(max_length=50, null=True, blank=True)

#Attorney Model
class Attorney(models.Model):
    f_name = models.CharField(max_length=50)
    l_name = models.CharField(max_length=50)
    m_name = models.CharField(max_length=50, null=True, blank=True)
    barnum = models.CharField(max_length=25)
    primary_address = models.ForeignKey(Address, on_delete=models.CASCADE, related_name='attorney_address')
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, related_name='attorney_contact')
    def __str__(self):
        return f"{self.f_name, self.l_name}"

#Participant Model
class Participant(models.Model):
    f_name = models.CharField(max_length=50)
    l_name = models.CharField(max_length=50)
    m_name = models.CharField(max_length=50, null=True, blank=True)
    primary_address = models.ForeignKey(Address, on_delete=models.CASCADE, related_name='participant_address')
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, related_name='participant_contact')
    def __str__(self):
        return f"{self.f_name, self.l_name}"


# Fee fields
class FeeCode(models.Model):
    ALIMONY = 'ALI'
    CHILD_SUPPORT = 'CHS'
    MISC = 'MSC'
    CODE_CHOICES = [
        (ALIMONY, 'Alimony'),
        (CHILD_SUPPORT, 'Child Support'),
        (MISC, 'Miscellaneous'),
    ]
    code = models.CharField(max_length=3, choices=CODE_CHOICES, default=CHILD_SUPPORT)
    def __str__(self):
        return f"{self.code}"

class Fee(models.Model):
    name = models.CharField(max_length=50)
    code = models.ForeignKey(FeeCode, on_delete=models.CASCADE)
    amount = models.DecimalField(decimal_places=2, max_digits=8)
    def __str__(self):
        return f"{self.name, self.amount}"


#Join tables
class ParticipantFeeJoin(models.Model):
    case = models.ForeignKey(Case, on_delete=models.CASCADE, related_name='fees')
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    fee = models.ForeignKey(Fee, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.fee}"


class Mover(models.Model):
    case = models.ForeignKey(Case, on_delete=models.CASCADE, related_name='movers')
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, related_name='mover')
    def __str__(self):
        return f"{self.participant}"

class Responder(models.Model):
    case = models.ForeignKey(Case, on_delete=models.CASCADE, related_name='responders')
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.participant}"

class MoverCounsel(models.Model):
    case = models.ForeignKey(Case, on_delete=models.CASCADE, related_name='mover_counsel')
    attorney = models.ForeignKey(Attorney, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.attorney}"

class ResponderCounsel(models.Model):
    case = models.ForeignKey(Case, on_delete=models.CASCADE, related_name='responder_counsel')
    attorney = models.ForeignKey(Attorney, on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.attorney}"


#Payment Models
class PaymentType(models.Model):
    MONEY_ORDER = 'MO'
    CHECK = 'CH'
    CARD = 'CR'
    TYPE_CHOICES = [
        (MONEY_ORDER, 'Money Order'),
        (CHECK, 'Check'),
        (CARD, 'Card'),
    ]
    payment_type = models.CharField(max_length=2, choices=TYPE_CHOICES, default=CHECK)
    def __str__(self):
        return f"{self.payment_type}"

class Payment(models.Model):
    amount = models.DecimalField(decimal_places=2, max_digits=8)
    date = models.DateTimeField(default=datetime.datetime.now())
    payment_type = models.ForeignKey(PaymentType, on_delete=models.CASCADE)
    fee = models.ForeignKey(ParticipantFeeJoin, on_delete=models.CASCADE, related_name='payments')
    def __str__(self):
        return f"{self.amount}"

class Changes(models.Model):
    user = models.ForeignKey(User, on_delete= models.CASCADE, related_name='changes')
    model_changed = models.CharField(max_length = 50)
    column_changed = models.CharField(max_length = 50)
    record_changed_id = models.IntegerField()
    date_changed = models.DateTimeField(default=datetime.datetime.now())
    previous_value = models.CharField(max_length = 250)
    new_value = models.CharField(max_length = 250)

#Report Model
class Reports(models.Model):
    name = models.CharField(max_length=50)
    params = models.CharField(max_length=250)
    court = models.BooleanField(default=False)
    user = models.CharField(max_length=20)