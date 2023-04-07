import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'court_backend.settings')

import django
django.setup()

import random
from basic_court.models import *
import datetime
from django.conf import settings
from django.utils import timezone

from faker import Faker
fakegen = Faker()
positions = ['JG', 'CL', 'RC']
caseTypes = ['CV', 'CR','FM']
locations = ['L1', 'L2', 'L3']
documents = ['Doc1', 'Doc2', 'Doc3']
documentCodes = ['Code1', 'Code2', "Code3"]
states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]
def AddLocation():
    l = CaseLocation.objects.get_or_create(location=random.choice(locations))[0]
    l.save()
    return l

def AddJudge(N=5):
    offList = []
    for entry in range(N):
        official = Judge.objects.get_or_create(f_name=fakegen.first_name(),l_name=fakegen.last_name(), active = True)[0]
        official.save()
        offList.append(official)
    return offList

def AddCaseStatus():
    s = CaseStatus.objects.get_or_create(status=random.choice(['Closed', 'Active', 'Inactive']))[0]
    s.save()
    return s

def AddCaseType():
    t = CaseType.objects.get_or_create(case_type=random.choice(['Criminal', 'Civil', 'Juvenile']))[0]
    t.save()
    return t

def AddCaseSecurity():
    s = CaseSecurity.objects.get_or_create(security=random.choice(['Public', 'Confidential', 'Sealed']))[0]
    s.save()
    return s

def AddCase(offList, N=500):
    caseList = []
    for entry in range(N):
        case = Case.objects.get_or_create(title="Generic Case: " + fakegen.first_name() + " " + fakegen.last_name(), file_number=(str(random.randrange(1000000,9999999)) + 'SC'), security = AddCaseSecurity(), status = AddCaseStatus(), status_date = datetime.datetime.now(tz=timezone.utc), case_type=AddCaseType(), judge=random.choice(offList), location = AddLocation(), date_filed = datetime.datetime.now(tz=timezone.utc))[0]
        case.save()
        caseList.append(case)
    return caseList

def AddEventStatus():
    e = EventStatus.objects.get_or_create(event_status='Active')[0]
    e.save()
    return e

def AddEventType():
    e = EventType.objects.get_or_create(event_type='Hearing')[0]
    e.save()
    return e

def AddEvent(caseList):
    eventList = []
    for entry in caseList:
        date = timezone.make_aware(fakegen.date_time_this_year(before_now = False, after_now = True))
        event = Event.objects.get_or_create(name='Generic Hearing', event_type = AddEventType(), status = AddEventStatus(), start = date, end=date + datetime.timedelta(minutes=30), case=entry)[0]
        event.save()
        eventList.append(event)
    return eventList

def AddAddress():
    a = Address.objects.get_or_create(line_one=fakegen.street_address(), line_two = '', city=fakegen.city(), state=random.choice(states), zip1 = fakegen.postcode(), zip2 = 0000)[0]
    a.save()
    return a

def AddContact():
    c = Contact.objects.get_or_create(home_phone = random.randrange(0000000000,9999999999), cellphone = random.randrange(0000000000,9999999999), email = fakegen.ascii_email(), secondary_email = fakegen.ascii_email())[0]
    c.save()
    return c


def AddAttorney(N = 50):
    attorneyList = []
    for entry in range(N):
        attorney = Attorney.objects.get_or_create(f_name=fakegen.first_name(), l_name=fakegen.last_name(), m_name = '', barnum=random.randrange(10000,99999), primary_address = AddAddress(), contact = AddContact())[0]
        attorney.save()
        attorneyList.append(attorney)
    return attorneyList

def AddParticipant(caseList):
    participantList = []
    for entry in caseList:
        participant = Participant.objects.get_or_create(f_name=fakegen.first_name(), l_name=fakegen.last_name(), m_name = '', primary_address = AddAddress(),  contact = AddContact())[0]
        participant.save()
        participantList.append(participant)
    for entry in caseList:
        participant = Participant.objects.get_or_create(f_name=fakegen.first_name(), l_name=fakegen.last_name(), m_name = '', primary_address = AddAddress(), contact = AddContact())[0]
        participant.save()
        participantList.append(participant)
    return participantList

def AddMover(caseList, participantList):
    moverList = []
    for entry in caseList:
        mover = Mover.objects.get_or_create(case=entry, participant=random.choice(participantList))[0]
        mover.save()
        moverList.append(mover)
    return moverList

def AddResponder(caseList, participantList):
    for entry in caseList:
        responder = Responder.objects.get_or_create(case=entry, participant=random.choice(participantList))[0]
        responder.save()

def AddMoverCounsel(caseList, attorneyList):
    for entry in caseList:
        mover = MoverCounsel.objects.get_or_create(case=entry, attorney=random.choice(attorneyList))[0]
        mover.save()

def AddResponderCounsel(caseList, attorneyList):
    for entry in caseList:
        responder = ResponderCounsel.objects.get_or_create(case=entry, attorney=random.choice(attorneyList))[0]
        responder.save()

def AddDocumentType():
    d = DocumentType.objects.get_or_create(document_type = "Motion")[0]
    d.save()
    return(d) 



def AddDocument(caseList):
    for entry in caseList:
        d = Document.objects.get_or_create(name="Motion to Dismiss", document_type = AddDocumentType(), date_submitted = datetime.datetime.now(tz=timezone.utc), case = entry)[0]
        d.save()

def AddCaseNote(caseList):
    for entry in caseList:
        n = CaseNotes.objects.get_or_create(note='This is a generic test note!', case = entry, date_created = datetime.datetime.now(tz=timezone.utc), title = "Generic Note")[0]
        n.save()

def AddEventNote(eventList):
    for entry in eventList:
        n = EventNote.objects.get_or_create(note='This is a generic test note!', event = entry, date_created = datetime.datetime.now(tz=timezone.utc), title = "Generic Note")[0]
        n.save()

def AddChargeCode():
    c = ChargeCode.objects.get_or_create(code = random.choice(['Assault', 'Battery', 'Possession']))[0]
    c.save()
    return c

def AddChargeClass():
    c = ChargeClass.objects.get_or_create(charge_class = random.choice(['Misdemeanor', 'Felony']))[0]
    c.save()
    return c

def AddCharge(caseList):
    for entry in caseList:
        if entry.case_type.case_type == 'Criminal':
            c = Charge.objects.get_or_create(title = 'Generic Charge', code = AddChargeCode(), charge_class = AddChargeClass(), case = entry)[0]
            c.save()

def AddFeeCode():
    f = FeeCode.objects.get_or_create(code = random.choice(['Alimony', 'Child Support', 'Miscellaneous']))[0]
    f.save()
    return f

def AddFee():
    f = Fee.objects.get_or_create(name='Generic Fee', code = AddFeeCode(), amount =  random.randrange(1,2000))[0]
    f.save()
    return f

def AddFeeCaseJoin(moverList):
    feeList = []
    for entry in moverList:
        f = ParticipantFeeJoin.objects.get_or_create(case = entry.case, participant = entry.participant, fee= AddFee())[0]
        f.save()
        feeList.append(f)
    return feeList

def AddPaymentType():
    p = PaymentType.objects.get_or_create(payment_type = random.choice(['Money Order', 'Check', 'Card']))[0]
    p.save()
    return p

def AddPayment(feeList):
    i = 0
    for entry in feeList:
            p = Payment.objects.get_or_create(amount = 1.00, date = datetime.datetime.now(tz=timezone.utc), payment_type = AddPaymentType(), fee = entry)[0]
            p.save()

if __name__ == '__main__':
    print('Populating Script!')
    offList = AddJudge()
    print('Judges')
    caseList = AddCase(offList)
    print('Cases')
    eventList = AddEvent(caseList)
    print('Events')
    participantList = AddParticipant(caseList)
    print('Participants')
    attorneyList = AddAttorney()
    print('Attorneys')
    moverList = AddMover(caseList, participantList)
    print('Movers')
    AddResponder(caseList,participantList)
    print('Responders')
    AddDocument(caseList)
    print('Documents')
    AddMoverCounsel(caseList, attorneyList)
    print('Mover Counsel')
    AddResponderCounsel(caseList, attorneyList)
    print('Responder Counsel')
    AddCaseNote(caseList)
    print('Case Notes')
    AddEventNote(eventList)
    print('Event Notes')
    AddCharge(caseList)
    print('Charges')
    feeList = AddFeeCaseJoin(moverList)
    print('Fees')
    AddPayment(feeList)
    print('Payments')
    print('Populating Complete!')

