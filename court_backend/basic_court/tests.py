from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import User, UserManager, File, Judge, CourtOfficial, CaseSecurity, CaseStatus, CaseLocation, CaseType, Case, CaseNotes, Authentication
from django.core.files.uploadedfile import SimpleUploadedFile
import os
from datetime import datetime


class UserManagerTestCase(TestCase):
    def setUp(self):
        self.user_manager = UserManager()
        self.email = 'test@example.com'
        self.password = 'testpassword'

    def test_create_user(self):
        user = self.user_manager.create_user(self.email, self.password)
        self.assertIsInstance(user, User)
        self.assertEqual(user.email, self.email)
        self.assertTrue(user.check_password(self.password))
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_user_with_extra_fields(self):
        extra_fields = {'name': 'Test User'}
        user = self.user_manager.create_user(self.email, self.password, **extra_fields)
        self.assertEqual(user.name, 'Test User')

    def test_create_user_no_email(self):
        with self.assertRaises(ValueError):
            self.user_manager.create_user(None, self.password)

    def test_create_superuser(self):
        user = self.user_manager.create_superuser(self.email, self.password)
        self.assertIsInstance(user, User)
        self.assertEqual(user.email, self.email)
        self.assertTrue(user.check_password(self.password))
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)


class AuthenticationTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='test@example.com', password='testpassword')

    def test_create_authentication(self):
        auth = Authentication.objects.create(user=self.user, authorization='Clerk')
        self.assertEqual(auth.authorization, 'Clerk')
        self.assertEqual(auth.user, self.user)

    def test_create_authentication_with_invalid_choice(self):
        with self.assertRaises(ValidationError):
            auth = Authentication.objects.create(user=self.user, authorization='Invalid Choice')

    def test_string_representation(self):
        auth = Authentication.objects.create(user=self.user, authorization='Clerk')
        self.assertEqual(str(auth), 'Clerk')

class FileModelTest(TestCase):
    def setUp(self):
        self.file = SimpleUploadedFile("file.txt", b"file_content")
        self.file_obj = File.objects.create(title="Test File", file=self.file)

    def test_file_upload(self):
        self.assertEqual(self.file_obj.title, "Test File")
        self.assertEqual(self.file_obj.file.name, "uploads/file.txt")

    def test_file_delete(self):
        file_path = self.file_obj.file.path
        self.file_obj.delete()
        self.assertFalse(os.path.exists(file_path))

    def test_file_update(self):
        new_file = SimpleUploadedFile("new_file.txt", b"new_file_content")
        self.file_obj.file = new_file
        self.file_obj.save()
        self.assertEqual(self.file_obj.file.name, "uploads/new_file.txt")
        self.assertFalse(os.path.exists(self.file.path))

class JudgeModelTest(TestCase):
    def setUp(self):
        self.judge = Judge.objects.create(
            f_name='John', l_name='Doe', active=True)

    def test_judge_str(self):
        self.assertEqual(str(self.judge), 'John Doe')

    def test_judge_first_name(self):
        self.assertEqual(self.judge.f_name, 'John')

    def test_judge_last_name(self):
        self.assertEqual(self.judge.l_name, 'Doe')

    def test_judge_active(self):
        self.assertTrue(self.judge.active)

class CourtOfficialModelTest(TestCase):
    def setUp(self):
        self.official = CourtOfficial.objects.create(
            f_name='Jane', l_name='Smith', position=CourtOfficial.CLERK)

    def test_official_str(self):
        self.assertEqual(str(self.official), 'Jane Smith Clerk')

    def test_official_first_name(self):
        self.assertEqual(self.official.f_name, 'Jane')

    def test_official_last_name(self):
        self.assertEqual(self.official.l_name, 'Smith')

    def test_official_position(self):
        self.assertEqual(self.official.position, CourtOfficial.CLERK)

    
class CaseSecurityTest(TestCase):
    def test_security_default(self):
        security = CaseSecurity()
        self.assertEqual(security.security, 'Confidential')

    def test_str(self):
        security = CaseSecurity(security='Public')
        self.assertEqual(str(security), 'Public')

class CaseStatusTest(TestCase):
    def test_status_default(self):
        status = CaseStatus()
        self.assertEqual(status.status, 'Active')

    def test_str(self):
        status = CaseStatus(status='Closed')
        self.assertEqual(str(status), 'Closed')

class CaseLocationTest(TestCase):
    def setUp(self):
        self.location1 = CaseLocation.objects.create(location=CaseLocation.LOCONE)
        self.location2 = CaseLocation.objects.create(location=CaseLocation.LOCTWO)

    def test_location_str(self):
        self.assertEqual(str(self.location1), "Location 1")
        self.assertEqual(str(self.location2), "Location 2")

    def test_default_location(self):
        location3 = CaseLocation.objects.create()
        self.assertEqual(location3.location, CaseLocation.LOCTWO)

class CaseTypeTest(TestCase):
    def setUp(self):
        self.case_type1 = CaseType.objects.create(case_type=CaseType.CRIMINAL)
        self.case_type2 = CaseType.objects.create(case_type=CaseType.CIVIL)

    def test_case_type_str(self):
        self.assertEqual(str(self.case_type1), "Criminal")
        self.assertEqual(str(self.case_type2), "Civil")

    def test_default_case_type(self):
        case_type3 = CaseType.objects.create()
        self.assertEqual(case_type3.case_type, CaseType.CIVIL)

class CaseModelTests(TestCase):

    def setUp(self):
        self.security = CaseSecurity.objects.create(security=CaseSecurity.CONFIDENTIAL)
        self.status = CaseStatus.objects.create(status=CaseStatus.ACTIVE)
        self.case_type = CaseType.objects.create(case_type=CaseType.CIVIL)
        self.location = CaseLocation.objects.create(location=CaseLocation.LOCTWO)
        self.judge = Judge.objects.create(name="John Doe")
        self.case = Case.objects.create(
            title="Test Case",
            file_number="123456",
            security=self.security,
            status=self.status,
            case_type=self.case_type,
            judge=self.judge,
            location=self.location
        )

    def test_case_str(self):
        self.assertEqual(str(self.case), "Test Case")

    def test_status_date_default(self):
        self.assertIsInstance(self.case.status_date, datetime)

    def test_date_filed_default(self):
        self.assertIsInstance(self.case.date_filed, datetime)

    def test_default_values(self):
        self.assertEqual(self.case.interpretor, False)
        self.assertEqual(self.case.pro_se_litigant, False)
        self.assertEqual(self.case.filing_enabled, True)

class CaseNotesModelTests(TestCase):

    def setUp(self):
        self.case = Case.objects.create(title="Test Case")
        self.note = CaseNotes.objects.create(
            note="This is a test note",
            case=self.case,
            title="Test Note"
        )

    def test_casenotes_str(self):
        self.assertEqual(str(self.note), "Test Note")

    def test_note_default(self):
        self.assertEqual(self.note.note, "This is a test note")

    def test_date_created_default(self):
        self.assertIsInstance(self.note.date_created, datetime)
        
    def test_title_default(self):
        self.assertEqual(self.note.title, "Test Note")

