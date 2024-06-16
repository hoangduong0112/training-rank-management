# Generated by Django 5.0.6 on 2024-06-15 10:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TrainingAPIApp', '0002_bulletin_activity'),
    ]

    operations = [
        migrations.RenameField(
            model_name='studentactivity',
            old_name='student',
            new_name='user',
        ),
        migrations.AlterField(
            model_name='student',
            name='student_code',
            field=models.CharField(db_index=True, max_length=10, unique=True),
        ),
        migrations.AlterUniqueTogether(
            name='studentactivity',
            unique_together={('user', 'activity')},
        ),
    ]