# Generated by Django 4.2.6 on 2023-10-19 19:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('amt', '0002_remove_user_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='team',
            name='team_class',
        ),
    ]