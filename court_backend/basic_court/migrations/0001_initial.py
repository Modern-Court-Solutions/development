# Generated by Django 3.2.9 on 2023-04-07 19:31

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(default='Test', max_length=255, null=True)),
                ('last_name', models.CharField(default='Test', max_length=255, null=True)),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('name', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('line_one', models.CharField(max_length=25)),
                ('line_two', models.CharField(blank=True, max_length=25, null=True)),
                ('city', models.CharField(max_length=25)),
                ('state', models.CharField(max_length=2)),
                ('zip1', models.IntegerField()),
                ('zip2', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Attorney',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('f_name', models.CharField(max_length=50)),
                ('l_name', models.CharField(max_length=50)),
                ('m_name', models.CharField(blank=True, max_length=50, null=True)),
                ('barnum', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='Case',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('file_number', models.CharField(max_length=50)),
                ('status_date', models.DateTimeField(default=datetime.datetime(2023, 4, 7, 13, 31, 8, 133040))),
                ('date_filed', models.DateTimeField(default=datetime.datetime(2023, 4, 7, 13, 31, 8, 133040))),
                ('interpreter', models.BooleanField(default=False)),
                ('pro_se_litigant', models.BooleanField(default=False)),
                ('filing_enabled', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='CaseLocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.CharField(choices=[('Location 1', 'Location 1'), ('Location 2', 'Location 2'), ('Location 3', 'Location 3')], default='Location 2', max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='CaseSecurity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('security', models.CharField(choices=[('Public', 'Public'), ('Confidential', 'Confidential'), ('Sealed', 'Sealed')], default='Confidential', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='CaseStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('Closed', 'Closed'), ('Active', 'Active'), ('Inactive', 'Inactive')], default='Active', max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='CaseType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('case_type', models.CharField(choices=[('Criminal', 'Criminal'), ('Civil', 'Civil'), ('Juvenile', 'Juvenile')], default='Civil', max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='ChargeClass',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('charge_class', models.CharField(max_length=3)),
            ],
        ),
        migrations.CreateModel(
            name='ChargeCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('home_phone', models.CharField(max_length=15)),
                ('cellphone', models.CharField(max_length=15)),
                ('email', models.CharField(max_length=50)),
                ('secondary_email', models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='CourtOfficial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('f_name', models.CharField(max_length=25)),
                ('l_name', models.CharField(max_length=25)),
                ('position', models.CharField(choices=[('Clerk', 'Clerk'), ('Recorder', 'Recorder')], default='Clerk', max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='DocumentType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('document_type', models.CharField(choices=[('MT', 'Motion'), ('OR', 'Order'), ('NT', 'Notice')], default='MT', max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('start', models.DateTimeField(default=datetime.datetime(2023, 4, 7, 13, 31, 8, 135040))),
                ('end', models.DateTimeField(default=datetime.datetime(2023, 4, 7, 14, 1, 8, 135040))),
                ('case', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='events', to='basic_court.case')),
            ],
        ),
        migrations.CreateModel(
            name='EventStatus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_status', models.CharField(choices=[('Canceled', 'Canceled'), ('Active', 'Active')], default='Active', max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='EventType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_type', models.CharField(choices=[('HR', 'Hearing'), ('PHR', 'Phone Hearing'), ('VHR', 'Video Hearing')], default='HR', max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='Fee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=8)),
            ],
        ),
        migrations.CreateModel(
            name='FeeCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(choices=[('ALI', 'Alimony'), ('CHS', 'Child Support'), ('MSC', 'Miscellaneous')], default='CHS', max_length=3)),
            ],
        ),
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=128)),
                ('file', models.FileField(upload_to='uploads')),
            ],
        ),
        migrations.CreateModel(
            name='Judge',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('f_name', models.CharField(max_length=25)),
                ('l_name', models.CharField(max_length=25)),
                ('active', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Participant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('f_name', models.CharField(max_length=50)),
                ('l_name', models.CharField(max_length=50)),
                ('m_name', models.CharField(blank=True, max_length=50, null=True)),
                ('contact', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='participant_contact', to='basic_court.contact')),
                ('primary_address', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='participant_address', to='basic_court.address')),
            ],
        ),
        migrations.CreateModel(
            name='ParticipantFeeJoin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('case', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='fees', to='basic_court.case')),
                ('fee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='basic_court.fee')),
                ('participant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='basic_court.participant')),
            ],
        ),
        migrations.CreateModel(
            name='PaymentType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_type', models.CharField(choices=[('MO', 'Money Order'), ('CH', 'Check'), ('CR', 'Card')], default='CH', max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='Reports',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('params', models.CharField(max_length=250)),
                ('court', models.BooleanField(default=False)),
                ('user', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='ResponderCounsel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attorney', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='basic_court.attorney')),
                ('case', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responder_counsel', to='basic_court.case')),
            ],
        ),
        migrations.CreateModel(
            name='Responder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('case', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responders', to='basic_court.case')),
                ('participant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='basic_court.participant')),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=8)),
                ('date', models.DateTimeField(default=datetime.datetime(2023, 4, 7, 13, 31, 8, 140040))),
                ('fee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='payments', to='basic_court.participantfeejoin')),
                ('payment_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='basic_court.paymenttype')),
            ],
        ),
        migrations.CreateModel(
            name='MoverCounsel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attorney', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='basic_court.attorney')),
                ('case', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mover_counsel', to='basic_court.case')),
            ],
        ),
        migrations.CreateModel(
            name='Mover',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('case', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='movers', to='basic_court.case')),
                ('participant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mover', to='basic_court.participant')),
            ],
        ),
        migrations.AddField(
            model_name='fee',
            name='code',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='basic_court.feecode'),
        ),
        migrations.CreateModel(
            name='EventNote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note', models.CharField(default='NA', max_length=2000)),
                ('date_created', models.DateTimeField(default=datetime.datetime(2023, 4, 7, 13, 31, 8, 135040))),
                ('title', models.CharField(default='NA', max_length=50)),
                ('event', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='event_notes', to='basic_court.event')),
            ],
        ),
        migrations.AddField(
            model_name='event',
            name='event_type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='type', to='basic_court.eventtype'),
        ),
        migrations.AddField(
            model_name='event',
            name='status',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='status', to='basic_court.eventstatus'),
        ),
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
                ('date_submitted', models.DateTimeField(default=datetime.datetime(2023, 4, 7, 13, 31, 8, 136041))),
                ('case', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='documents', to='basic_court.case')),
                ('document_type', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='basic_court.documenttype')),
            ],
        ),
        migrations.CreateModel(
            name='Charge',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=25)),
                ('case', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='case_charges', to='basic_court.case')),
                ('charge_class', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='basic_court.chargeclass')),
                ('code', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='basic_court.chargecode')),
            ],
        ),
        migrations.CreateModel(
            name='Changes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('model_changed', models.CharField(max_length=50)),
                ('column_changed', models.CharField(max_length=50)),
                ('record_changed_id', models.IntegerField()),
                ('date_changed', models.DateTimeField(default=datetime.datetime(2023, 4, 7, 13, 31, 8, 149551))),
                ('previous_value', models.CharField(max_length=250)),
                ('new_value', models.CharField(max_length=250)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='changes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='CaseNotes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note', models.CharField(default='NA', max_length=2000)),
                ('date_created', models.DateTimeField(default=datetime.datetime(2023, 4, 7, 13, 31, 8, 133040))),
                ('title', models.CharField(default='NA', max_length=50)),
                ('case', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='case_notes', to='basic_court.case')),
            ],
        ),
        migrations.AddField(
            model_name='case',
            name='case_type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='basic_court.casetype'),
        ),
        migrations.AddField(
            model_name='case',
            name='judge',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='basic_court.judge'),
        ),
        migrations.AddField(
            model_name='case',
            name='location',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='basic_court.caselocation'),
        ),
        migrations.AddField(
            model_name='case',
            name='security',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='basic_court.casesecurity'),
        ),
        migrations.AddField(
            model_name='case',
            name='status',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='basic_court.casestatus'),
        ),
        migrations.CreateModel(
            name='Authentication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('authorization', models.CharField(choices=[('Clerk', 'Clerk'), ('Law Clerk', 'Law Clerk'), ('Chief Clerk', 'Chief Clerk'), ('Judge', 'Judge')], default='Clerk', max_length=25)),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='authorization', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='attorney',
            name='contact',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attorney_contact', to='basic_court.contact'),
        ),
        migrations.AddField(
            model_name='attorney',
            name='primary_address',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attorney_address', to='basic_court.address'),
        ),
    ]
